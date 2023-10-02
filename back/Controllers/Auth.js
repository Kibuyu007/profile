import user from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Registering

export const register = async (req, res) => {
  const { username, email, password, photo, role } = req.body;
  const hashing = await bcrypt.hash(password, 10);

  try {
    //if user existing..
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "user existed.." });
    }

    //Register User
    const postDatas = await user.create({
      username,
      email,
      password: hashing,
      photo,
      role,
    });
    res
      .status(200)
      .json({ data: postDatas, message: "User Created successfully.." });

    //
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Login...

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //existing user
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      res.status(401).json({ message: " user doesnt exist..!!" });
    }

    //Is the Password okay
    const verifyPass = await bcrypt.compare(password, existingUser.password);
    if (!verifyPass) {
      return res.status(401).json({ message: "Wrong Password" });
    }

    //token
    const token = jwt.sign(
      { Id: existingUser._id, role: existingUser.role },
      process.env.MYCODE,
      { expiresIn: "30s" }
    );

    //cookies
    if (existingUser) {
      const { password, role, ...ficha } = existingUser._doc;
      res.cookie(
        "accessToken",
        token,
        {
          httpOnly: true,
          expiresIn: new Date(Date.now() + 60000),
        },
        { ...ficha },
        role
      );
    }

    //login successfully
    return res.status(200).json({ message: "Login Successfully" });
  } catch (error) {
    return res.status(401).json("Some is wrong..!!!");
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("accessToken", null, {
      httpOnly: true,
      expiresIn: new Date(Date.now() + 60000),
    });

    res.status(200).json({ message: "logout successfully..." });
  } catch (error) {
    res.status(401).json({ error: "internal server error.." });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({ message: "Token Expired..." });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ message: "not the user..." });
    }

    const updateUser = await user.findByIdAndUpdate(
      user,
      { $set: req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "updated successfully", data: updateUser });
  } catch (error) {
    return res.status(400).json({ message: "some went wrong..." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params.id;

    const updateUser = await user.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "deleted successfully", data: updateUser });
  } catch (error) {
    return res.status(400).json({ message: "some went wrong..." });
  }
};

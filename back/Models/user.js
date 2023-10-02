import mongoose from 'mongoose'

const userScheema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        photo: {
            type: String,
            required: false

        },

        role: {
            type: String,
            default: 'user'
        }

    },

    { timestamps: true}
);

export default mongoose.model("users", userScheema)
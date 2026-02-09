import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        maxLength: 255
    },

    content: {
        type: String,
        required: true,
        trim: true
    },

    author: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

const Post = mongoose.model("Post", postSchema);
export default Post;
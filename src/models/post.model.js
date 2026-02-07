import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false
});

const Post = mongoose.model("Post", postSchema);
export default Post;
import axios from "axios";

const apiRoute = "http://localhost:5000/posts/";
const commentRoute = "http://localhost:5000/posts/comment/";

export const getPosts = async () => await axios.get(apiRoute);

export const getSinglePost = async (id) => await axios.get(`${apiRoute}${id}`);

export const createPost = async (post) => await axios.post(apiRoute, post);

export const deletePost = async (id) => await axios.delete(`${apiRoute}${id}`);

export const getPostComments = async (postId) => await axios.get(`${commentRoute}${postId}`);

export const createComment = async (comment, postId) => await axios.post(`${commentRoute}${postId}`, comment);

export const deleteComment = async (commentId) => await axios.delete(`${commentRoute}${commentId}`);

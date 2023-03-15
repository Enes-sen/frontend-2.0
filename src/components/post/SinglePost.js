import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePost, removePost } from "../../redux/actions/postActions";
import moment from "moment";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  Button,
  CardImg,
  Badge,
} from "reactstrap";
import CommentList from "./CommentList";
import AddCommentForm from "../forms/AddCommentForm";
import "moment/locale/tr";

const SinglePost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentPost = useSelector((state) => state.posts.post);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const convertRelativeTime = (date) => {
    return moment(date).locale('tr').fromNow();
  };

  const handleDelete = () => {
    if (window.confirm("Bu gönderiyi silmek istediğinize emin misiniz?")) {
      dispatch(removePost(currentPost._id));
      window.location.href="/#/posts";
    }
  };

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "60%",
      margin: "0 auto",
      padding: "0 15px",
    }}>
      <Card style={{ width: "100%", marginTop: "7%" }}>
        <CardHeader tag={"h1"}>{currentPost.title}</CardHeader>
        <CardBody>
          <CardText>{currentPost.content}</CardText>
          <Badge color="primary">
            {convertRelativeTime(currentPost.date)}
          </Badge>
          {currentPost.image && <CardImg src={currentPost.image} />}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button color="danger" onClick={handleDelete}>
              Kaldır
            </Button>
          </div>
        </CardBody>
       <AddCommentForm />
      <CommentList/>
      </Card>
    </div>
  );
};

export default SinglePost;

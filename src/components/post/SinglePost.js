import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePost, removePost } from "../../redux/actions/postActions";
import moment from "moment";
import {
  Card,
  CardBody,
  CardText,
  Button,
  CardImg,
  Badge,
} from "reactstrap";
import deleteLogo from "../../images/Kaldr_Logo.png";
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
      textAlign:"center",
      width: "50%",
      marginTop:"5%",
      margin: "0 auto",
      padding: "0 15px",
    }}>
      <Card style={{ width: "100%", marginTop: "10%" }}>
        <CardBody>
          <h1>{currentPost.title}</h1>
          <CardText>{currentPost.content}</CardText>
          <Badge style={{backgroundColor: "rgb(255, 165, 0)",color:"white"}}>
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
            <Button  style={{backgroundColor: "rgb(255, 165, 0)",color:"white"}} onClick={handleDelete}>
              <img src={deleteLogo} alt="Brand logo" width="35" height="35" />
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

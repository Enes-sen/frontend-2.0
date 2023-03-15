import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/actions/postActions";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  Badge,
} from "reactstrap";
import "moment/locale/tr";

const PostsList = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
   const convertRelativeTime = (date) => {
    return moment(date).locale('tr').fromNow();
  };

  useEffect(() => {
    dispatch(fetchPosts())
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!Array.isArray(posts)) {
    return <div>Gösterilecek gönderi yok</div>;
  }
  
 return (
  <div
    className="Container-fluid mt-5"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      position: "relative", // set position to relative
      marginTop: "35%",
      marginBottom: "160px",
      height: "600px",
      width: "33%", // set width
      margin: "0 auto",
    }}
  >
    {/* map over the posts */}
    {posts
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((post, index) => (
        <React.Fragment key={index}>
          <Card className="mt-5" style={{ width: "100%",  margin: "0 auto", marginTop:"200px",marginBottom:"200px", padding: "10px" }}>
            <CardBody>
              <CardTitle tag="h5">{post.title}</CardTitle>
              <Badge color="primary">{convertRelativeTime(post.date)}</Badge>
              <CardText>{post.content}</CardText>
               {post.image && (
                   <CardImg
                       alt="Card image cap"
                       src={post.image}
                       top
                       width="100%"
                       />
                 )}
              <Link className="btn"style={{backgroundColor: "rgb(255, 165, 0)",color:"white"}} to={`/posts/${post._id}`}>
                daha fazla
              </Link>
            </CardBody>
          </Card>
          {index < posts.length - 1 && <div style={{ height: "50px" }}></div>}
          {/* add space between posts */}
        </React.Fragment>
      ))}
  </div>
 );
};

export default PostsList;

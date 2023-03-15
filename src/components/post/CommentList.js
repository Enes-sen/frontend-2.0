import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPostComments, removeComment } from '../../redux/actions/postActions';
import { Card, CardBody, CardTitle, CardText, Badge, Button } from 'reactstrap';
import moment from 'moment';

const CommentList = () => {
  const { id } = useParams();
  const postId = id;
  const [loading, setLoading] = useState(true);
  const comments = useSelector((state) => state.posts.comments);
  const dispatch = useDispatch();
  const convertRelativeTime = (date) => {
    return moment(date).locale('tr').format('lll');
  };

 

  useEffect(() => {
    dispatch(fetchPostComments(postId))
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [dispatch, postId]);

  const handleDelete = (comment) => {
    if (window.confirm("Bu Yorum'u Silmek İstediğiniz'e Emin Misiniz?")) {
      dispatch(removeComment(comment._id));
      window.location.href=`/posts/${comment.postId}`;
      
    }
  };

  const commentsArray = comments?.comments?.comments;

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!Array.isArray(commentsArray) || commentsArray.length === 0) {
    return <div>Gösterilecek yorum yok</div>;
  }

  return (
    <div>
      <h2>Yorumlar:</h2>
      {commentsArray.sort((a, b) => new Date(b.date) - new Date(a.date)).map((comment) => (
        <Card className="mt-5" style={{ width: '100%', margin: '0 auto', padding: '10px' }} key={comment._id}>
          <CardBody>
            <CardTitle tag="h5">{comment.name}</CardTitle>
            <Badge color="primary">{convertRelativeTime(comment.date)}</Badge>
            <CardText>{comment.comment}</CardText>
            <Button color="danger" onClick={() => handleDelete(comment)}>Sil</Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;

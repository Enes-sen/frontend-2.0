import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { addComment } from "../../redux/actions/postActions";
import { useParams } from 'react-router-dom';
import alertify from "alertifyjs";

const AddCommentForm = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const postId = id;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (name === "" || comment === "") {
        alertify.error("Yorum kaydetme eksik bilgi nedeni ile başarısız!", 3);
      } else {
        const newComment = {
          postId: postId,
          name: name,
          comment: comment,
        };
        dispatch(addComment(newComment,postId));
        setName("");
        setComment("");
        alertify.success("Yorum kaydedildi", 3);
      }
    } catch (error) {
      alertify.error(`Kayıt esnasında oluşan hata: ${error}`, 3);
    }
  };

  return (
    <div style={{ width: "60%", marginLeft: "10%", marginTop: "5%" }}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="*Adınız"
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="comment"
            id="comment"
            placeholder="*Yorumunuz"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" style={{backgroundColor: "rgb(255, 165, 0)",color:"white"}} variant="outlined">
           Yorum Yap
       </Button>
      </Form>
    </div>
  );
};

export default AddCommentForm;

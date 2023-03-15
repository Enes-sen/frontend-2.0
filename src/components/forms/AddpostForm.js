import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import { addPost } from "../../redux/actions/postActions";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {FaImage} from "react-icons/fa";
import alertify from "alertifyjs";
import deleteLogo from "../../images/Kaldr_Logo.png";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (title === "" || content === "") {
        alertify.error("Post kaydetme eksik bilgi nedeni ile başarısız!", 3);
      } else {
        const post = {
          title: title,
          content: content,
          image: file,
        };
        dispatch(addPost(post));
        setTitle("");
        setContent("");
        alertify.success("Post kaydedildi", 3);
        window.location.href="/#/posts";
      }
    } catch (error) {
      alertify.error(`Kayıt esnasında oluşan hata: ${error}`, 3);
    }
  };

  const clearAll = () => {
    setTitle("");
    setContent("");
    setFile(null);
    alertify.success("Girdi temizleme başarılı", 2);
  };

  return (
    <div style={{ width: "80%", marginLeft: "10%", marginTop: "15%" }}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="title"
            placeholder="İsminiz.."
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="content"
            placeholder="Yazınız.."
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FileBase64 multiple={false} onDone={({ base64 }) => setFile(base64)} />
          <FaImage style={{backgroundColor: "rgb(255, 165, 0)",color:"white"}} />
        </FormGroup>
        <FormGroup>
          <Button style={{backgroundColor: "rgb(255, 165, 0)",color:"white"}} onClick={() => clearAll()}>
            <img src={deleteLogo} alt="Brand logo" width="25" height="25" />
          </Button>{" "}
          <Button type="submit" style={{backgroundColor: "rgb(255, 165, 0)",color:"white"}} variant="outlined">
            Paylaş
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default AddPostForm;

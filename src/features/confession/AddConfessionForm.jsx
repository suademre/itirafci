import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFirebase } from "react-redux-firebase";
import { Modal, Button, Message, Dropdown, Form } from "semantic-ui-react";
import { tagOptions } from "../../utils/Tags";
import { createConfession } from "./confessionSlice";

const AddConfessionForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { currentUser } = useState((state) => state.auth);
  const { profile } = useState((state) => state.firebase);

  const [status, setStatus] = useState("idle");
  const [content, setContent] = useState("");
  const [shareAs, setShareAs] = useState("anonymous");
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState([]);

  const makeConfession = () => {
    if (canSave) {
      setStatus("pending");
      setErrors([]);

      dispatch(createConfession({ content, tags, shareAs, profile }))
        .then(unwrapResult)
        .then((result) => {
          setStatus("idle");

          // clear Form
          setContent("");
          setTags("");
          setShareAs("user");
          handleClose();
        })
        .catch((error) => {
          setErrors((prevErrors) => [...prevErrors, error]);
          setStatus("idle");
        });
    }
  };

  const displayErrors = () =>
    errors.map((error, key) => <p key={key}>{error.message}</p>);

  const canSave =
    [content, tags, shareAs].every(Boolean) &&
    tags.length >= 1 &&
    status === "idle";

  return (
    <Modal open={open} onClose={handleClose}>
      <Modal.Header>Hadi Itiraf Et!!</Modal.Header>
      <Modal.Description>
        <p
          style={{
            margin: "5px 0px 5px 10px",
            fontSize: "1rem",
            color: "#928D8E",
          }}
        >
          Sirrinizi halkla{" "}
          <strong>
            <ins>anonim olarak</ins>
          </strong>{" "}
          veya{" "}
          <strong>
            <ins>tam isminizi kullanarak paylasin</ins>
          </strong>
        </p>
      </Modal.Description>
      <Modal.Content scrolling>
        <Form>
          <Form.TextArea
            id="content"
            label="Neyi Itiraf ediyorsun"
            placeholder="Bize herseyi anlat..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Form.Group grouped>
            <label>Nasil Itiraf etmek istersiniz?</label>
            <Form.Radio
              label="Anonim olarak"
              value="anonymous"
              checked={shareAs == "anonymous"}
              onChange={(e, { value }) => setShareAs(value)}
            />
            <Form.Radio
              label="Kullanici Adimla"
              value="user"
              checked={shareAs == "user"}
              onChange={(e, { value }) => setShareAs(value)}
            />
          </Form.Group>
          <Dropdown
            id="tags"
            selection
            clearable
            multiple
            header={
              <Dropdown.Header content={"Etikete göre filtrele"} icon="tags" />
            }
            value={tags}
            label="Itirafinizi hangisi daha iyi tanimlar?"
            labeled
            options={tagOptions}
            onChange={(e, { value }) => setTags(value)}
            placeholder="Itiraflariniza en uygun kategoriler hangileri?"
          />
        </Form>
        {errors.length > 0 && <Message error>{displayErrors()}</Message>}
      </Modal.Content>

      <Modal.Actions>
        <Button primary disabled={!canSave} onClick={() => makeConfession()}>
          YAYINLA
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddConfessionForm;

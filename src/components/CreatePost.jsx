import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

export default function Signup() {
  const { currentUser } = useAuth();
  const titleRef = useRef();
  const bodyRef = useRef();
  const imageURLRef = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handlesubmit(e) {
    e.preventDefault();


    setLoading(true);
    db.collection("users").doc(currentUser.uid).collection("blogs")
      .add({
        title: titleRef.current.value,
        body: bodyRef.current.value,
        image: imageURLRef.current.value
      })
      .then((d) => {
        console.log(d);
        setLoading(false);
      })
      .catch((e) => {
        setError("Something went wrong!");
        console.log(e);
      });
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Create New Blog</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handlesubmit}>
            <Form.Group id="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" ref={titleRef} required />
            </Form.Group>
            <Form.Group id="body">
              <Form.Label>Body</Form.Label>
              <Form.Control type="text" ref={bodyRef} required />
            </Form.Group>
            <Form.Group id="image">
              <Form.Label>Image URL </Form.Label>
              <Form.Control type="text" ref={imageURLRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Post
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

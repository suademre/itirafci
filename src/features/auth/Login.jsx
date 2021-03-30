import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Segment,
  Form,
  Header,
  Button,
  Icon,
  Message,
  GridColumn,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom"; // withRouter i almamin sebebi history i kullanabilmek
import { loginUser, registerUserAndUpdateProfile } from "./authSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import styles from "./auth.module.css";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, currentUser } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      history.push("/");
    }
  }, [currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);

    if (isFormValid) {
      dispatch(loginUser({ email, password }))
        .then(unwrapResult)
        .then((loggedInUser) => {})
        .catch((error) => {
          setErrors((prevErrors) => [...prevErrors, error]);
        });
    }
  };

  const isFormValid = () => Boolean(email) && Boolean(password); //bunun mantigini anlamadim neden Boolen deger veriyoruz

  const displayErrors = () =>
    errors.map((error, key) => <p key={key}>{error.message}</p>);

  return (
    <Grid textAlign="center" verticalAlign="middle" className={styles.form}>
      <GridColumn style={{ maxWidth: 500 }}>
        <Header as="h2" color="violet" icon>
          <Icon name="comment alternate outline" />
          {"Itirafciya Giris Yap"}
        </Header>

        <Form>
          <Segment>
            <Form.Field>
              <Form.Input
                fluid
                placeholder="Email Adesi"
                onChange={(e) => setEmail(e.target.value)}
                icon="mail"
                iconPosition="left"
                name="email"
                type="email"
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                fluid
                placeholder="Parola"
                onChange={(e) => setPassword(e.target.value)}
                icon="lock"
                iconPosition="left"
                name="password"
                type="password"
              />
            </Form.Field>
          </Segment>

          <Button
            color="green"
            fluid
            size="large"
            onClick={handleSubmit}
            loading={loading === "pending"}
          >
            Giris Yap
          </Button>
        </Form>
        {errors.length > 0 && <Message error>{displayErrors()}</Message>}
        <Message>
          <Icon name="help" />
          Hesabiniz Yok mu ?<Link to="/register">Hesap Olustur</Link>
        </Message>
      </GridColumn>
    </Grid>
  );
};

export default withRouter(Login);

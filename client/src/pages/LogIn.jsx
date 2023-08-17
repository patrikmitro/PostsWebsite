import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext";
const LogIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { setAuthState, authState } = useContext(AuthContext);
  useEffect(() => {
    if (authState.state) navigate(-1);
  });
  const initialValues = {
    username: null,
    password: null,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(16).required("You must input a username"),
    password: Yup.string().min(3).max(8).required("You must input a password"),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((res) => {
        localStorage.setItem("accessToken", res.data.accessToken);

        setAuthState({
          ...authState,
          username: res.data.username,
          id: res.data.id,
          state: true,
        });
        console.log(authState);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      });
  };
  return (
    <LogInWrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={false}
      >
        <StyledForm>
          <StyledTitle>Log In</StyledTitle>
          <Wrapper>
            <StyledErrorMessage name="username" component="span" />
            <StyledField
              name="username"
              placeholder="username"
              type="text"
              autocomplete
            />
          </Wrapper>
          <Wrapper>
            <StyledErrorMessage name="password" component="span" />
            <StyledField
              name="password"
              placeholder="password"
              type="password"
              autocomplete
            />
          </Wrapper>

          <StyledSubmit type="submit"> Log In</StyledSubmit>
          <ResponseError>{errorMessage}</ResponseError>
        </StyledForm>
      </Formik>
    </LogInWrapper>
  );
};

export default LogIn;

const StyledField = styled(Field)`
  border-radius: 6px;
  background: #f6f6f6;
  padding: 12px;

  border: none;
  :focus {
    outline: 2px solid #181a1f;
    border: 2px solid #181a1f;
  }
`;

const StyledTitle = styled.h2`
  text-align: center;
  font-size: 44px;
  padding-bottom: 24px;
  line-height: 150%;
  font-weight: 400;
`;

const LogInWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  padding: 24px;
  justify-content: center;
  @media only screen and (max-width: 600px) {
    justify-content: flex-start;
    align-items: center;
    margin-top: 100px;
    flex-direction: column;
  }
`;
const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
`;
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  max-width: 360px;
  width: 100%;

  border-radius: 5px;
`;

const StyledSubmit = styled.button`
  border-radius: 6px;
  background-color: #000;
  padding: 14px 24px;
  color: #fff;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResponseError = styled.span`
  color: red;
  text-align: center;
`;

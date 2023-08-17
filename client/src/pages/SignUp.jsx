import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { authState, setAuthState } = useContext(AuthContext);
  useEffect(() => {
    if (authState.username) navigate(-1);
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
      .post("http://localhost:3001/auth", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("accessToken", res.data.user.accessToken);

        setAuthState({
          ...authState,
          username: res.data.user.username,
          id: res.data.user.id,
          state: true,
        });

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
        validateOnChange={false}
        validateOnBlur={false}
      >
        <StyledForm>
          <StyledTitle>Sign Up</StyledTitle>
          <Wrapper>
            <StyledErrorMessage name="username" component="span" />
            <StyledField name="username" placeholder="username" type="text" />
          </Wrapper>
          <Wrapper>
            <StyledErrorMessage name="password" component="span" />
            <StyledField
              name="password"
              placeholder="password"
              type="password"
            />
          </Wrapper>

          <StyledSubmit type="submit"> Sign Up</StyledSubmit>
          <ResponseError>{errorMessage}</ResponseError>
        </StyledForm>
      </Formik>
    </LogInWrapper>
  );
};

export default SignUp;

const StyledField = styled(Field)`
  border-radius: 6px;
  background: #f6f6f6;
  padding: 12px;
  border: 2px solid transparent;
  :focus {
    border: 2px solid green;
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

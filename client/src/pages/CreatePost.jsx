import React, { useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import axios from "axios";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";

const CreatePost = () => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    console.log(authState);
    if (!authState.state) {
      navigate("/sign-up");
    }
  });
  const initialValues = {
    title: null,
    postText: null,
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required("You must input a text"),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        navigate(`/posts/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <CreatePostWrapper>
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
      >
        <StyledForm>
          <StyledTitle>Create a Post</StyledTitle>
          <Wrapper>
            <StyledErrorMessage name="title" component="span" />
            <StyledField name="title" placeholder="Title" />
          </Wrapper>
          <Wrapper>
            <StyledErrorMessage name="postText" component="span" />
            <StyledField name="postText" placeholder="Post..." />
          </Wrapper>

          <StyledSubmit type="submit"> Create Post</StyledSubmit>
        </StyledForm>
      </Formik>
    </CreatePostWrapper>
  );
};

export default CreatePost;

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

const CreatePostWrapper = styled.div`
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
  width: max-content;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

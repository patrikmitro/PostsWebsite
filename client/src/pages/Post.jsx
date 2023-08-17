import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import PostCard from "../components/PostCard";
import CommentCard from "../components/CommentCard";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";

const Post = () => {
  const [postObject, setPostObject] = useState([]);
  const [commentObject, setCommentObject] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const { authState } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
      setPostObject(response.data);
    });
    axios
      .get(`http://localhost:3001/comments/${id}`)
      .then((response) => setCommentObject(response.data));
  }, [id]);
  const handleCreateComment = () => {
    axios
      .post(
        `http://localhost:3001/comments/`,
        {
          commentBody: commentValue,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        navigate("/sign-up");
      });
    setTimeout(() => {
      axios
        .get(`http://localhost:3001/comments/${id}`)
        .then((response) => setCommentObject(response.data))
        .then(() => setCommentValue(""));
    }, 50);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCreateComment();
    }
  };

  const handleDeletePost = () => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDeleteComment = (commentId) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: {
          id: commentId,
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setCommentObject(commentObject.filter((item) => item.id !== commentId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {postObject !== null ? (
        <PostWrapper>
          <PostCard
            postText={postObject.postText}
            username={postObject.username}
            title={postObject.title}
            navigate={postObject.id}
            createdAt={postObject.createdAt}
          />
          {postObject.username === authState.username && (
            <StyledButton onClick={handleDeletePost}>delete</StyledButton>
          )}

          <CommentFormWrapper>
            <Heading>Leave a Comment</Heading>

            <CommentTextArea
              placeholder="comment something...
        "
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <StyledButton type="submit" onClick={handleCreateComment}>
              Post Comment
            </StyledButton>
          </CommentFormWrapper>
          <CommentsWrapper>
            <Heading>Comments</Heading>
            {commentObject.length > 0 ? (
              commentObject.map((item) => {
                return (
                  <CommentCard
                    commentText={item.commentBody}
                    createdAt={item.createdAt}
                    username={item.userName}
                    key={item.id}
                    delete={() => handleDeleteComment(item.id)}
                    authState={authState.username}
                  />
                );
              })
            ) : (
              <p>There are no comments</p>
            )}
          </CommentsWrapper>
        </PostWrapper>
      ) : (
        <h1>ta tuna nic neni</h1>
      )}
    </>
  );
};

export default Post;

const PostWrapper = styled.div`
  margin: 76px auto;
  max-width: 820px;
  padding: 24px;
`;
const CommentFormWrapper = styled.div``;

const Heading = styled.h2`
  font-size: 28px;

  padding: 48px 0 24px 0;
  font-weight: 500;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  max-height: 300px;
  margin: 0 0 28px 0;
  box-sizing: border-box;
  border-radius: 6px;
  background: #f6f6f6;
  padding: 12px;
  outline: none;
  border: none;
  :focus {
    outline: 2px solid #181a1f;
  }
  resize: vertical;
`;
const StyledButton = styled.button`
  border-radius: 6px;
  background-color: #000;
  padding: 14px 24px;
  margin-top: 12px;
  color: #fff;
  width: max-content;
`;

const CommentsWrapper = styled.div``;

import React from "react";
import styled from "styled-components";

import { getPostDuration } from "../utils/dateUtils";

const CommentCard = (props) => {
  const postDuration = getPostDuration(props.createdAt);

  return (
    <CardWrapper>
      <UserInfoWrapper>
        <ImageWrapper>
          <UserDetails>
            <Username>{props.username}</Username>
            <Duration>{postDuration}</Duration>
          </UserDetails>
        </ImageWrapper>

        <CommentText>{props.commentText}</CommentText>
      </UserInfoWrapper>

      {props.authState === props.username && (
        <DeleteButton onClick={props.delete}>Delete</DeleteButton>
      )}
    </CardWrapper>
  );
};

export default CommentCard;

const Username = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const CardWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(24, 26, 31, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CommentText = styled.p`
  font-size: 16px;
  white-space: normal;
  font-weight: 400;
  color: #000;
  padding-top: 8px;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Duration = styled.span`
  font-size: 14px;
  color: #626262;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeleteButton = styled.button`
  border-radius: 6px;
  background-color: #000;
  padding: 14px 24px;
  color: #fff;
`;

const UserInfoWrapper = styled.div``;

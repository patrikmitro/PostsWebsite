import React from "react";
import styled, { css } from "styled-components";

import { useNavigate } from "react-router-dom";

import { getPostDuration } from "../utils/dateUtils";

const PostCard = (props) => {
  let navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`posts/${props.navigate}`);
  };

  const duration = getPostDuration(props.createdAt);

  return (
    <CardWrapper
      onClick={props.isHomePage && handleRedirect}
      hasPointer={props.pointer}
    >
      <UserImageWrapper>
        <UserIconSvg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 4C11.1634 4 4 11.1634 4 20C4 24.1982 5.61612 28.0197 8.26399 30.8755C8.36396 30.5447 8.49691 30.2198 8.67035 29.9097C9.25835 28.8584 10.0001 27.8863 10.8802 27.0267C11.7634 26.1641 12.7599 25.4401 13.8347 24.8681C12.1977 23.3012 11.1743 21.1113 11.1743 18.6667C11.1743 13.836 15.1704 10 20 10C24.8296 10 28.8257 13.836 28.8257 18.6667C28.8257 21.1113 27.8023 23.3012 26.1653 24.8681C27.2401 25.4401 28.2366 26.1641 29.1198 27.0267C29.9999 27.8863 30.7417 28.8585 31.3296 29.9097C31.5031 30.2198 31.636 30.5447 31.736 30.8755C34.3839 28.0197 36 24.1982 36 20C36 11.1634 28.8366 4 20 4ZM27.8822 33.9273C27.9599 33.5279 27.9988 33.1529 28 32.8206C28.0019 32.2716 27.9013 31.9745 27.8386 31.8623C27.4375 31.1451 26.93 30.4793 26.3249 29.8883C24.6553 28.2576 22.381 27.3333 20 27.3333C17.619 27.3333 15.3447 28.2576 13.6751 29.8883C13.07 30.4793 12.5625 31.1451 12.1614 31.8623C12.0987 31.9745 11.9981 32.2716 12 32.8206C12.0012 33.1529 12.0401 33.5279 12.1178 33.9273C14.443 35.2466 17.131 36 20 36C22.869 36 25.557 35.2466 27.8822 33.9273ZM20 23.3333C22.7099 23.3333 24.8257 21.1998 24.8257 18.6667C24.8257 16.1335 22.7099 14 20 14C17.2901 14 15.1743 16.1335 15.1743 18.6667C15.1743 21.1998 17.2901 23.3333 20 23.3333ZM0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20C40 27.1145 36.2837 33.3597 30.696 36.9023C27.6014 38.8643 23.9303 40 20 40C16.0697 40 12.3986 38.8643 9.30403 36.9023C3.71627 33.3597 0 27.1145 0 20Z"
            fill="#F55A5A"
          />
        </UserIconSvg>

        <UserDateWrapper>
          <PostUserName>{props.username}</PostUserName>
          <PostDateText>{duration}</PostDateText>
        </UserDateWrapper>
      </UserImageWrapper>

      <PostTitle>{props.title}</PostTitle>
      <PostText>{props.postText}</PostText>
    </CardWrapper>
  );
};

export default PostCard;

const PostUserName = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const CardWrapper = styled.div`
  padding: 20px;
  ${(props) =>
    props.hasPointer &&
    css`
      cursor: pointer;
    `}
  border-bottom: 1px solid rgba(24, 26, 31, 0.5);
`;

const PostTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  color: #000;
  padding-top: 12px;
`;

const PostText = styled.p`
  font-size: 16px;
  white-space: normal;
  font-weight: 400;
  hyphens: auto;
  color: #000;
  padding-top: 8px;
`;

const UserImageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PostDateText = styled.span`
  font-size: 14px;
  color: #626262;
`;

const UserDateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserIconSvg = styled.svg``;

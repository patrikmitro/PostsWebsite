import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

//component
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [state, setState] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((response) => setListOfPosts(response.data))
      .then(setState(false));
  }, []);
  return (
    <>
      {state ? (
        <h1>Loading</h1>
      ) : (
        <HomePageWrapper>
          <HomePageContainer>
            {listOfPosts.length > 0 ? (
              listOfPosts.map((item) => {
                return (
                  <PostCard
                    pointer="true"
                    isHomePage
                    key={item.id}
                    navigate={item.id}
                    title={item.title}
                    postText={item.postText}
                    username={item.username}
                    createdAt={item.createdAt}
                  />
                );
              })
            ) : (
              <NoPostsText>There are no posts :(</NoPostsText>
            )}
          </HomePageContainer>
        </HomePageWrapper>
      )}
    </>
  );
};

export default HomePage;

const HomePageWrapper = styled.section`
  margin: 70px 0;
`;
const HomePageContainer = styled.div`
  padding: 24px;
  margin: 0 auto;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NoPostsText = styled.h3`
  position: absolute;
  font-size: 44px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

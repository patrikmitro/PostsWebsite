import React, { useState, useEffect, useContext, Fragment } from "react";
import styled, { css } from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Header = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("load", () => {
      handleResize();
    });

    const handleResize = () => {
      if (window.innerWidth > 530) {
        setIsSmallScreen(false);
      } else {
        setIsSmallScreen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleMenu = () => {
    setIsMenuOpened((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: null, state: false });
    navigate("/");
  };

  return (
    <HeaderWrapper>
      <HeaderContentWrapper isMenuOpened={isMenuOpened}>
        <ButtonsWrapper
          isSmallScreen={isSmallScreen}
          isMenuOpened={isMenuOpened}
        >
          <HomePostWrapper onClick={toggleMenu}>
            <Link to="/">
              <StyledButton background="#333333">
                <ButtonText color="white">Home Page</ButtonText>
              </StyledButton>
            </Link>
            <Link to="/create-post">
              <StyledButton background="white">
                <ButtonText color="black">Create A Post</ButtonText>
              </StyledButton>
            </Link>
          </HomePostWrapper>

          <FormWrapper onClick={toggleMenu}>
            {!authState.state ? (
              <>
                <Link to="log-in">
                  <StyledButton background="#333333">
                    <ButtonText color="white">Log In</ButtonText>
                  </StyledButton>
                </Link>
                <Link to="sign-up">
                  <StyledButton background="white">
                    <ButtonText color="black">Sign Up</ButtonText>
                  </StyledButton>
                </Link>
              </>
            ) : (
              <Fragment>
                <Link to="/">
                  <ButtonText color="white">{authState.username}</ButtonText>
                </Link>
                <Link to="/">
                  <StyledButton background="#333333">
                    <ButtonText color="white" onClick={handleLogout}>
                      Sign Out
                    </ButtonText>
                  </StyledButton>
                </Link>
              </Fragment>
            )}
          </FormWrapper>
        </ButtonsWrapper>
        <BurgerMenuButton isMenuOpened={isMenuOpened} onClick={toggleMenu}>
          <BurgerLine1 />
          <BurgerLine2 />
        </BurgerMenuButton>
      </HeaderContentWrapper>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  height: 80px;
  background-color: #000;
  padding: 0 24px;
  @media only screen and (max-width: 530px) {
    position: fixed;
    width: 100%;
    top: 0;
  }
`;

const ButtonText = styled.span`
  color: ${(props) => props.color};

  @media only screen and (max-width: 530px) {
    color: black;
    font-size: 24px;
    padding: 12px 0;
  }
`;

const StyledButton = styled.button`
  border-radius: 40px;
  padding: 8px 24px;
  background: ${(props) => props.background};

  @media only screen and (max-width: 530px) {
    background: transparent;
  }
`;

const HomePostWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media only screen and (max-width: 530px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media only screen and (max-width: 530px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
`;

const HeaderContentWrapper = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  height: inherit;
  @media only screen and (max-width: 530px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const BurgerMenuButton = styled.div`
  display: none;
  flex-direction: column;
  gap: 8px;

  cursor: pointer;
  @media only screen and (max-width: 530px) {
    display: flex;
  }

  ${(props) =>
    props.isMenuOpened &&
    css`
      ${BurgerLine1} {
        transform: rotate(45deg) translate(7px);
      }
      ${BurgerLine2} {
        transform: rotate(-45deg) translate(7px);
      }
    `}
`;

const BurgerLine1 = styled.div`
  display: none;
  width: 20px;
  height: 2px;
  transition: all 0.5s;
  background-color: white;
  @media only screen and (max-width: 530px) {
    display: block;
  }
`;

const BurgerLine2 = styled.div`
  display: none;
  width: 20px;
  height: 2px;
  transition: all 0.5s;
  background-color: white;
  @media only screen and (max-width: 530px) {
    display: block;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: inherit;

  ${(props) =>
    props.isSmallScreen &&
    css`
      @media only screen and (max-width: 530px) {
        position: fixed;
        transition: transform 0.5s ease-in-out;
        top: 80px;
        z-index: 99;
        left: 0;
        ${props.isMenuOpened
          ? css`
              transform: translate(0);
            `
          : css`
              transform: translate(100%);
            `}

        height: 100vh;
        width: 100%;
        background-color: white;
        display: block;
        margin: 12px 0 0 0;
      }
    `}
`;

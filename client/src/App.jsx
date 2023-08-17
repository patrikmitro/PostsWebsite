import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import GlobalStyles from "./styles/GlobalStyles";
import { AuthContext } from "./helpers/AuthContext";

import Header from "./components/Header";

import HomePage from "./pages/HomePage";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: null,
    state: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setAuthState({
          ...authState,
          state: true,
          id: res.data.id,
          username: res.data.username,
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);

        setAuthState({ ...authState, state: false });
      });
  }, []);

  return (
    <Fragment>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <GlobalStyles />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="posts/:id" element={<Post />} />
            <Route path="log-in" element={<LogIn />} />
            <Route path="sign-up" element={<SignUp />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </Fragment>
  );
}

export default App;

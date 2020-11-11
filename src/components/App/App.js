import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import ArticlePage from "../../pages/ArticlePage";
import NewPostPage from "../../pages/NewPostPage";
import Header from "../Header";
import { AuthContext } from "../../contexts";
import { getMe } from "../../WebAPI";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TDOO: 有 token 才 call api
    getMe().then((response) => {
      if (response.ok) {
        setUser(response.data);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/posts/:id">
              <ArticlePage />
            </Route>
            <Route path="/new-post">
              <NewPostPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;

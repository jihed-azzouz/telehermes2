// AuthLayout.js
import { Outlet } from "react-router-dom";

import Header from "./Header";
import { Container } from "reactstrap";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div className="contentArea">
        {/********header**********/}
        <Header />
        {/********Middle Content**********/}
        <Container className="p-4 wrapper" fluid>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default AuthLayout;

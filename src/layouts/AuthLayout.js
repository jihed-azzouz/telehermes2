// AuthLayout.js
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div>
      {/* Header or other elements for auth pages */}
      <main>{children}</main>
      {/* Footer or other common elements */}
    </div>
  );
};

export default AuthLayout;

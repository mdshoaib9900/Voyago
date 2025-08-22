import React, { useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { Button } from "@mui/material";
import LoginModel from "./LoginModel";
import SignupModel from "./SignUpModel";

export default function ModalManager() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);

  const handleOpenLogin = () => {
    setOpenSignup(false);
    setOpenLogin(true);
  };

  const handleOpenSignup = () => {
    setOpenLogin(false);
    setOpenSignup(true);
  };

  return (
    <>
      {/* Just example buttons to trigger */}
      <Button variant="contained" onClick={handleOpenLogin}>
        Open Login
      </Button>

      <LoginModel
        open={openLogin}
        handleClose={() => setOpenLogin(false)}
        handleOpenSignup={handleOpenSignup}
      />

      <SignupModel
        open={openSignup}
        handleClose={() => setOpenSignup(false)}
        handleOpenLogin={handleOpenLogin}
      />
    </>
  );
}

import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import googleLogo from "../assets/googlelogo.png";
import axios from "axios";
import SignupModal from "./SignUpModel";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  width: 400,
  maxWidth: "90%",
};

export default function LoginModal({ open, handleClose,setUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Field-specific errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignIn = async () => {
    setEmailError("");
    setPasswordError("");

    // Client-side validation
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      handleClose();
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";

      if (message.toLowerCase().includes("email")) setEmailError(message);
      else if (message.toLowerCase().includes("password"))
        setPasswordError(message);
      else alert(message);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold">
            Login
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          label="Email Address"
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />

        <TextField
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Typography
          variant="body2"
          sx={{ textAlign: "right", color: "gray", cursor: "pointer", mt: 0.5 }}
        >
          Forgot your password?
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "orange",
            borderRadius: "30px",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e69500" },
          }}
          onClick={handleSignIn}
        >
          Sign In
        </Button>

        <Divider sx={{ my: 2 }}>or</Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <img
              src={googleLogo}
              alt="Google"
              style={{ width: 20, height: 20 }}
            />
          }
          sx={{
            textTransform: "none",
            borderRadius: "30px",
            fontWeight: "bold",
            paddingY: 1,
          }}
        >
          Sign In with Google
        </Button>

        <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
          Don’t have an account?{" "}
          <span style={{ color: "orange", cursor: "pointer" }} onClick={(e)=>{e.target.value}}>Sign Up</span>
        </Typography>
      </Box>
    </Modal>
  );
}


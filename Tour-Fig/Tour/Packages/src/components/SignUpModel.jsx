import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import googleLogo from "../assets/googlelogo.png";
import axios from "axios";

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

export default function SignupModal({ open, handleClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Error + success states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [serverMessage, setServerMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleSignUp = async () => {
    // Reset errors
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setTermsError("");
    setServerMessage(null);

    // Client-side validation
    if (!name) {
      setNameError("Name is required");
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (!agreeTerms) {
      setTermsError("You must agree to Terms and Privacy");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      setIsError(false);
      setServerMessage(res.data.message || "User registered successfully ✅");

      // optional: auto-close after 1.5s
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err) {
      console.error("Signup error:", err.response?.data); // 👈 Debug in console
      const field = err.response?.data?.field;
      const message = err.response?.data?.message || "Sign up failed";

      if (field === "name") {
        setNameError(message);
      } else if (field === "email") {
        setEmailError(message);
      } else if (field === "password") {
        setPasswordError(message);
      } else {
        alert(message);
      }
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
            Create Account
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Show server success or error message */}
        {serverMessage && (
          <Alert severity={isError ? "error" : "success"} sx={{ mb: 2 }}>
            {serverMessage}
          </Alert>
        )}

        <TextField
          label="Name and Surname"
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="Enter your name and surname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!nameError}
          helperText={nameError}
        />

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

        <FormControlLabel
          control={
            <Checkbox
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              size="small"
            />
          }
          label={
            <Typography variant="body2">
              I agree with{" "}
              <span style={{ color: "orange", cursor: "pointer" }}>
                Terms and Privacy
              </span>
            </Typography>
          }
        />
        {termsError && (
          <Typography variant="body2" sx={{ color: "red", mt: 0.5 }}>
            {termsError}
          </Typography>
        )}

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
          onClick={handleSignUp}
        >
          Sign Up
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
          Sign Up with Google
        </Button>

        <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
          Already have an account?{" "}
          <span style={{ color: "orange", cursor: "pointer" }}>Log In</span>
        </Typography>
      </Box>
    </Modal>
  );
}

import Navbar from "./Header";

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, sm: 4, md: 6 },
        mt: { xs: 6, md: -20 }, 
        ml: { xs: 0, md: 40 },
      }}
    >
      <Box textAlign="center" width="100%">
        <Box
          sx={{
            width: "91.67px",
            height: "91.67px",
            backgroundColor: "#FA8B02",
            borderRadius: "50%",
            opacity: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            top: "4.17px",
            left: "4.17px",
            mx: "auto",
            mb: { xs: 2, sm: 3 },
          }}
        >
          <CheckIcon
            sx={{
              color: "#fff",
              fontSize: 44,
            }}
          />
        </Box>

        <Typography
          sx={{
            width: { xs: "100%", sm: "379px" },
            fontFamily: "Open Sans",
            fontWeight: 700,
            fontSize: { xs: "24px", sm: "28px", md: "32px" },
            lineHeight: "120%",
            textAlign: "center",
            color: "#000000",
            mx: "auto",
            mb: { xs: 1.5, sm: 2 },
          }}
        >
          Your Order is complete!
        </Typography>

        <Typography
          sx={{
            width: { xs: "100%", sm: "561px" },
            fontFamily: "Open Sans",
            fontWeight: 400,
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            lineHeight: "130%",
            color: "#333333",
            textAlign: "center",
            mx: "auto",
            mb: { xs: 3, sm: 4 },
            px: { xs: 1, sm: 0 },
          }}
        >
          You will be receiving a confirmation email with order details.
        </Typography>

        <Button
          onClick={() => navigate("/")}
          fullWidth={true}
          sx={{
            maxWidth: "279.25px",
            height: "59px",
            borderRadius: "50px",
            border: "1px solid #FA8B02",
            backgroundColor: "#fff",
            color: "#FA8B02",
            fontFamily: "Open Sans",
            fontWeight: 600,
            fontSize: "18px",
            textTransform: "none",
            mx: "auto",
            "&:hover": {
              backgroundColor: "#FFF3E0",
              borderColor: "#FA8B02",
            },
          }}
        >
          Go to the Home Page
        </Button>
      </Box>
    </Container>
  );
}

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import avatar1 from "../assets/avatar.png";

const testimonials = [
  {
    name: "Lyod Gomez",
    quote:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure",
    avatar: avatar1,
  },
  {
    name: "Sophia Ray",
    quote:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure",
    avatar: avatar1,
  },
  {
    name: "Emma Watson",
    quote:
      "To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it?",
    avatar: avatar1,
  },
  {
    name: "John Doe",
    quote:
      "In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best...",
    avatar: avatar1,
  },
];

const CustomerTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const maxIndex = Math.max(testimonials.length - itemsPerPage, 0);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + itemsPerPage, maxIndex));
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <Box mt={8}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          Happy Customers Says
        </Typography>
        <Box>
          <IconButton
            onClick={handlePrev}
            disabled={currentIndex === 0}
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "50%",
              mr: 1.5,
              p: "8px",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            <ArrowBackIos sx={{ fontSize: "1rem", ml: "4px" }} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            sx={{
              backgroundColor: "orange",
              color: "#fff",
              borderRadius: "50%",
              p: "8px",
              "&:hover": { backgroundColor: "#fb8c00" },
            }}
          >
            <ArrowForwardIos sx={{ fontSize: "1rem" }} />
          </IconButton>
        </Box>
      </Box>

      {/* Testimonials Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column", // Stack on small screens
            md: "row", // Side-by-side on larger screens
          },
          gap: 4,
        }}
      >
        {visibleTestimonials.map((testimony, idx) => (
          <Card
            key={idx}
            sx={{
              width: { xs: "100%", md: "50%" },
              borderRadius: 4,
              px: 4,
              py: 5,
              textAlign: "center",
              position: "relative",
              backgroundColor: "#fafafa",
            }}
          >
            {/* Top Quote Mark */}
            <Typography
              sx={{
                position: "absolute",
                top: 15,
                left: 30,
                fontSize: "3.5rem",
                color: "#e0e0e0",
                fontFamily: "serif",
              }}
            >
              “
            </Typography>

            <CardContent sx={{ position: "relative", zIndex: 1 }}>
              <Avatar
                src={testimony.avatar}
                alt={testimony.name}
                sx={{ width: 64, height: 64, mb: 2, mx: "auto" }}
              />
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {testimony.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {testimony.quote}
              </Typography>
            </CardContent>

            {/* Bottom Quote Mark */}
            <Typography
              sx={{
                position: "absolute",
                bottom: 10,
                right: 30,
                fontSize: "3.5rem",
                color: "#e0e0e0",
                fontFamily: "serif",
              }}
            >
              ”
            </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default CustomerTestimonials;

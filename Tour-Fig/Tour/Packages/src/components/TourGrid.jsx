import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Styled Components
const StyledCard = styled(Card)(() => ({
  borderRadius: 20,
  overflow: "hidden",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
}));

const StyledImage = styled(CardMedia)(() => ({
  height: 200,
  width: "100%",
  objectFit: "cover",
}));

const IconRow = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginTop: 8,
}));

const DescriptionText = styled(Typography)(() => ({
  fontSize: "0.85rem",
  color: "#333",
  marginTop: 8,
  lineHeight: 1.4,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
}));

const ArrowButton = styled(IconButton)(({ active }) => ({
  backgroundColor: active ? "#f97316" : "#e0e0e0",
  color: "#fff",
  "&:hover": {
    backgroundColor: active ? "#ea580c" : "#ccc",
  },
}));

const TourGrid = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tours");
        setTours(res.data);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };
    fetchTours();
  }, []);

  // ✅ Split into groups of 4 for each "page"
  const chunkArray = (arr, size) =>
    arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  const slides = chunkArray(tours, 4);

  const handlePrev = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setPage((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  return (
    <Box sx={{ mt: 8, px: 3, maxWidth: "2200px", mx: "auto", pb: 5 }}>
      {/* Header + Arrows */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            fontFamily: "Oswald, sans-serif",
            textTransform: "uppercase",
          }}
        >
          Explore Our Popular Destinations
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <ArrowButton onClick={handlePrev} active={page > 0 ? 1 : 0}>
            <ArrowBackIosNew fontSize="small" />
          </ArrowButton>
          <ArrowButton
            onClick={handleNext}
            active={page < slides.length - 1 ? 1 : 0}
          >
            <ArrowForwardIos fontSize="small" />
          </ArrowButton>
        </Box>
      </Box>

      {/* Grid of 4 cards */}
      {slides.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
  {slides[page].map((tour) => (
    <Grid item xs={12} sm={6} md={3} key={tour._id}>
      <StyledCard
        onClick={() => navigate(`/tour/${tour._id}`)}
        sx={{ cursor: "pointer" }}
      >
        <StyledImage
          component="img"
          image={tour.image_url}
          alt={tour.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/300x200?text=No+Image";
          }}
        />
        <CardContent sx={{ px: 2.5, pb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#222' }}>
                {tour.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography sx={{ color: '#555', fontSize: '0.9rem' }}>from</Typography>
                <Typography variant="h6" component="span" sx={{ color: '#f97316', fontWeight: 700, ml: 1 }}>
                  {tour.price_per_person} €
                </Typography>
              </Box>

              <IconRow>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaCalendarAlt color="#f97316" />
                  <Typography sx={{ fontSize: '0.8rem', color: '#f97316' }}>{tour.date}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FaUsers color="#f97316" />
                  <Typography sx={{ fontSize: '0.8rem', color: '#f97316' }}>{tour.number_of_group} PP</Typography>
                </Box>
              </IconRow>

              <DescriptionText>
                {tour.description || 'Visit the destination and explore the surroundings with our guide.'}
              </DescriptionText>
            </CardContent>
      </StyledCard>
    </Grid>
  ))}
</Grid>

      ) : (
        <Typography
          align="center"
          sx={{ fontWeight: "bold", color: "#666", mt: 4 }}
        >
          No tours available
        </Typography>
      )}
    </Box>
  );
};

export default TourGrid;

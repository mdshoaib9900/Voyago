import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";
import BookBike from "./BookBike";
import HappyCustomer from "./HappyCustomers";

// Styled components
const StyledCard = styled("div")(() => ({
  borderRadius: 20,
  overflow: "hidden",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  "&:hover": { transform: "scale(1.02)" },
}));

const StyledImage = styled("img")(() => ({
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

const ServiceCard = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: 16,
  overflow: "hidden",
  background: "#fff",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  transition: "transform 0.3s ease",
  cursor: "pointer",
  "&:hover": { transform: "translateY(-4px)" },
}));

const ServiceImage = styled("img")(() => ({
  width: "100%",
  height: 180,
  objectFit: "cover",
}));

const TourPackages = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [tours, setTours] = useState([]);

  // Fetch tours from backend
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tours", {
          cache: "no-store",
        });
        const data = await response.json();
        console.log("Fetched tours:", data);
        setTours(data || []);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };
    fetchTours();
  }, []);

  // Example services (static)
  const services = [
    {
      title: "Bike and rickshaw rental",
      description: "Book your quality vehicle quickly for an hour or all day!",
      image: "src/assets/Bike&riksha.png",
    },
    {
      title: "Guided tours of Lucca",
      description:
        "Live the real Lucchese experience by visiting the suburbs by bike!",
      image: "src/assets/Rectangle 19.png",
    },
    {
      title: "Trips In The Tuscan Hills",
      description:
        "Do you need not only a bike but also a driver? Then you have found the right place!",
      image: "src/assets/Rectangle 3.png",
    },
  ];

  return (
    <Box sx={{ mt: 8, px: 3, maxWidth: "1300px", mx: "auto", pb: 5 }}>
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontFamily: "Oswald, sans-serif",
          textTransform: "uppercase",
          mb: 4,
        }}
      >
        Tour Packages
      </Typography>

      {/* Tour Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: isMobileOrTablet ? "nowrap" : "wrap",
          gap: 3,
          overflowX: isMobileOrTablet ? "auto" : "visible",
          pb: isMobileOrTablet ? 2 : 0,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-thumb": {
            background: "#ccc",
            borderRadius: 10,
          },
        }}
      >
        {tours.length > 0 ? (
          tours.map((tour) => (
            <StyledCard
              key={tour._id}
              onClick={() => navigate(`/tour/${tour._id}`)}
              style={{
                flex: isMobileOrTablet ? "0 0 auto" : "0 0 calc(25% - 18px)",
                maxWidth: isMobileOrTablet ? "300px" : "calc(25% - 18px)",
              }}
            >
              <StyledImage
                src={tour.image_url}
                alt={tour.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/300x200?text=No+Image";
                }}
              />
              <Box sx={{ px: 2.5, pb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#222" }}
                >
                  {tour.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Typography sx={{ color: "#555", fontSize: "0.9rem" }}>
                    from
                  </Typography>
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ color: "#f97316", fontWeight: 700, ml: 1 }}
                  >
                    {tour.price_per_person} €
                  </Typography>
                </Box>
                <IconRow>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FaCalendarAlt color="#f97316" />
                    <Typography sx={{ fontSize: "0.8rem", color: "#f97316" }}>
                      {tour.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FaUsers color="#f97316" />
                    <Typography sx={{ fontSize: "0.8rem", color: "#f97316" }}>
                      {tour.number_of_group} PP
                    </Typography>
                  </Box>
                </IconRow>
                <DescriptionText>
                  {tour.description ||
                    "Visit the destination and explore the surroundings with our guide."}
                </DescriptionText>
              </Box>
            </StyledCard>
          ))
        ) : (
          <Typography>No tours available</Typography>
        )}
      </Box>

      {/* Services Section */}
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
          Services
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: { xs: "nowrap", md: "wrap" },
            overflowX: { xs: "auto", md: "visible" },
            gap: 3,
            "&::-webkit-scrollbar": { height: 8 },
            "&::-webkit-scrollbar-thumb": {
              background: "#ccc",
              borderRadius: 10,
            },
          }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              sx={{
                flex: { xs: "0 0 auto", md: "1 1 calc(33.333% - 20px)" },
                maxWidth: { md: "calc(33.333% - 20px)" },
              }}
            >
              <ServiceImage src={service.image} alt={service.title} />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "#555", minHeight: 48 }}
                >
                  {service.description}
                </Typography>
                <Button
                  variant="text"
                  sx={{
                    mt: 1,
                    color: "#f97316",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Read More →
                </Button>
              </Box>
            </ServiceCard>
          ))}
        </Box>
      </Box>

      {/* Other Components */}
      <Box sx={{ mt: 8 }}>
        <BookBike />
      </Box>
      <Box sx={{ mt: 8 }}>
        <HappyCustomer />
      </Box>
    </Box>
  );
};

export default TourPackages;

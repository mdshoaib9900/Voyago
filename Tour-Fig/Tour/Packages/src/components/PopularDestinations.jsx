import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { styled } from "@mui/system";

// Styled Components
const PopularTourCard = styled(Card)(({ theme }) => ({
  minWidth: 280,
  maxWidth: 300,
  borderRadius: 12,
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  flexShrink: 0,
}));

const PopularTourImage = styled(CardMedia)({
  height: 180,
});

const PopularTourContent = styled(CardContent)({
  padding: "16px",
});

const PopularTourTitle = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.1rem",
  marginBottom: 4,
});

const PopularTourPrice = styled(Typography)({
  fontWeight: "bold",
  fontSize: "1.2rem",
  color: "#f97316",
});

const PopularTourDescription = styled(Typography)({
  fontSize: "0.9rem",
  color: "#6b7280", // gray-500
});

const PopularTourInfo = styled(Typography)({
  fontSize: "0.8rem",
  color: "#9ca3af", // gray-400
  marginTop: 4,
});

// Main Component
const PopularDestinations = ({ tours }) => {
  return (
    <Box
      sx={{
        mt: 8,
        px: 3,
        maxWidth: "1280px",
        mx: "auto",
        pb: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        {/* <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", color: "text.primary" }}
        >
          Explore Our Popular Destinations
        </Typography> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 3,
          pb: 2,
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f1f1f1",
        }}
      >
        {tours?.map((tour) => (
          <PopularTourCard key={tour.id}>
            <PopularTourImage
              image={tour.image_url}
              title={tour.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/280x180/e0e0e0/555555?text=Image+Not+Found`;
              }}
            />
            <PopularTourContent>
              <PopularTourTitle>{tour.title}</PopularTourTitle>
              <Box sx={{ display: "flex", alignItems: "baseline", mb: 1 }}>
                <Typography variant="body2" sx={{ color: "#4b5563", mr: 0.5 }}>
                  from
                </Typography>
                <PopularTourPrice>{tour.price_per_person}€</PopularTourPrice>
              </Box>
              <PopularTourDescription>{tour.entry_fees}</PopularTourDescription>
              <PopularTourInfo>
                {new Date(tour.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}{" "}
                | {tour.time}
              </PopularTourInfo>
            </PopularTourContent>
          </PopularTourCard>
        ))}
      </Box>
    </Box>
  );
};

export default PopularDestinations;

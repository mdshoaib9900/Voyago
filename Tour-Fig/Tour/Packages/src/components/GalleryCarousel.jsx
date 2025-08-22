import React, { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

import gallery1 from "../assets/Rectangle43.png"; // Large image
import gallery2 from "../assets/Rectangle44.png"; // Top left
import gallery3 from "../assets/Rectangle45.png"; // Bottom left
import gallery4 from "../assets/Rectangle46.png"; // Right tall

const initialImages = [gallery1, gallery2, gallery3, gallery4];

const GalleryCarousel = () => {
  const [images, setImages] = useState(initialImages);

  const handleNext = () => {
    // Rotate right
    setImages((prev) => [...prev.slice(1), prev[0]]);
  };

  const handlePrev = () => {
    // Rotate left
    setImages((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
  };

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
          Gallery
        </Typography>
        <Box>
          <IconButton
            onClick={handlePrev}
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

      {/* Custom Layout */}
      <Grid container spacing={2}>
        {/* Large Left Image */}
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: 4, height: "100%" }}>
            <CardMedia
              component="img"
              image={images[0]}
              alt="Main gallery image"
              sx={{ height: { xs: 300, md: 416 }, objectFit: "cover" }}
            />
          </Card>
        </Grid>

        {/* Right Section: Two columns */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            {/* Column 1: two stacked images */}
            <Grid item xs={6}>
              <Grid container spacing={2} direction="column">
                <Grid item>
                  <Card sx={{ borderRadius: 4 }}>
                    <CardMedia
                      component="img"
                      image={images[1]}
                      alt="Stacked Top"
                      sx={{ height: 200, objectFit: "cover" }}
                    />
                  </Card>
                </Grid>
                <Grid item>
                  <Card sx={{ borderRadius: 4 }}>
                    <CardMedia
                      component="img"
                      image={images[2]}
                      alt="Stacked Bottom"
                      sx={{ height: 200, objectFit: "cover" }}
                    />
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Column 2: one tall image */}
            <Grid item xs={6}>
              <Card sx={{ borderRadius: 4, height: "100%" }}>
                <CardMedia
                  component="img"
                  image={images[3]}
                  alt="Tall Right"
                  sx={{ height: 416, objectFit: "cover" }}
                />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GalleryCarousel;

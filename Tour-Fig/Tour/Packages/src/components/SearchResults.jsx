import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const SearchResults = ({ tours }) => {
  const navigate = useNavigate();

  if (!tours || tours.length === 0) {
    return <Typography>No tours found for your filters.</Typography>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        {tours.map((tour) => (
          <Grid item xs={12} md={6} lg={4} key={tour.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={tour.image_url || "/default.jpg"}
                alt={tour.title}
              />
              <CardContent>
                <Typography variant="h6">{tour.title}</Typography>
                <Typography>Date: {tour.date}</Typography>
                <Typography>Time: {tour.time}</Typography>
                <Typography>Group: {tour.number_of_group}</Typography>
                <Typography>Transport: {tour.transportation}</Typography>
                {tour.category && (
                  <Typography>Category: {tour.category}</Typography>
                )}
                <Button
                  variant="contained"
                  sx={{ mt: 1 }}
                  onClick={() => navigate(`/tour/${tour.id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

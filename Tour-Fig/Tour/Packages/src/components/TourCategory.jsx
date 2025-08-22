// src/components/TourCategory.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/system';

import bikeRickshaw from '../assets/Bike&riksha.png';
import tourGuide from '../assets/tour-guide.png';
import taxiNcc from '../assets/taxi-ncc.png';
import busPackage from '../assets/bus-package.png';

const CategoryCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 6px 15px rgba(0,0,0,0.15)',
  },
  width: 280,
  textAlign: 'left',
  backgroundColor: '#fff',
  paddingBottom: theme.spacing(2),
}));

const CategoryImage = styled(CardMedia)(() => ({
  width: '100%',
  height: 180,
  objectFit: 'cover',
  borderRadius: '12px 12px 0 0',
}));

const CategoryContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
  width: '100%',
}));

const TourCategory = () => {
  const categories = [
    {
      name: 'Bike and rickshaw rental',
      image: bikeRickshaw,
      description: 'Book your quality vehicle quickly for an hour or all day!',
    },
    {
      name: 'Guided tour of the countryside',
      image: tourGuide,
      description: 'Live the real Lucchese experience by visiting the suburbs by bike!',
    },
    {
      name: 'Taxi and NCC service',
      image: taxiNcc,
      description: 'Do you need not only a bike but also a driver? Then you have found the right place!',
    },
    {
      name: 'Bus Package',
      image: busPackage,
      description: 'Do you need not only a bike but also a driver? Then you have found the right place!',
    },
  ];

  return (
    <Box
      sx={{
        py: 8,
        px: 2,
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row', // cards in a row
          flexWrap: 'wrap', // wrap on small screens
          justifyContent: 'center',
          gap: 4, // space between cards
          maxWidth: '1280px',
        }}
      >
        {categories.map((category, index) => (
          <CategoryCard key={index}>
            <CategoryImage
              component="img"
              image={category.image}
              alt={category.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/280x180/e0e0e0/555555?text=Image+Not+Found`;
              }}
            />
            <CategoryContent>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}
              >
                {category.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {category.description}
              </Typography>
            </CategoryContent>
          </CategoryCard>
        ))}
      </Box>
    </Box>
  );
};

export default TourCategory;

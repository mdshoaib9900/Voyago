// src/components/BackgroundWrapper.jsx
import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

// Importing the local background image from the assets folder.
// Ensure you have 'background.jpg' in your 'src/assets/' directory.
import background from "../assets/background.jpg";

const Root = styled(Box, {
  shouldForwardProp: (prop) => prop !== "blur",
})(({ blur }) => ({
  flexGrow: 1, // Allows it to take up available vertical space
  width: "100%", // Takes full width
  backgroundImage: `url(${background})`, // Use the imported local image here
  backgroundSize: "auto",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative", // Keep relative for the overlay
  overflow: "hidden", // Hide overflow if content goes beyond bounds
  // filter: blur ? "blur(1px)" : "none", // Removed the blur filter
  transition: "filter 0.3s ease-in-out",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // Center content vertically
  minHeight: '1020px', // Minimum height for the background section
  padding: '20px', // Add some padding
  // Removed: marginTop: '80px', // This was causing the overlap
  // REMOVED: height: "100vh", width: "100vw" -- This was causing the overlap
}));

const BackgroundWrapper = ({ children, blur }) => {
  return (
    <Root blur={blur}>
      {/* Overlay for better text readability */}
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0, 0, 0, 0.4)' }}></Box>
      {/* Content for the hero section */}
      <Box sx={{ zIndex: 1, textAlign: 'center', color: 'white', mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 1, fontStyle: 'italic' }}>
          Enjoy in the best way!
        </Typography>
        <Typography variant="h6" component="p">
          Enjoy our services for your trip anytime
        </Typography> 
      </Box>
      {children} {/* This will be where SearchBar is placed */}
    </Root>
  );
};

export default BackgroundWrapper;

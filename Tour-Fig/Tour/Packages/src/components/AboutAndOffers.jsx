import React from "react";
import { Box, Typography, Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import womanImage from "../assets/Group3.png";
import specialOfferWoman from "../assets/specialOffer-girl.png";

const AboutAndOffers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {/* WHY US SECTION */}
      <Box
        sx={{
          width: "100%",
          minHeight: "640px",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Container
          sx={{
            maxWidth: "1419.8px !important",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT IMAGE SHAPE */}
          <Box
            sx={{
              width: { xs: "90%", md: "400px" },
              aspectRatio: "1 / 1.4",
              backgroundColor: "#f7931e",
              borderRadius: "50% 50% 50% 0",
              clipPath:
                "path('M200,0 C310,0 400,90 400,200 C400,310 200,640 200,640 C200,640 0,310 0,200 C0,90 90,0 200,0 Z')",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              mb: { xs: 4, md: 0 },
            }}
          >
            <Box
              component="img"
              src={womanImage}
              alt="Tourist"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* RIGHT TEXT */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              WELCOME TO OUR SITE!
            </Typography>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              We are the best company for your visit
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ fontSize: "1.1rem" }}
            >
              After decades of experience, and a whole life in Lucca, we offer
              you the most complete tourism service in the city. In addition to
              having bikes and rickshaws to have as much fun as you want, you
              have the choice of tour guides with whom to tour and drivers for
              your every need! We offer packages in the way that you get the
              most at the lowest price. Book with us and we will always be
              available for you!
            </Typography>

            {/* STATS */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                mt: 4,
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              {[
                { value: "20+", label: "Years\nExperience" },
                { value: "100+", label: "Happy\nCustomer" },
                { value: "15+", label: "Choice\nof Services" },
                { value: "10+", label: "Professional\nGuides" },
              ].map((item, idx) => (
                <Box key={idx}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "#f7931e" }}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    whiteSpace="pre-line"
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* SPECIAL OFFERS SECTION */}
      <Box
        sx={{
          width: "100%",
          background: "linear-gradient(to right, #fec294, #fec294)",
          px: 2,
          py: 8,
        }}
      >
        <Box
          sx={{
            maxWidth: "1419.8px",
            mx: "auto",
            position: "relative", // Needed for absolute image
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "visible", // Prevent image clipping
          }}
        >
          {/* LEFT TEXT BOX */}
          <Box
            sx={{
              backgroundColor: "#e8bc96ff",
              borderRadius: "16px",
              padding: 4,
              maxWidth: 400,
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              mb: { xs: 4, md: 0 },
              zIndex: 2,
              ml: { xs: 0, md: 30 },
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: "#333", mb: 1 }}
            >
              Get Special Offers for Organizations
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry...
            </Typography>
            <Box
              sx={{
                backgroundColor: "#f1580ce1",
                color: "#fff",
                display: "inline-block",
                padding: "10px 20px",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#e9690eff",
                },
              }}
            >
              Contact Us
            </Box>
          </Box>

          {/* RIGHT IMAGE */}
          <Box
            component="img"
            src={specialOfferWoman}
            alt="Special Offer Woman"
            sx={{
              position: {
                xs: "relative", // ✅ Let it be part of the normal layout on mobile
                md: "absolute", // ❗ Use absolute only from medium screen upwards
              },
              bottom: {
                xs: "0px",
                md: "-40px",
                lg: "-150px",
                xl: "-30px",
              },
              right: {
                xs: "auto",
                md: "80px",
              },
              mt: { xs: 4, md: 0 }, // ✅ Add margin on top for spacing on small screens
              mx: { xs: "auto", md: "0" }, // Center on small screens
              transform: {
                xs: "none",
                md: "none",
              },
              width: {
                xs: "280px",
                sm: "350px",
                md: "450px",
                lg: "720px",
                xl: "650px",
              },
              height: "600px",
              objectFit: "contain",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default AboutAndOffers;

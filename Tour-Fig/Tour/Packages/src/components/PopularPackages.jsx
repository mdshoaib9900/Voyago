import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";

// Import local images
import ppBikeRickshaw from "../assets/pp-bike&riksha.png";
import ppBikeTours from "../assets/pp-bike-tours.png";
import ppBusTrips from "../assets/pp-bus-trips.png";
import ppTransfer from "../assets/pp-transfer.png";

// Import icons
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import PersonIcon from "@mui/icons-material/Person";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const PackageCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
  },
  width: 280,
  flexShrink: 0,
  textAlign: "left",
  backgroundColor: "#fff",
  overflow: "hidden",
}));

const PackageImage = styled(CardMedia)(() => ({
  width: "100%",
  height: 180,
  objectFit: "cover",
  borderRadius: "12px 12px 0 0",
}));

const PackageContentTop = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  width: "100%",
}));

const PackageContentFeatures = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: 0,
  flexGrow: 1,
  width: "100%",
}));

const PriceBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  marginBottom: theme.spacing(1),
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#f7931e",
  marginRight: theme.spacing(0.5),
}));

const PerDayText = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const StyledList = styled(List)(() => ({
  padding: 0,
  margin: 0,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingY: theme.spacing(0.2),
  paddingX: 0,
  margin: 0,
  minHeight: "unset",
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "24px",
  color: "#f7931e",
  marginRight: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#f7931e",
  color: "#fff",
  fontWeight: "bold",
  borderRadius: "999px",
  textTransform: "none",
  padding: theme.spacing(1, 4),
  width: "calc(100% - 32px)",
  margin: theme.spacing(0, 2, 2, 2),
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  "&:hover": {
    backgroundColor: "#e67e0b",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  },
}));

const PopularPackages = () => {
  const packages = [
    {
      name: "BIKE / RICKSHAW",
      image: ppBikeRickshaw,
      price: 10,
      features: [
        { text: "Your bike for a day", icon: <DirectionsBikeIcon /> },
        { text: "City App", icon: <SmartphoneIcon /> },
        { text: "Discount on Rickshaw", icon: <LocalOfferIcon /> },
        { text: "Guaranteed Support", icon: <SupportAgentIcon /> },
      ],
    },
    {
      name: "BIKE TOURS",
      image: ppBikeTours,
      price: 30,
      features: [
        { text: "A Mountain Bike Included", icon: <DirectionsBikeIcon /> },
        { text: "A Guide For You", icon: <PersonIcon /> },
        { text: "Bottle of water", icon: <WaterDropIcon /> },
        { text: "Guaranteed Support", icon: <SupportAgentIcon /> },
      ],
    },
    {
      name: "BUS TRIPS",
      image: ppBusTrips,
      price: 45,
      features: [
        { text: "Park ticket", icon: <LocalParkingIcon /> },
        { text: "Return bus", icon: <DirectionsBusIcon /> },
        { text: "Companion", icon: <PersonIcon /> },
        { text: "Guaranteed Support", icon: <SupportAgentIcon /> },
      ],
    },
    {
      name: "Transfer",
      image: ppTransfer,
      price: 10,
      features: [
        { text: "Personal Driver", icon: <PersonIcon /> },
        { text: "Wherever You Want", icon: <LocationOnIcon /> },
        { text: "At the best price", icon: <AttachMoneyIcon /> },
        { text: "Guaranteed Support", icon: <SupportAgentIcon /> },
      ],
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        py: 8,
        px: 2,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Heading aligned left */}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: "bold",
          color: "#333",
          mb: 6,
          textAlign: "left",
          width: "100%",
          maxWidth: "1280px",
        }}
      >
        The Most Popular Packages
      </Typography>

      {/* Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          maxWidth: "1280px",
        }}
      >
        {packages.map((pkg, index) => (
          <PackageCard key={index}>
            <PackageImage
              component="img"
              image={pkg.image}
              alt={pkg.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/280x180/e0e0e0/555555?text=Image+Not+Found`;
              }}
            />
            <PackageContentTop>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  mb: 0.5,
                  textTransform: "uppercase",
                }}
              >
                {pkg.name}
              </Typography>
              <PriceBox>
                <PriceText>€{pkg.price}</PriceText>
                <PerDayText>/day</PerDayText>
              </PriceBox>
            </PackageContentTop>
            <PackageContentFeatures>
              <StyledList>
                {pkg.features.map((feature, idx) => (
                  <StyledListItem key={idx}>
                    <StyledListItemIcon>{feature.icon}</StyledListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ fontSize: 14, color: "#555" }}
                      primary={feature.text}
                    />
                  </StyledListItem>
                ))}
              </StyledList>
            </PackageContentFeatures>
            <StyledButton>Book Now</StyledButton>
          </PackageCard>
        ))}
      </Box>
    </Box>
  );
};

export default PopularPackages;

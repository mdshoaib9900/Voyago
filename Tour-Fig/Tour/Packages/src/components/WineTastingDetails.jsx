import React from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import TranslateIcon from "@mui/icons-material/Translate";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import ImageGallery from "../components/ImageGallery";
import GalleryCarousel from "../components/GalleryCarousel";
import CustomerTestimonials from "../components/CustomerTestimonials";
import { useNavigate } from "react-router-dom";


const WineTastingDetails = ({ tourData }) => {
  if (!tourData) return <Typography>Tour data not found</Typography>;
  const navigate = useNavigate();


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box p={3}>
        <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
          Back
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Left Column: Images */}
          <Box
            sx={{
              flex: "0 0 54%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <img
              src={tourData.image_url}
              alt={tourData.title}
              style={{
                borderRadius: 12,
                width: "100%",
                maxHeight: 400,
                objectFit: "cover",
              }}
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x400/e0e0e0/555555?text=No+Image";
              }}
            />
          </Box>

          {/* Right Column: Details */}
          <Box
            sx={{
              flex: "0 0 46%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {tourData.title}
            </Typography>
            <Typography variant="h6" color="orange" fontWeight="bold" my={1}>
              from €{tourData.price_per_person}
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              {tourData.description}
            </Typography>

            <Typography variant="subtitle1" fontWeight="medium" mt={2}>
              Select a date
            </Typography>
            <Box sx={{ mt: 1, alignSelf: "flex-start", maxWidth: 320 }}>
              <DateCalendar defaultValue={new Date(tourData.date)} />
            </Box>

            <Typography variant="subtitle1" fontWeight="medium" mt={2}>
              Time
            </Typography>
            <TimePicker
              label="Select the time"
              defaultValue={
                tourData.time
                  ? new Date(`1970-01-01T${tourData.time.replace(" PM", "").replace(" AM", "")}:00`)
                  : null
              }
              renderInput={(params) => (
                <TextField {...params} fullWidth sx={{ mt: 1 }} />
              )}
            />

            <Box sx={{ mt: 4 }}>
              <Button
                  variant="contained"
                  onClick={() => navigate("/purchase")}
                  sx={{
                    backgroundColor: "orange",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Buy Now
                </Button>

            </Box>
          </Box>
        </Box>

        {/* Tour Details */}
        <Box mt={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Details
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {tourData.description}
          </Typography>

          <List dense>
            <ListItem>
              <ListItemIcon>
                <GroupIcon sx={{ color: "orange" }} />
              </ListItemIcon>
              <ListItemText primary={`Number of group: ${tourData.number_of_group}`} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <AccessTimeIcon sx={{ color: "orange" }} />
              </ListItemIcon>
              <ListItemText primary={`Duration: ${tourData.duration}`} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <LocationOnIcon sx={{ color: "orange" }} />
              </ListItemIcon>
              <ListItemText primary="Departuring and arriving areas: Lucca" />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <AssignmentTurnedInIcon sx={{ color: "orange" }} />
              </ListItemIcon>
              <ListItemText primary={`Guide service: ${tourData.guide_service}`} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <TranslateIcon sx={{ color: "orange" }} />
              </ListItemIcon>
              <ListItemText primary={`Language: ${tourData.language}`} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <AssignmentTurnedInIcon sx={{ color: "orange" }} />
              </ListItemIcon>
              <ListItemText primary={`Entry Fees: ${tourData.entry_fees}`} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <EmojiTransportationIcon sx={{ color: "orange" }} />
              </ListItemIcon>
              <ListItemText primary={`Transportation: ${tourData.transportation}`} />
            </ListItem>
          </List>
        </Box>

        {/* Optional dynamic media */}
        <GalleryCarousel />
        <CustomerTestimonials />
      </Box>
    </LocalizationProvider>
  );
};

export default WineTastingDetails;

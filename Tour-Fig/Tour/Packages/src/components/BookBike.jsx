import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import Bike from "../assets/bike.png"
 
const serviceOptions = [
  { label: "Mountain Bike", value: "mountain" },
  { label: "City Bike", value: "city" },
  { label: "Electric Bike", value: "electric" },
];
 
const BookBike = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
 
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(to right, #ffd2b2ff, #ffa680ff)",
          p: 2,
          borderRadius: "0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          // maxWidth: "1300px",
          height: "600px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
           <Box
  sx={{
    position: { xs: "relative", md: "absolute" },
    top: { xs: "auto", md: "120px" },
    left: { xs: "auto", md: "130px" },
    width: "100%",
    maxWidth: "600px",
    mx: { xs: "auto", md: 0 }, // center horizontally on mobile
    px: { xs: 2, md: 0 }, // small padding on mobile
  }}
>
    <Typography
  variant="h5"
  sx={{
    position: { xs: "relative", md: "absolute" },
    top: { xs: "-10px", md: "-65px" }, // ✅ moved higher only on mobile
    left: { xs: "auto", md: "50%" },
    transform: { xs: "none", md: "translateX(-50%)" },
    fontWeight: 900,
    fontSize: "30px",
    color: "#000",
    zIndex: 2,
    textAlign: "center",
    whiteSpace: "nowrap",
    mb: { xs: 2, md: 0 },
  }}
>
  Book Now Bike
</Typography>
 
              <Box
                sx={{
                  borderRadius: "20px",
                  p: 2,
                  height: "390px",
                  width: "100%",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(15px)",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
                    backdropFilter: "blur(25px)",
                    backgroundColor: "rgba(255, 255, 255, 0.45)",
                    transform: "scale(1.01)",
                  },
                }}
              >
                <Grid container spacing={2}>
                  {/* Name */}
                  <Grid item xs={12} sx={{ width: "47%" }}>
                    Name and Surname
                    <TextField
                      // label="Name and Surname"
                      placeholder="Enter your Name and Surname"
                      variant="outlined"
                      fullWidth
                      sx={{
                        height: "60px",
                        "& .MuiOutlinedInput-root": {
                          height: "60px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          "&:hover fieldset": { borderColor: "transparent" },
                          "&.Mui-focused fieldset": { borderColor: "transparent" },
                        },
                        "& fieldset": { borderColor: "transparent" },
                      }}
                    />
                  </Grid>
 
                  {/* Email */}
                  <Grid item xs={12} sx={{ width: "47%" }}>
                    Email Address
                    <TextField
                      // label="Email Address"
                      placeholder="Enter your Email Address"
                      variant="outlined"
                      fullWidth
                      sx={{
                        height: "60px",
                        "& .MuiOutlinedInput-root": {
                          height: "60px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          "&:hover fieldset": { borderColor: "transparent" },
                          "&.Mui-focused fieldset": { borderColor: "transparent" },
                        },
                        "& fieldset": { borderColor: "transparent" },
                      }}
                    />
                  </Grid>
 
                  {/* Telephone */}
                  <Grid item xs={12} sx={{ width: "47%" }}>
                    Telephone Number
                    <TextField
                      // label="Telephone Number"
                      placeholder="Enter your Telephone Number"
                      variant="outlined"
                      fullWidth
                      sx={{
                        height: "60px",
                        "& .MuiOutlinedInput-root": {
                          height: "60px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          "&:hover fieldset": { borderColor: "transparent" },
                          "&.Mui-focused fieldset": { borderColor: "transparent" },
                        },
                        "& fieldset": { borderColor: "transparent" },
                      }}
                    />
                  </Grid>
 
                  {/* Service Type */}
                  <Grid item xs={12} sx={{ width: "47%" }}>
                    Service Type
                    <TextField
                      label="Service the Type"
                      placeholder="Select the Service type"
                      select
                      variant="outlined"
                      fullWidth
                      defaultValue=""
                      sx={{
                        height: "60px",
                        "& .MuiOutlinedInput-root": {
                          height: "60px",
                          backgroundColor: "#fff",
                          borderRadius: "10px",
                          "&:hover fieldset": { borderColor: "transparent" },
                          "&.Mui-focused fieldset": { borderColor: "transparent" },
                        },
                        "& fieldset": { borderColor: "transparent" },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select the Service Type
                      </MenuItem>
                      {serviceOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
 
                  {/* Date */}
                  <Grid item xs={6} sx={{ width: "47%" }}>
                    Date
                    <DatePicker
                      // label="Date"
                      placeholder="Select the Data"
                      value={selectedDate}
                      onChange={(newValue) => setSelectedDate(newValue)}
                      slotProps={{
                        textField: {
                          placeholder: "Select the Date",
                          variant: "outlined",
                          fullWidth: true,
                          InputProps: {
                            endAdornment: (
                              <InputAdornment position="start">
                                <CalendarMonthIcon sx={{ color: "#FA8B02" }} />
                              </InputAdornment>
                            ),
                          },
                          sx: {
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            height: "60px",
                            "& .MuiOutlinedInput-root": {
                              height: "60px",
                              "&:hover fieldset": { borderColor: "transparent" },
                              "&.Mui-focused fieldset": { borderColor: "transparent" },
                            },
                            "& fieldset": { borderColor: "transparent" },
                          },
                        },
                      }}
                    />
                  </Grid>
 
                  {/* Time */}
                  <Grid item xs={6} sx={{ width: "47%" }}>
                    Time
                    <TimePicker
                      // label="Time"
                      placeholder="Select  The Time"
                      value={selectedTime}
                      onChange={(newValue) => setSelectedTime(newValue)}
                      slotProps={{
                        textField: {
                          placeholder: "Select the Time",
                          variant: "outlined",
                          fullWidth: true,
                          InputProps: {
                            endAdornment: (
                              <InputAdornment position="start">
                                <AccessTimeIcon sx={{ color: "#FA8B02" }} />
                              </InputAdornment>
                            ),
                          },
                          sx: {
                            backgroundColor: "#fff",
                            borderRadius: "10px",
                            height: "60px",
                            "& .MuiOutlinedInput-root": {
                              height: "60px",
                              "&:hover fieldset": { borderColor: "transparent" },
                              "&.Mui-focused fieldset": { borderColor: "transparent" },
                            },
                            "& fieldset": { borderColor: "transparent" },
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
 
                {/* Submit Button */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FA8B02",
                      color: "#fff",
                      px: 4,
                      py: 1,
                      borderRadius: "30px",
                      fontWeight: "bold",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#e57c00",
                      },
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
 
<Box
  component="img"
  src={Bike}
  alt="Bike"
  sx={{
    position: "absolute",
    right: "120px",
    bottom: "-20px",
    width: "550px",
    height: "400px",
    objectFit: "contain",
    zIndex: 0,
    opacity: 0.95,
    transform: "scaleX(-1)", // ✅ flips the image horizontally
    display: {
      xs: "none",
      sm: "block",
    },
    
  }}
/>
 
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};
 
export default BookBike;
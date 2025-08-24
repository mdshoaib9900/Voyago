import React, { useState,useEffect } from "react";
import OrderSuccess from "./OrderSuccess";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [telephone,setTelephone]=useState("");
  const [service,setService]=useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Get user from localStorage (saved at login)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(user.name || "");  
      setEmail(user.email || "");
    }
  }, []);

const handleBooking = async () => {
  try {
    const bookingData = {
      name,
      email,
      telephone,
      service,
      date: selectedDate,
      time: selectedTime,
    };

    const res = await axios.post("http://localhost:5000/api/bikeBookings", bookingData);
    navigate("/OrderSuccess");
  } catch (err) {
    console.error(" Error saving booking:", err);
    alert("Booking failed. Try again!");
  }
};

 
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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={telephone}
                      onChange={(e)=> setTelephone(e.target.value)}
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
                      value={service}
                      onChange={(e)=>setService(e.target.value)}
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
                    onClick={handleBooking}
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
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   MenuItem,
// } from "@mui/material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DatePicker, TimePicker } from "@mui/x-date-pickers";
// import axios from "axios";
// import { format } from "date-fns";

// const BookBike = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [telephone, setTelephone] = useState("");
//   const [service, setService] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);

//   // ✅ Load user data from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const user = JSON.parse(storedUser);
//         setName(user?.name || "");
//         setEmail(user?.email || "");
//       } catch {
//         console.error("Invalid user data in localStorage");
//       }
//     }
//   }, []);

//   // ✅ Handle booking
//   const handleBooking = async () => {
//     if (!name || !email || !telephone || !service || !selectedDate || !selectedTime) {
//       alert("⚠️ Please fill all fields before booking.");
//       return;
//     }

//     const bookingData = {
//       name,
//       email,
//       telephone,
//       service,
//       date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : null,
//       time: selectedTime ? format(selectedTime, "HH:mm") : null,
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/bikeBookings",
//         bookingData
//       );
//       console.log("✅ Saved booking:", res.data);
//       alert("🎉 Booking successful!");
//       // 👉 You can redirect to a success page here
//       // navigate("/order-success");
//     } catch (err) {
//       console.error("❌ Error saving booking:", err.response?.data || err.message);
//       alert("Booking failed. Please try again.");
//     }
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Container maxWidth="sm" style={{ marginTop: "50px" }}>
//         <Typography variant="h4" gutterBottom>
//           Book a Bike Ride
//         </Typography>

//         {/* Name (auto-filled from login) */}
//         <TextField
//           fullWidth
//           label="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           margin="normal"
//         />

//         {/* Email (auto-filled from login) */}
//         <TextField
//           fullWidth
//           label="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           margin="normal"
//         />

//         {/* Telephone */}
//         <TextField
//           fullWidth
//           label="Telephone"
//           type="tel"
//           inputProps={{ pattern: "[0-9]{10}" }}
//           value={telephone}
//           onChange={(e) => setTelephone(e.target.value)}
//           margin="normal"
//           placeholder="Enter 10 digit number"
//         />

//         {/* Service selection */}
//         <TextField
//           select
//           fullWidth
//           label="Select Service"
//           value={service}
//           onChange={(e) => setService(e.target.value)}
//           margin="normal"
//         >
//           <MenuItem value="Bike Ride">Bike Ride</MenuItem>
//           <MenuItem value="Scooter Ride">Scooter Ride</MenuItem>
//         </TextField>

//         {/* Date picker */}
//         <DatePicker
//           label="Select Date"
//           value={selectedDate}
//           onChange={(newDate) => setSelectedDate(newDate)}
//           renderInput={(params) => (
//             <TextField fullWidth margin="normal" {...params} />
//           )}
//         />

//         {/* Time picker */}
//         <TimePicker
//           label="Select Time"
//           value={selectedTime}
//           onChange={(newTime) => setSelectedTime(newTime)}
//           renderInput={(params) => (
//             <TextField fullWidth margin="normal" {...params} />
//           )}
//         />

//         {/* Submit button */}
//         <Button
//           variant="contained"
//           color="primary"
//           fullWidth
//           onClick={handleBooking}
//           style={{ marginTop: "20px" }}
//         >
//           Book Now
//         </Button>
//       </Container>
//     </LocalizationProvider>
//   );
// };

// export default BookBike;

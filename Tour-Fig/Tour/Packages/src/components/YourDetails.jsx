import React, { useState, useContext } from "react";
import { BookingContext } from "./BookingContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dummyImg from "../assets/dummyImg.png";
import { useNavigate } from "react-router-dom";

const steps = ["Booking Details", "Your Details", "Payment"];

export default function CustomerDetails() {
  const [activeStep] = useState(1);
  const { updateBookingData } = useContext(BookingContext);
  const navigate = useNavigate();

  // ✅ Use one object for form data
  const [formData, setFormData] = useState({
    fullName: "",
    surname: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    fullName: false,
    phone: false,
    email: false,
  });

  // ✅ Validation helpers
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isValidPhone = (phone) =>
    /^[0-9]{10,15}$/.test(phone.trim());

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "email") {
      setErrors((prev) => ({ ...prev, email: !isValidEmail(value) }));
    }
    if (field === "phone") {
      setErrors((prev) => ({ ...prev, phone: !isValidPhone(value) }));
    }
    if (field === "fullName") {
      setErrors((prev) => ({ ...prev, fullName: value.trim() === "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: formData.fullName.trim() === "",
      phone: !isValidPhone(formData.phone),
      email: !isValidEmail(formData.email),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleNext = () => {
    if (!validateForm()) return;

    updateBookingData({
      customerDetails: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
      },
    });

    navigate("/payment"); // ✅ Go to Payment step
  };

  // Dummy ticket summary (replace with context later)
  const ticketSummary = {
    date: "FRI, 23 DEC 2022",
    time: "15:00",
    tickets: [
      { label: "Adult (18+)", qty: 2, price: 32 },
      { label: "Child (6–17)", qty: 1, price: 22 },
      { label: "Infant (0–5)", qty: 1, price: 0 },
    ],
  };

  const totalPrice = ticketSummary.tickets.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6, pt: 10 }}>
      <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
        {/* Stepper */}
        <Box display="flex" justifyContent="center" mb={4}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Form + Ticket Overview */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
          }}
        >
          {/* Left - Customer Form */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Who shall we send these tickets to?
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 3,
              }}
            >
              <Box>
                <InputLabel>Name *</InputLabel>
                <TextField
                  fullWidth
                  placeholder="Enter your name"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  error={errors.fullName}
                  helperText={errors.fullName && "Name is required"}
                />
              </Box>

              <Box>
                <InputLabel>Surname</InputLabel>
                <TextField
                  fullWidth
                  placeholder="Enter your surname"
                  value={formData.surname}
                  onChange={(e) => handleChange("surname", e.target.value)}
                />
              </Box>

              <Box>
                <InputLabel>Phone Number *</InputLabel>
                <TextField
                  fullWidth
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  error={errors.phone}
                  helperText={errors.phone && "Enter valid phone (10–15 digits)"}
                />
              </Box>

              <Box>
                <InputLabel>Email *</InputLabel>
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                  helperText={errors.email && "Enter a valid email"}
                />
              </Box>
            </Box>
          </Box>

          {/* Right - Ticket Summary */}
          <Box sx={{ flex: 1, mt: 6 }}>
            <Card sx={{ borderRadius: "20px", p: 3, boxShadow: 2 }}>
              <CardContent>
                <Typography sx={{ fontWeight: 700, mb: 2 }}>
                  Your Tickets Overview
                </Typography>

                <Box display="flex" gap={2} mb={3}>
                  <Box
                    component="img"
                    src={dummyImg}
                    alt="Wine"
                    sx={{
                      width: 100,
                      height: 80,
                      borderRadius: "12px",
                      objectFit: "cover",
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 700 }}>Wine tasting In Tuscany</Typography>
                    <Box display="flex" gap={1} alignItems="center">
                      <CalendarTodayIcon fontSize="small" sx={{ color: "#FA8B02" }} />
                      <Typography fontSize={13}>{ticketSummary.date}</Typography>
                    </Box>
                    <Box display="flex" gap={1} alignItems="center">
                      <AccessTimeIcon fontSize="small" sx={{ color: "#FA8B02" }} />
                      <Typography fontSize={13}>{ticketSummary.time}</Typography>
                    </Box>
                  </Box>
                </Box>

                {ticketSummary.tickets.map(({ label, qty, price }) => (
                  <Box key={label} display="flex" justifyContent="space-between" mb={1}>
                    <Typography>{`${qty}x ${label}`}</Typography>
                    <Typography>€{(qty * price).toFixed(2)}</Typography>
                  </Box>
                ))}

                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography fontWeight={700}>Total Price</Typography>
                  <Typography fontWeight={700} color="#FA8B02">
                    €{totalPrice.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, borderRadius: "999px", background: "#FA8B02" }}
                  onClick={handleNext}
                >
                  Go to the Next Step
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

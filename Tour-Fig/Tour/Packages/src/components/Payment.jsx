import React, { useState, useContext } from "react";
import { BookingContext } from "../components/BookingContext";
import ordersuccess from "../components/OrderSuccess";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import "@fontsource/open-sans/600.css";
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import paypalLogo from "../assets/PayPal.png";
import iconsSprite from "../assets/icons.png";
import dummyImg from "../assets/dummyImg.png";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";

// Load your Stripe test key
const stripePromise = loadStripe("YOUR_KEY"); // replace with your real Stripe publishable key

function PaymentForm() {
  const { bookingData } = useContext(BookingContext);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirmAndPay = async () => {
    try {
      let finalBookingData = {
        ...bookingData,
        paymentDetails: {
          method: paymentMethod,
          status: "Completed",
        },
      };

      if (paymentMethod === "stripe") {
        const cardElement = elements.getElement(CardElement);

        const { paymentMethod: stripePaymentMethod, error } =
          await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
          });

        if (error) {
          console.error(error);
          alert("Stripe payment failed: " + error.message);
          return;
        }

        // attach stripe payment ID
        finalBookingData.paymentDetails.stripePaymentId =
          stripePaymentMethod.id;
      }

      if (paymentMethod === "credit") {
        finalBookingData.paymentDetails.card = {
          number: formData.cardNumber,
          expiry: formData.expiry,
          cvc: formData.cvc,
        };
      }

      // console.log("data", finalBookingData);

      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        finalBookingData
      );

      if (response.data) {
        navigate("/ordersuccess");
      }
    } catch (error) {
      console.error("Failed to confirm booking:", error);
      alert("There was an error confirming your booking. Please try again.");
    }
  };

  const ticketSummary = {
    date: "FRI, 23 DEC 2022",
    time: "15:00",
    tickets: [
      { label: "Adult (18+)", qty: 2, price: 32 },
      { label: "Child (6-17)", qty: 1, price: 22 },
      { label: "Infant (0-5)", qty: 1, price: 0 },
    ],
  };

  const totalPrice = ticketSummary.tickets.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  return (
    <Container
      maxWidth="lg"
      sx={{
        ml: { xs: 0, md: 20 },
        minHeight: "100vh",
        py: 6,
        pt: { xs: 10, md: 12 },
        px: { xs: 2, sm: 3, md: 0 },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        <Box
          display="flex"
          justifyContent="center"
          mb={4}
          ml={{ xs: 0, md: -6 }}
          px={{ xs: 2, md: 0 }}
        >
          <Stepper
            activeStep={2}
            alternativeLabel
            sx={{
              width: "80%",
              "& .MuiStepIcon-root": { color: "#ccc" },
              "& .MuiStepIcon-root.Mui-active": { color: "#FA8B02" },
              "& .MuiStepIcon-root.Mui-completed": { color: "#FA8B02" },
              "& .MuiStepLabel-label": {
                fontFamily: "Open Sans",
                fontWeight: 600,
                fontSize: "20px",
                color: "#999",
              },
              "& .MuiStepLabel-label.Mui-active": { color: "#FA8B02" },
              "& .MuiStepLabel-label.Mui-completed": { color: "#FA8B02" },
              "& .MuiStepConnector-line": { borderColor: "#ccc" },
              "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
                borderColor: "#FA8B02",
              },
              "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
                borderColor: "#FA8B02",
              },
            }}
          >
            {["Booking Details", "Your Details", "Payment"].map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 6 },
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Open Sans",
                fontWeight: 600,
                fontSize: "24px",
                color: "#333",
                mb: 3,
              }}
            >
              Select a payment method
            </Typography>

            <FormControl component="fieldset">
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                {/* PayPal */}
                <Card
                  variant="outlined"
                  sx={{
                    width: { xs: "100%", md: "540px" },
                    height: "74px",
                    borderRadius: "12px",
                    border: "1px solid #33333333",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    pl: "19px",
                    pr: 2,
                    mt: 2,
                  }}
                >
                  <FormControlLabel
                    value="paypal"
                    control={<Radio />}
                    label="PayPal (redirect)"
                    sx={{ width: "100%", m: 0 }}
                  />
                </Card>

                {/* Dummy Credit */}
                <Card
                  variant="outlined"
                  sx={{
                    width: "100%",
                    maxWidth: "540px",
                    borderRadius: "12px",
                    border: "1px solid #E1AF33",
                    backgroundColor: "#FFF3E0",
                    px: 3,
                    py: 3,
                    mt: 2,
                  }}
                >
                  <FormControlLabel
                    value="credit"
                    control={<Radio />}
                    label="Pay with Dummy Credit Card"
                  />
                  <Box display="flex" gap={2} mt={2}>
                    <TextField
                      label="Card number"
                      placeholder="1234 5678 9101 3456"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleChange("cardNumber", e.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={(e) => handleChange("expiry", e.target.value)}
                      fullWidth
                    />
                    <TextField
                      label="CVC"
                      placeholder="***"
                      value={formData.cvc}
                      onChange={(e) => handleChange("cvc", e.target.value)}
                      fullWidth
                    />
                  </Box>
                </Card>

                {/* Stripe */}
                <Card
                  variant="outlined"
                  sx={{
                    width: "100%",
                    maxWidth: "540px",
                    borderRadius: "12px",
                    border: "1px solid #E1AF33",
                    backgroundColor: "#F0F9FF",
                    px: 3,
                    py: 3,
                    mt: 2,
                  }}
                >
                  <FormControlLabel
                    value="stripe"
                    control={<Radio />}
                    label="Pay Securely with Stripe"
                  />
                  {paymentMethod === "stripe" && (
                    <Box mt={2}>
                      <CardElement
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#333",
                              "::placeholder": { color: "#999" },
                            },
                          },
                        }}
                      />
                    </Box>
                  )}
                </Card>
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Summary */}
          <Box sx={{ flex: 1, mb: 6, ml: { xs: 0, md: 7 }, mt: { xs: 4, md: 6 } }}>
            <Card sx={{ borderRadius: "20px", p: 3 }}>
              <CardContent>
                <Typography fontSize="18px" fontWeight={700} mb={2}>
                  Your Tickets Overview
                </Typography>
                <Box borderTop="1px solid #eee" pt={2} mb={2}>
                  {ticketSummary.tickets.map(({ label, qty, price }) => (
                    <Box key={label} display="flex" justifyContent="space-between" mb={1}>
                      <Typography>{label} x {qty}</Typography>
                      <Typography>€{(qty * price).toFixed(2)}</Typography>
                    </Box>
                  ))}
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Typography fontWeight={700}>Total Price</Typography>
                  <Typography fontWeight={700} color="#FA8B02">
                    €{totalPrice.toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, backgroundColor: "#FA8B02" }}
                  onClick={handleConfirmAndPay}
                >
                  Confirm and Pay
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

// Wrap with Stripe Elements
export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}















import React, { useState,useContext } from "react";
import { BookingContext } from "../components/BookingContext";
import Navbar from "./Header";

import "@fontsource/open-sans/600.css";
import dayjs from "dayjs";
import dummyImg from "../assets/dummyImg.png";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  InputAdornment,
} from "@mui/material";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const steps = ["Booking Details", "Your Details", "Payment"];

export default function Purchase() {
  const { updateBookingData } = useContext(BookingContext); // 3. Use context
  const [activeStep] = useState(0);
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  
  const navigate = useNavigate();
  const handleNextStep = () => {
     updateBookingData({
      bookingDate: date.toISOString(),
      bookingTime: time.format("HH:mm"),
      participants: { adults: adult, children: child, infants: infant },
      totalPrice: totalPrice,
    });
    navigate("/details");
  };

  const handleCount = (type, op) => {
    if (type === "adult") setAdult((prev) => Math.max(0, prev + op));
    if (type === "child") setChild((prev) => Math.max(0, prev + op));
    if (type === "infant") setInfant((prev) => Math.max(0, prev + op));
  };

  const totalPrice = (adult * 34 + child * 22);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 3 },
          minHeight: "100vh",
          mt: "80px",
          ml: "100px",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "1200px" }}>
          <Box
            display="flex"
            justifyContent="center"
            mb={4}
            sx={{ ml: { xs: 0, md: 10 } }}
          >
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                width: "100%",
                maxWidth: "800px",
                "& .MuiStepIcon-root": { color: "#ccc" },
                "& .MuiStepIcon-root.Mui-active": { color: "#FA8B02" },
                "& .MuiStepLabel-label": {
                  fontFamily: "Open Sans",
                  fontWeight: 600,
                  fontSize: { xs: "14px", sm: "16px", md: "20px" },
                },
                "& .MuiStepLabel-label.Mui-active": {
                  color: "#FA8B02",
                },
              }}
            >
              {steps.map((label) => (
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
              gap: 4,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box display="flex" flexDirection="column" gap={3}>
                <Box>
                  <Typography fontSize={18} fontWeight={600} mb={1}>
                    When you will visit?
                  </Typography>
                  <DatePicker
                    value={date}
                    onChange={(newDate) => setDate(newDate)}
                    format="ddd, DD MMM YYYY"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <ExpandMoreIcon />
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography fontSize={18} fontWeight={600} mb={1}>
                    Which time?
                  </Typography>
                  <TimePicker
                    value={time}
                    onChange={(newTime) => setTime(newTime)}
                    ampm={false}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <ExpandMoreIcon />
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography fontSize={18} fontWeight={600} mb={1}>
                    Select Your Tickets
                  </Typography>

                  <Box
                    sx={{
                      backgroundColor: "#F9F9F9",
                      borderRadius: "12px",
                      p: 2,
                      mb: 2,
                    }}
                  >
                    <Typography fontSize={14} color="#555">
                      • Free for kids under 6 and disabled visitors (74%+)
                    </Typography>
                    <Typography fontSize={14} color="#555" mt={0.5}>
                      • Pregnant women, families with strollers, and visitors on
                      crutches can buy priority tickets at the venue
                    </Typography>
                  </Box>

                  {[
                    {
                      type: "adult",
                      label: "Adult (18+)",
                      price: 34,
                      note: null,
                    },
                    {
                      type: "child",
                      label: "Child (6–17)",
                      price: 22,
                      note: [
                        "With valid ID",
                        "Only in combination with: Adult (18+)",
                      ],
                    },
                    {
                      type: "infant",
                      label: "Infant (0–5)",
                      price: 0,
                      note: ["Only in combination with: Adult (18+)"],
                    },
                  ].map(({ type, label, price, note }) => (
                    <Box
                      key={type}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={2}
                      mb={2}
                      border="1px solid #ddd"
                      borderRadius="12px"
                    >
                      <Box>
                        <Typography fontWeight={600} fontSize={14}>
                          {label}
                        </Typography>
                        {note &&
                          note.map((line, idx) => (
                            <Typography
                              key={idx}
                              fontSize={13}
                              color="text.secondary"
                              mt={0.5}
                            >
                              • {line}
                            </Typography>
                          ))}
                        <Typography
                          fontSize={14}
                          fontWeight={600}
                          color="#FA8B02"
                          mt={1}
                        >
                          {price > 0 ? `€${price.toFixed(2)}` : "FREE"}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          borderRadius: "6px",
                          overflow: "hidden",
                          border: "1px solid #ccc",
                          height: 50,
                          width: 150,
                        }}
                      >
                        <Button
                          onClick={() => handleCount(type, -1)}
                          sx={{
                            minWidth: 50,
                            height: 50,
                            borderRadius: 0,
                            color: "#333",
                            fontSize: "20px",
                            fontWeight: 600,
                          }}
                        >
                          –
                        </Button>

                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            backgroundColor: "#EFEFEF",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            fontFamily="Open Sans"
                            fontWeight={600}
                            fontSize="20px"
                            color="#333"
                          >
                            {type === "adult"
                              ? adult
                              : type === "child"
                              ? child
                              : infant}
                          </Typography>
                        </Box>

                        <Button
                          onClick={() => handleCount(type, +1)}
                          sx={{
                            minWidth: 50,
                            height: 50,
                            borderRadius: 0,
                            color: "#333",
                            fontSize: "20px",
                            fontWeight: 600,
                          }}
                        >
                          +
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box sx={{ flex: 1, mt: { xs: 4, md: 8 }, ml: { xs: 0, md: 4 } }}>
              <Card
                sx={{
                  border: "1px solid #eee",
                  borderRadius: "20px",
                  padding: "24px",
                  backgroundColor: "#fff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    fontSize="18px"
                    fontWeight={700}
                    color="#000"
                    mb={2}
                  >
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
                      <Typography fontWeight={700} fontSize="16px" mb={1}>
                        Wine tasting In Tuscany
                      </Typography>
                      <Box display="flex" gap={1} alignItems="center" mb={0.5}>
                        <CalendarTodayIcon
                          fontSize="small"
                          sx={{ color: "#FA8B02" }}
                        />
                        <Typography fontSize={13} color="#555">
                          {dayjs(date).format("ddd, DD MMM YYYY").toUpperCase()}
                        </Typography>
                      </Box>
                      <Box display="flex" gap={1} alignItems="center">
                        <AccessTimeIcon
                          fontSize="small"
                          sx={{ color: "#FA8B02" }}
                        />
                        <Typography fontSize={13} color="#555">
                          {dayjs(time).format("HH:mm")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box borderTop="1px solid #eee" pt={2} mb={2}>
                    {[
                      { label: "Adult (18+)", qty: adult, price: 34 },
                      { label: "Child (6–17)", qty: child, price: 22 },
                      { label: "Infant (0–5)", qty: infant, price: 0 },
                    ].map(({ label, qty, price }) => (
                      <Box
                        key={label}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1.5}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <Box
                            sx={{
                              width: 26,
                              height: 26,
                              borderRadius: "50%",
                              backgroundColor: "#F3F3F3",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                              fontSize: "13px",
                              color: "#555",
                            }}
                          >
                            {qty}
                          </Box>
                          <Typography fontSize={14} color="#333">
                            {label}
                            {price > 0 && (
                              <Typography
                                component="span"
                                fontSize={13}
                                color="#999"
                                ml={1}
                              >
                                (€{price.toFixed(2)})
                              </Typography>
                            )}
                          </Typography>
                        </Box>
                        <Typography fontWeight={700} fontSize={14} color="#333">
                          €{(qty * price).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={2}
                  >
                    <Typography fontWeight={700} fontSize={15}>
                      Total Price
                    </Typography>
                    <Typography fontWeight={700} fontSize={16} color="#FA8B02">
                      €{totalPrice.toFixed(2)}
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleNextStep}
                    sx={{
                      backgroundColor: "#FA8B02",
                      mt: 3,
                      borderRadius: "999px",
                      fontWeight: 700,
                      fontSize: "14px",
                      textTransform: "none",
                      py: 1.2,
                      "&:hover": {
                        backgroundColor: "#e67d00",
                      },
                    }}
                  >
                    Go to the Next Step
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}

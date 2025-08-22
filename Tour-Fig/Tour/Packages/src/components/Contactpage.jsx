// import React, { useState } from "react";
// import mapImage from "../assets/map.png";
// import {
//   Box,
//   TextField,
//   Typography,
//   Button,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { LocationOn, Phone, Email } from "@mui/icons-material";
// import { styled } from "@mui/system";
 
// // Gradient background for the top section
// const GradientWrapper = styled(Box)(({ theme }) => ({
//   background: "linear-gradient(to right, #e4ab7dff 0%, #ebbe99ff 0%)",
//   padding: theme.spacing(6, 2),
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   flexDirection: "column",
//   marginTop:"70px"
// }));
 
// // Container for contact section
// const ContactContainer = styled(Box)(({ theme }) => ({
//   maxWidth: 1100,
//   width: "100%",
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "space-between",
//   marginTop:"80px",
//   gap: theme.spacing(5),
//   [theme.breakpoints.down("md")]: {
//     flexDirection: "column",
//     alignItems: "center",
//     gap: theme.spacing(3),
//   },
// }));
 
// const InfoBox = styled(Box)(({ theme }) => ({
//   flex: 1,
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   gap: theme.spacing(3),
//   [theme.breakpoints.down("sm")]: {
//     alignItems: "center",
//     textAlign: "center",
//   },
// }));
 
// const FormBox = styled(Box)(({ theme }) => ({
//   flex: 1,
//   backgroundColor: "rgba(255, 255, 255, 0.5)",
//   borderRadius: 12,
//   padding: theme.spacing(4),
//   display: "flex",
//   flexDirection: "column",
//   gap: theme.spacing(2),
//   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//   [theme.breakpoints.down("sm")]: {
//     width: "100%",
//   },
// }));
 
// const StyledButton = styled(Button)(({ theme }) => ({
//   backgroundColor: "#ff6f00",
//   color: "#fff",
//   fontWeight: "bold",
//   textTransform: "none",
//   padding: "10px 30px",
//   borderRadius: "30px",
//   alignSelf: "center",
//   marginTop: theme.spacing(1.5),
//   "&:hover": {
//     backgroundColor: "#e69500",
//   },
// }));
 
// const InfoItem = ({ icon, text, isBoxed = false }) => (
//   <Box display="flex" alignItems="center" gap={1}>
//     {icon}
//     <Typography
//       variant="body1"
//       fontWeight={500}
//       sx={{
//         backgroundColor: isBoxed ? "rgba(255, 255, 255, 0.6)" : "transparent",
//         padding: isBoxed ? "6px 16px" : "0",
//         borderRadius: isBoxed ? "8px" : "0",
//         boxShadow: isBoxed ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
//         fontSize: isBoxed ? "15px" : "inherit",
//       }}
//     >
//       {text}
//     </Typography>
//   </Box>
// );
 
// const ContactPage = () => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
 
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
 
//   const handleChange = (field) => (e) =>
//     setFormData({ ...formData, [field]: e.target.value });
 
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//   };
 
//   return (
//     <>
//       {/* Contact Section */}
//       <GradientWrapper>
//         <ContactContainer>
//           {/* Info */}
//           <InfoBox>
//             <Typography variant={isSmallScreen ? "h6" : "h5"} fontWeight="bold">
//               Get In Touch!
//             </Typography>
//             <Typography variant="body1">
//               Fill up the form and our team will get back to you within 24 hours.
//             </Typography>
//             <InfoItem icon={<LocationOn color="warning" />} text="Piazza Napoleone, Lucca, Tuscany" />
//             <InfoItem icon={<Phone color="warning" />} text="+39 346 368 5708" isBoxed />
//             <InfoItem icon={<Email color="warning" />} text="italiainlimo@gmail.com" />
//           </InfoBox>
 
//           {/* Form */}
//           <FormBox component="form" onSubmit={handleSubmit}>
//             <TextField
//               label="Name and Surname"
//               placeholder="Enter your name and surname"
//               fullWidth
//               value={formData.name}
//               onChange={handleChange("name")}
//               required
//             />
//             <TextField
//               label="Email Address"
//               placeholder="Enter your email address"
//               fullWidth
//               value={formData.email}
//               onChange={handleChange("email")}
//               required
//             />
//             <TextField
//               label="Message"
//               placeholder="Enter your message"
//               fullWidth
//               multiline
//               rows={4}
//               value={formData.message}
//               onChange={handleChange("message")}
//               required
//             />
//             <StyledButton type="submit">Send Message</StyledButton>
//           </FormBox>
//         </ContactContainer>
//       </GradientWrapper>
 
//       {/* Map Section */}
//       <Box
//         component="img"
//         src={mapImage}
//         alt="Map"
//         sx={{
//           width: "100%",
//           height: "auto",
//           display: "block",
//           marginTop: "100px", // visually blends with top section
//         }}
//       />
//     </>
//   );
// };
 
// export default ContactPage;


import React, { useState } from "react";
import mapImage from "../assets/map.png";
import {
  Box,
  TextField,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LocationOn, Phone, Email } from "@mui/icons-material";
import { styled } from "@mui/system";

const GradientWrapper = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, #e4ab7dff 0%, #ebbe99ff 0%)",
  padding: theme.spacing(6, 2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "70px",
}));

const ContactContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1100,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(3),
  },
}));

const InfoBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  paddingTop: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    alignItems: "center",
    textAlign: "center",
  },
}));

const FormBox = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  borderRadius: 12,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2.5),
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ff6f00",
  color: "#fff",
  fontWeight: "bold",
  textTransform: "none",
  padding: "10px 30px",
  borderRadius: "30px",
  alignSelf: "center",
  marginTop: theme.spacing(1),
  "&:hover": {
    backgroundColor: "#e69500",
  },
}));

const InfoItem = ({ icon, text, isBoxed = false }) => (
  <Box display="flex" alignItems="center" gap={1}>
    {icon}
    <Typography
      variant="body1"
      fontWeight={500}
      sx={{
        backgroundColor: isBoxed ? "rgba(255, 255, 255, 0.6)" : "transparent",
        padding: isBoxed ? "6px 16px" : "0",
        borderRadius: isBoxed ? "8px" : "0",
        boxShadow: isBoxed ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
        fontSize: isBoxed ? "15px" : "inherit",
      }}
    >
      {text}
    </Typography>
  </Box>
);

const ContactPage = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <GradientWrapper>
        <ContactContainer>
          {/* Info Section */}
          <InfoBox>
            <Typography variant={isSmallScreen ? "h1" : "h3"} fontWeight="bold">
              Get In Touch!
            </Typography>
            <Typography variant="body1">
              Fill up the form and our Team will get <br></br>
              back to you within 24 hours.
            </Typography>
            <InfoItem
              icon={<LocationOn color="warning" />}
              text="Piazza Napoleone, Lucca, Tuscany"
            />
            <InfoItem
              icon={<Phone color="warning" />}
              text="+39 346 368 5708"
              isBoxed
            />
            <InfoItem
              icon={<Email color="warning" />}
              text="italiainlimo@gmail.com"
            />
          </InfoBox>

          {/* Form Section */}
          <FormBox component="form" onSubmit={handleSubmit}>
            Name and Surname
            <TextField
              placeholder="Enter your name and surname"
              label="Name and Surname"
              fullWidth
              value={formData.name}
              onChange={handleChange("name")}
              required
              sx={{
    backgroundColor: "#fff", // solid white background
    borderRadius: "8px"
  }}


            />Email Address
            <TextField
              // placeholder="Enter your email address"
              label="Enter your email address"
               placeholder="Enter your email address"
              fullWidth
              value={formData.email}
              onChange={handleChange("email")}
              required
              sx={{
    backgroundColor: "#fff",
    borderRadius: "8px"
  }}
            />
            Message
            <TextField
              placeholder="Enter your message"
              label="Enter your message"
              fullWidth
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange("message")}
              required
              sx={{
    backgroundColor: "#fff",
    borderRadius: "8px"
  }}
            />
            <StyledButton type="submit">Send Message</StyledButton>
          </FormBox>
        </ContactContainer>
      </GradientWrapper>

      {/* Map Section */}
      <Box
        component="img"
        src={mapImage}
        alt="Map"
        sx={{
          width: "100%",
          height: "100%",
          display: "block",
          marginTop: "100px",
        }}
      />
    </>
  );
};

export default ContactPage;

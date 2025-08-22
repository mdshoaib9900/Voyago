      // src/components/Footer.jsx
// import React from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png"; // Local logo

const sections = [
  {
    title: "Services",
    links: [
      "Bike and Rickshaw rental",
      "Guided Tours of Lucca",
      "Guided Bike Tour of Lucca",
      "Trip In The Tuscan Hills",
      "Transportation With Luxury Cars",
      "Wine Tours By Bus With Guide",
    ],
  },
  {
    title: "Home",
    links: [
      { label: "Home", href: "#home" },
      { label: "About Us", href: "#about" },
      { label: "Tour Packages", href: "#packages" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Terms of Use", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
    ],
  },
];

const socialLinks = [
  { icon: FaTwitter, href: "https://twitter.com" },
  { icon: FaFacebookF, href: "https://facebook.com" },
  { icon: FaInstagram, href: "https://instagram.com" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#2d2d2d",
        color: "#fff",
        py: 5,
        mt: 5,
        borderRadius: "12px 12px 0 0",
        animation: "fadeIn 0.8s ease-in-out",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Logo + Sections */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 4,
            mb: 4,
          }}
        >
          {/* Logo Section */}
          <Box>
            <Box
              component="img"
              src={logo}
              alt="Tuscany Logo"
              sx={{ width: 80, height: "auto", mb: 1 }}
              onError={(e) => {
                e.target.src = "https://placehold.co/80x80/cccccc/333333?text=LOGO";
              }}
            />
          </Box>

          {/* Dynamic Sections */}
          {sections.map((section, idx) => (
            <Box key={idx}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                {section.title}
              </Typography>
              {section.links.map((link, i) => (
                <Typography
                  key={i}
                  component={Link}
                  href={typeof link === "string" ? "#" : link.href}
                  underline="none"
                  sx={{
                    display: "block",
                    color: "#ccc",
                    fontSize: 14,
                    mb: 0.5,
                    "&:hover": { color: "orange" },
                  }}
                >
                  {typeof link === "string" ? link : link.label}
                </Typography>
              ))}
            </Box>
          ))}

          {/* Contact Section */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Contacts
            </Typography>
            <Typography fontSize={14} mb={1} display="flex" alignItems="center">
              <FaMapMarkerAlt style={{ color: "orange", marginRight: 8 }} />
              <Link
                href="https://maps.google.com"
                underline="none"
                sx={{ color: "#ccc", "&:hover": { color: "orange" } }}
              >
                Piazza Napoleone, Lucca, Tuscany
              </Link>
            </Typography>
            <Typography fontSize={14} mb={1} display="flex" alignItems="center">
              <FaPhoneAlt style={{ color: "orange", marginRight: 8 }} />
              <Link
                href="tel:+393463685708"
                underline="none"
                sx={{ color: "#ccc", "&:hover": { color: "orange" } }}
              >
                +39 346 368 5708
              </Link>
            </Typography>
            <Typography fontSize={14} display="flex" alignItems="center">
              <FaEnvelope style={{ color: "orange", marginRight: 8 }} />
              <Link
                href="mailto:italiainlimo@gmail.com"
                underline="none"
                sx={{ color: "#ccc", "&:hover": { color: "orange" } }}
              >
                italiainlimo@gmail.com
              </Link>
            </Typography>
          </Box>

          {/* Social Media */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Social Media
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map(({ icon: Icon, href }, idx) => (
                <IconButton
                  key={idx}
                  sx={{
                    bgcolor: "orange",
                    color: "#2d2d2d",
                    "&:hover": { bgcolor: "#f88a23" },
                  }}
                  size="large"
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Footer Bottom */}
        <Divider sx={{ borderColor: "#444", mb: 2 }} />
        <Typography align="center" fontSize={13} color="#ccc">
          © {new Date().getFullYear()} Tuscany Tours. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

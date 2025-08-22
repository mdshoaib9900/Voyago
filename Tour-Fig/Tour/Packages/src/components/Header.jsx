// src/components/Header.jsx (Updated with User Menu)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar, Toolbar, Typography, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemText, Divider,
  // ✅ NEW: Import Menu, MenuItem, and Avatar for the user dropdown
  Menu, MenuItem, Avatar 
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import logo from "../assets/logo.png";
import SignupModal from "./SignUpModel";
import LoginModal from "./LoginModel";

const Header = ({ user, setUser, onLogout, isSearchResultsPage }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  // ✅ NEW: State to manage the user menu's anchor element
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // ✅ NEW: Functions to handle opening and closing the user menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    onLogout();
  };
  
  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/profile'); // Example route for user profile
  }

  const handleOpenSignup = () => setIsSignupOpen(true);
  const handleCloseSignup = () => setIsSignupOpen(false);
  const handleOpenLogin = () => setIsLoginOpen(true);
  const handleCloseLogin = () => setIsLoginOpen(false);
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleNavigate = (label) => {
    setDrawerOpen(false);
    if (label === "Contact Us") navigate("/contact");
    else if (label === "Home") navigate("/?reset=true");
    else if (label === "Tour Packages") navigate("/tour-packages");
    else if (label === "About Us") navigate("/about");
  };

  const textColor = isSearchResultsPage ? theme.palette.text.primary : "black";
  const menuItems = ["Home", "About Us", "Tour Packages", "Contact Us"];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "transparent", boxShadow: "none", top: 0, width: "100%", zIndex: theme.zIndex.appBar + 1 }}>
        <Box sx={{ mx: "auto", width: "100%", backgroundColor: isSearchResultsPage ? theme.palette.background.paper : "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", transition: "all 0.3s ease-in-out" }}>
          <Toolbar sx={{ minHeight: 100, display: "flex", justifyContent: "space-between", alignItems: "center", px: { xs: 2, md: 4 } }}>
            {/* Logo */}
            <Box sx={{ flexShrink: 0 }}>
              <img src={logo} alt="Logo" style={{ height: 56, cursor: "pointer" }} onClick={() => navigate("/")} onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x56/e0e0e0/555555?text=Logo`; }} />
            </Box>

            {/* Menu Items (Desktop) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", gap: 4, flexGrow: 1 }}>
              {menuItems.map((item) => (
                <Typography key={item} variant="body1" onClick={() => handleNavigate(item)} sx={{ cursor: "pointer", fontWeight: 500, color: textColor, textShadow: isSearchResultsPage ? "none" : "1px 1px 3px rgba(0,0,0,0.5)", "&:hover": { color: theme.palette.primary.main } }}>
                  {item}
                </Typography>
              ))}
            </Box>

            {/* Right Side Buttons (Desktop) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2, flexShrink: 0 }}>
              <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer", color: textColor, "&:hover": { color: theme.palette.primary.main } }}>
                <Typography variant="body2">Eng</Typography>
                <ArrowDropDownIcon />
              </Box>

              {/* ✅ MODIFIED: Conditional Rendering for Auth Buttons */}
              {user ? (
                <>
                  {/* This Box is now the clickable menu trigger */}
                  <Box onClick={handleMenuOpen} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'orange' }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2" sx={{ color: textColor, fontWeight: 'bold' }}>
                      {/* Use optional chaining for safety */}
                      Welcome, {user?.name}
                    </Typography>
                    <ArrowDropDownIcon sx={{ color: textColor }} />
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="body2" onClick={handleOpenLogin} sx={{ cursor: "pointer", color: textColor, fontSize: "14px", "&:hover": { color: theme.palette.primary.main } }}>
                    Login
                  </Typography>
                  <Button variant="contained" onClick={handleOpenSignup} sx={{ backgroundColor: "orange", borderRadius: 20, textTransform: "none", fontWeight: "bold", px: 3, height: 40, color: "white", "&:hover": { backgroundColor: "#e69500" } }}>
                    Sign Up
                  </Button>
                </>
              )}
            </Box>

            {/* Hamburger Menu (Mobile/Tablet) */}
            <IconButton onClick={toggleDrawer(true)} sx={{ display: { xs: "flex", md: "none" }, color: textColor }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </AppBar>

      {/* ✅ NEW: User Profile Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>

      {/* Mobile Drawer (No changes needed here, it already works) */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <IconButton onClick={toggleDrawer(false)}><CloseIcon /></IconButton>
          </Box>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item} onClick={() => handleNavigate(item)}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 2 }}>
            {user ? (
              <>
                 <Typography variant="body1" sx={{ textAlign: 'center', mb: 2, fontWeight: 'bold' }}>
                    Welcome, {user.name}
                  </Typography>
                <Button fullWidth variant="contained" onClick={onLogout} sx={{ backgroundColor: "orange", "&:hover": { backgroundColor: "#e69500" } }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button fullWidth variant="outlined" onClick={handleOpenLogin} sx={{ mb: 2 }}>
                  Login
                </Button>
                <Button fullWidth variant="contained" onClick={handleOpenSignup} sx={{ backgroundColor: "orange", "&:hover": { backgroundColor: "#e69500" } }}>
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
      <SignupModal open={isSignupOpen} handleClose={handleCloseSignup} />
      <LoginModal open={isLoginOpen} handleClose={handleCloseLogin} setUser={setUser} />
    </>
  );
};

export default Header;
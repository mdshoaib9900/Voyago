import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import { tourData } from "../data/toursData.js";

const SearchTextField = styled(TextField)(() => ({
  width: 220,
  margin: 0,
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#fff",
    borderRadius: 0,
    height: 56,
    "& fieldset": { border: "none" },
  },
  "& .MuiInputBase-input": {
    padding: "12px 14px",
  },
}));

const StyledSearchBar = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "1383px",
  height: "160px",
  backgroundColor: "rgba(255, 255, 255, 0.12)",
  borderRadius: "12px",
  padding: "24px 10px 0 10px",
  paddingTop: "16px 10px 0 10px",
  backdropFilter: "blur",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  gap: 0,
  margin: "0 auto",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    padding: " 0 15px",

    height: "140px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "180px",
  },
}));

const SearchButton = styled(Button)(() => ({
  backgroundColor: "orange",
  borderRadius: 0,
  height: "56px",
  width: "56px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": { backgroundColor: "#e69500" },
}));

const ToggleButtonGroupStyled = styled(ToggleButtonGroup)(() => ({
  margin: 0,
  padding: 0,
}));

const InputFieldsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 0,
  marginTop: 0, // ✅ Added space between toggle and inputs
  paddingTop: 0,
  height: "56px",
  alignItems: "flex-start",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    height: "112px",
  },
}));

export const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    tourType: "public",
    numberOfPeople: "",
    date: "",
    time: "",
    tourName: "",
    transportation: "",
    tourCategory: "",
  });

  const [timeOptions, setTimeOptions] = useState([]);
  const [tourNameOptions, setTourNameOptions] = useState([]);
  const [transportationOptions, setTransportationOptions] = useState([]);
  const [numberOfPeopleOptions, setNumberOfPeopleOptions] = useState([]);
  const [tourCategoryOptions, setTourCategoryOptions] = useState([]);

  useEffect(() => {
    const uniqueTimes = [...new Set(tourData.map((tour) => tour.time))].sort();
    setTimeOptions(uniqueTimes);

    const uniqueTourNames = [
      ...new Set(tourData.map((tour) => tour.title)),
    ].sort();
    setTourNameOptions(uniqueTourNames);

    const uniqueTransportation = [
      ...new Set(tourData.map((tour) => tour.transportation)),
    ].sort();
    setTransportationOptions(uniqueTransportation);

    setNumberOfPeopleOptions([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40",
      "50",
    ]);

    const uniqueCategories = [
      ...new Set(tourData.map((tour) => tour.category).filter(Boolean)),
    ].sort();
    setTourCategoryOptions(
      uniqueCategories.length > 0
        ? uniqueCategories
        : ["Adventure", "Cultural", "Historical", "Food", "Nature"]
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleTourTypeChange = (event, newType) => {
    if (newType) {
      setFilters((prev) => ({
        ...prev,
        tourType: newType,
        numberOfPeople: "",
        transportation: "",
        tourCategory: "",
      }));
    }
  };

  const handleSearchClick = async () => {
    try {
      const activeFilters = {};
      Object.keys(filters).forEach((key) => {
        if (filters[key]) activeFilters[key] = filters[key];
      });

      const query = new URLSearchParams(activeFilters).toString();
      const response = await fetch(`http://localhost:5000/api/tours?${query}`);
      if (!response.ok) throw new Error("Failed to fetch tours");
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
      onSearch([]);
    }
  };

  const commonFields = [
    {
      name: "date",
      placeholder: "Choose Date",
      icon: <CalendarTodayIcon />,
      type: "date",
    },
    {
      name: "time",
      placeholder: "Choose Time",
      icon: <AccessTimeIcon />,
      type: "text",
      list: "time-suggestions",
    },
    {
      name: "tourName",
      placeholder: "Select Tour",
      icon: <NaturePeopleIcon />,
      type: "text",
      list: "tour-name-suggestions",
    },
  ];

  const publicTourFields = [
    ...commonFields,
    {
      name: "numberOfPeople",
      placeholder: "Number of people",
      icon: <PeopleIcon />,
      type: "number",
      list: "people-suggestions",
    },
    {
      name: "transportation",
      placeholder: "Transportation",
      icon: <DriveEtaIcon />,
      type: "text",
      list: "transportation-suggestions",
    },
  ];

  const privateTourFields = [
    ...commonFields,
    {
      name: "tourCategory",
      placeholder: "Select types",
      icon: <NaturePeopleIcon />,
      type: "text",
      list: "category-suggestions",
    },
    {
      name: "placeholder",
      placeholder: "",
      icon: null,
      type: "hidden",
      invisible: true,
    },
  ];

  const datalistOptions = {
    "people-suggestions": numberOfPeopleOptions,
    "time-suggestions": timeOptions,
    "tour-name-suggestions": tourNameOptions,
    "transportation-suggestions": transportationOptions,
    "category-suggestions": tourCategoryOptions,
  };

  const currentFields =
    filters.tourType === "public" ? publicTourFields : privateTourFields;

  return (
    <Box
      sx={{
        width: "fit-content",
        display: "flex",
        justifyContent: "center",
        mx: "auto",
        zIndex: 2,
        position: "relative",
      }}
    >
      <StyledSearchBar>
        {/* Toggle Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 0,
            mb: 0,
            pb: 0,
            height: "48px",
            alignItems: "center",
            marginBottom: "-1px",
          }}
        >
          <ToggleButtonGroupStyled
            value={filters.tourType}
            exclusive
            onChange={handleTourTypeChange}
            aria-label="tour type"
          >
            <ToggleButton
              value="public"
              sx={{
                backgroundColor: "#fff",
                color: "#444",
                fontWeight: 500,
                border: "none",
                textTransform: "none",
                px: 3,
                height: "40px",
                //borderRadius: "8px 0 0 0", // ✅ Removed bottom-left radius
                borderRadius: "8px 0 0 0",
                borderBlock: " solid #ddd",
                "&.Mui-selected": {
                  backgroundColor: "#fff",
                  color: "orange",
                },
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <PeopleIcon sx={{ marginRight: 1 }} />
              Public Tours
            </ToggleButton>
            <ToggleButton
              value="private"
              sx={{
                backgroundColor: "#fff",
                color: "#444",
                fontWeight: 500,
                border: "none",
                textTransform: "none",
                px: 3,
                height: "40px",

                //borderRadius: "0 8px 0 0", // ✅ Removed bottom-right radius
                borderRadius: "0 8px 0 0",
                borderBlock: "0 solid #ddd",

                "&.Mui-selected": {
                  backgroundColor: "#fff",
                  color: "orange",
                },
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <NaturePeopleIcon sx={{ marginRight: 0 }} />
              Private Tours
            </ToggleButton>
          </ToggleButtonGroupStyled>
        </Box>

        {/* Input Fields */}
        <InputFieldsContainer
          sx={{
            marginTop: "-3px", // ✅ physically overlaps by 1px
            paddingTop: 0,
            gap: 0,
            borderBottomLeftRadius: "12px", // ✅ left curve
            borderBottomRightRadius: "12px",
            borderTopRightRadius: "12px",
            "& .MuiFormControl-root": {
              margin: 0, // ✅ removes default TextField margins
            },
          }}
        >
          {currentFields.map((field) => (
            <React.Fragment key={field.name}>
              {field.invisible ? (
                <Box sx={{ flex: 1, height: 56 }} />
              ) : (
                <SearchTextField
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={filters[field.name]}
                  onChange={handleChange}
                  sx={{ flex: 1, minWidth: 220 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {field.icon}
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {field.type === "date" ? null : <ArrowDropDownIcon />}
                      </InputAdornment>
                    ),
                    inputProps: field.list ? { list: field.list } : {},
                  }}
                  InputLabelProps={
                    field.type === "date" ? { shrink: true } : {}
                  }
                />
              )}
              {field.list && !field.invisible && (
                <datalist id={field.list}>
                  {datalistOptions[field.list].map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              )}
            </React.Fragment>
          ))}
          <SearchButton onClick={handleSearchClick}>
            <SearchIcon sx={{ fontSize: 28, color: "#fff" }} />
          </SearchButton>
        </InputFieldsContainer>
      </StyledSearchBar>
    </Box>
  );
};

// src/components/servicesData.js

// ✅ 1. Import each image file at the top
import bikeImage from "../assets/Bike&riksha.png";
import guidedTourImage from "../assets/Rectangle 19.png";
import tuscanHillsImage from "../assets/Rectangle 3.png";

// ✅ 2. Use the imported variables in your array
export const services = [
  {
    title: "Bike and rickshaw rental",
    description: "Book your quality vehicle quickly for an hour or all day!",
    image: bikeImage,
  },
  {
    title: "Guided tours of Lucca",
    description: "Live the real Lucchese experience by visiting the suburbs by bike!",
    image: guidedTourImage,
  },
  {
    title: "Trips In The Tuscan Hills",
    description: "Do you need not only a bike but also a driver? Then you have found the right place!",
    image: tuscanHillsImage,
  },
];
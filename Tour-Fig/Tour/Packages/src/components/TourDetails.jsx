// src/components/TourDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WineTastingDetails from "./WineTastingDetails";

const TourDetails = () => {
  const { id } = useParams(); // ✅ Get tour id from URL
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tours/${id}`);
        setTour(res.data);
      } catch (err) {
        console.error("Error fetching tour:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) {
    return <p>Loading tour details...</p>;
  }

  if (!tour) {
    return <p>❌ Tour not found</p>;
  }

  return (
    <div>
      <WineTastingDetails tourData={tour} />
    </div>
  );
};

export default TourDetails;

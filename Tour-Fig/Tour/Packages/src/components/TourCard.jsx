// src/components/TourCard.jsx
import React from "react";

const TourCard = ({ tour }) => {
  return (
    <div className="card h-100 shadow-sm">
      {/* ✅ Image */}
      <img
        src={tour.image_url}
        alt={tour.title}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{tour.title}</h5>
        <p className="card-text text-muted">{tour.description}</p>

        <ul className="list-unstyled small mb-3">
          <li><strong>Date:</strong> {tour.date}</li>
          <li><strong>Group Size:</strong> {tour.number_of_group} people</li>
        </ul>

        <div className="mt-auto">
          <p className="fw-bold text-primary fs-5">€{tour.price_per_person}</p>
          <button className="btn btn-outline-primary w-100">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;

// src/services/api.js
const API_URL = "http://localhost:5000/api"; // backend base URL

// Fetch all tours (with optional filters)
export async function fetchTours(filters = {}) {
  const query = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_URL}/tours?${query}`);
  if (!res.ok) throw new Error("Failed to fetch tours");
  return res.json();
}

// Fetch a single tour by ID
export async function fetchTourById(id) {
  const res = await fetch(`${API_URL}/tours/${id}`);
  if (!res.ok) throw new Error("Failed to fetch tour");
  return res.json();
}

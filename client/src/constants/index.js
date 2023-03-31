export const API_URL =
  process.env.NODE_ENV !== "production" ? "http://localhost:3007/api" : "";

export const ACCESS_TOKEN = "ACCESS_TOKEN";

export const brands = [
  {
    value: "Nike",
    label: "Nike",
  },
  {
    value: "MLB",
    label: "MLB",
  },
  {
    value: "Vans",
    label: "Vans",
  },
  {
    value: "Unknown",
    label: "Unknown",
  },
];

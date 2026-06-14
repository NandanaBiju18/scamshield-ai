import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000"
});

export const analyzeMessage = (text) =>
  API.post("/analyze", { text });
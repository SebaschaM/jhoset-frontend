import axios from "axios";

export const attendanceApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

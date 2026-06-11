import axios from "axios";
import { LoginRequest } from "@paymark/types";

export async function login(data: LoginRequest) {
  try {
    await axios.post(
      "/auth/login",
      data,
    );
  } catch (error) {
    console.error("Server Error:", error);
  }
}
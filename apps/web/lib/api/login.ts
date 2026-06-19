import axios from "axios";
import { LoginRequest } from "@paymark/types";

export async function login(data: LoginRequest) {
  const response = await axios.post(
    "/auth/login",
    data,
  );
  return response.data;
}
import { QueryClient } from "@tanstack/react-query";
import { READINGS_API_URL } from "./constants";

export const queryClient = new QueryClient();

export const fetchIOAReadings = async (n: number = 5) =>
  fetch(`${READINGS_API_URL}?number_entries=${n}`).then((response) =>
    response.json()
  );

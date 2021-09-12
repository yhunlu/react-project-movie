import http from "./httpService";
import { apiEndpoint } from "../config/config.json";

export function getGenres() {
  return http.get(apiEndpoint.genres);
}

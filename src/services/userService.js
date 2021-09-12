import http from "./httpService";
import { apiEndpoint as apiurl } from "../config/config.json";

const apiEndpoint = apiurl.users;

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

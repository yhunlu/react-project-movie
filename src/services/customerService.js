import http from "./httpService";
import { apiEndpoint as apiurl } from "../config/config.json";

const apiEndpoint = apiurl.customers;

function customerUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getCustomers() {
  return http.get(apiEndpoint);
}

export function getCustomer(customerId) {
  return http.get(customerUrl(customerId));
}

export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(customerUrl(customer._id), body);
  }

  return http.post(apiEndpoint, customer);
}

export function deleteCustomer(customerId) {
  return http.delete(customerUrl(customerId));
}

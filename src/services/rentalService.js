import http from "./httpService";
import { apiEndpoint as apiurl } from "../config/config.json";

const apiEndpoint = apiurl.rentals;
const apiEndpointReturn = apiurl.returns;

function rentalUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getRentals() {
    return http.get(apiEndpoint);
}

export function getRental(rentalId) {
    return http.get(rentalUrl(rentalId));
}

export function saveRental(rental) {
    if (rental._id) {
        const body = { ...rental };
        delete body._id;
        return http.put(rentalUrl(rental._id), body);
    }

    return http.post(apiEndpoint, rental);
}

export function saveReturn(rental) {
    if (rental._id) {
        const body = { ...rental };
        delete body._id;
        return http.put(rentalUrl(rental._id), body);
    }

    return http.post(apiEndpointReturn, rental.customer._id, rental.movie._id);
}

export function deleteRental(rentalId) {
    return http.delete(rentalUrl(rentalId));
}

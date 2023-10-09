import { API } from ".";
import { SEARCH_STOCK_ROUTE_URL } from "../constant/apiUrl";

export const searchStock = (companyName) => {
  return API.get(`${SEARCH_STOCK_ROUTE_URL}/${companyName}`);
};

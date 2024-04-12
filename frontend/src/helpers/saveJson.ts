import axios from "axios";

interface Json {
  name: string;
  // Add more properties as needed
}

/**
 * Save JSON object to the backend
 * first parameter is the endpoint
 * second parameter is the JSON object
 * third parameter is the token */

export const saveJson = async (endpoint: string, json: Json, token: string) => {
  axios.post(`http://localhost:8000${endpoint}`, {
    token: token,
    data: json,
  });
};

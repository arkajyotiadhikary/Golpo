import axios from 'axios';
import rateLimit from "axios-rate-limit";

export const http = rateLimit(axios.create(), {
  maxRequests: 2, perMilliseconds: 1000, maxRPS: 2
});

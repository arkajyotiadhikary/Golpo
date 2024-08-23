import Redis from "ioredis";
import dotenv from 'dotenv';

dotenv.config();

// Get Redis connection details from environment variables
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
});

export default redis;

import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  PORT: z.coerce.number().int().positive().default(3000),

  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),

  JWT_SECRET: z.string().min(32),

  // Allowed client origin(s), comma separated
  CLIENT_URL: z.string().default("http://localhost:3000"),
});

const env = envSchema.parse(process.env);

export default env;
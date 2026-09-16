process.env.NODE_ENV = "test";
process.env.DATABASE_URL =
  process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/test";
process.env.DIRECT_URL =
  process.env.DIRECT_URL || "postgresql://user:password@localhost:5432/test";
process.env.JWT_SECRET =
  process.env.JWT_SECRET || "test-secret-with-at-least-32-characters";
process.env.CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

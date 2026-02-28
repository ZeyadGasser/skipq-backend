import cors from "cors";

const allowedOrigins = [process.env.CORS_ORIGINS];

export const corsMiddleware = cors({
  origin: allowedOrigins,
});

/*
   export const corsMiddleware = cors({
  origin: '*'
})*/

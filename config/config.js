export const backUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.mymemories.kr"
    : "http://localhost:3065";
export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://mymemories.kr"
    : "http://localhost:3060";

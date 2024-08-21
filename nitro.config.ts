//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  routeRules: {
    // "/": { redirect: "/api" },
    "/api/v3": { cors: true },
  },
  runtimeConfig: {
    credential: (() => {
      try {
        return JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || "{}");
      } catch (e) {
        console.error("Failed to parse GOOGLE_APPLICATION_CREDENTIALS:", e);
        return {};
      }
    })(),
    apiKey: process.env.apiKey,
  },
});

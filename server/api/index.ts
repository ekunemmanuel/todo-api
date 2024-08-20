export default defineEventHandler(() => {
  return {
    message: "Welcome to the API",
    available_endpoints: [
      {
        version: "v1",
        links: {
          root: "/api/v1",
          tasks: "/api/v1/tasks",
        },
      },
      // TODO add more versions here
    ],
  };
});

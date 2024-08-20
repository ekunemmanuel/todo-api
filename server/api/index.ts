export default defineEventHandler(() => {
  return {
    message: "Welcome to the API",
    available_endpoints: [
      {
        version: "v1",
        description:
          "The v1 API version offers basic CRUD operations for managing tasks in memory.",
        links: {
          root: "/api/v1",
          tasks: {
            link: "/api/v1/tasks",
            children: [
              {
                verb: "get",
                link: "/api/v1/tasks",
                description: "Retrieve a list of tasks",
              },
              {
                verb: "post",
                link: "/api/v1/tasks",
                description: "Create a new task",
              },
              {
                verb: "put",
                link: "/api/v1/tasks/[id]",
                description: "Update an existing task by ID",
              },
              {
                verb: "delete",
                link: "/api/v1/tasks/[id]",
                description: "Delete a task by ID",
              },
            ],
          },
        },
      },
      {
        version: "v2",
        description:
          "The v2 API version introduces Firestore integration for persistent storage of tasks.",
        links: {
          root: "/api/v2",
          tasks: {
            link: "/api/v2/tasks",
            children: [
              {
                verb: "get",
                link: "/api/v2/tasks",
                description: "Retrieve a list of tasks",
              },
              {
                verb: "post",
                link: "/api/v2/tasks",
                description: "Create a new task",
              },
              {
                verb: "put",
                link: "/api/v2/tasks/[id]",
                description: "Update an existing task by ID",
              },
              {
                verb: "delete",
                link: "/api/v2/tasks/[id]",
                description: "Delete a task by ID",
              },
              {
                verb: "post",
                link: "/api/v2/tasks/[id]",
                description: "Create a task with a specific ID",
              },
            ],
          },
        },
      },
    ],
  };
});

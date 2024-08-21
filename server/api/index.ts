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
      {
        version: "v3",
        description:
          "The v3 API version extends the capabilities of v2 with authentication and query support. It includes login and registration endpoints, and supports query parameters for filtering and ordering tasks. A global rate limiter has been added for enhanced security.",
        links: {
          root: "/api/v3",
          auth: {
            link: "/api/v3/auth",
            children: [
              {
                verb: "post",
                link: "/api/v3/auth/login",
                description: "User login",
              },
              {
                verb: "post",
                link: "/api/v3/auth/register",
                description: "User registration",
              },
            ],
          },
          tasks: {
            link: "/api/v3/tasks",
            children: [
              {
                verb: "get",
                link: "/api/v3/tasks",
                description: "Retrieve a list of tasks with filtering and ordering options it returns id desending order by default based on createdAt",
                query_params: {
                  completed: {
                    type: "boolean",
                    description: "Filter tasks by completion status",
                  },
                },
              },
              {
                verb: "post",
                link: "/api/v3/tasks",
                description: "Create a new task",
              },
              {
                verb: "put",
                link: "/api/v3/tasks/[id]",
                description: "Update an existing task by ID",
              },
              {
                verb: "delete",
                link: "/api/v3/tasks/[id]",
                description: "Delete a task by ID",
              },
              {
                verb: "post",
                link: "/api/v3/tasks/[id]",
                description: "Create a task with a specific ID",
              },
            ],
          },
        },
      },
    ],
  };
});

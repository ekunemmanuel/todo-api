Here's the updated README with the new version `v3` details added:

---

# Todo API Documentation

Welcome to the Todo API! This document provides an overview of the available endpoints and usage for all versions of the API.

## Table of Contents

- [Introduction](#introduction)
- [API Endpoints](#api-endpoints)
  - [Root Endpoint](#root-endpoint)
  - [Tasks Endpoint](#tasks-endpoint)
- [Getting Started](#getting-started)
- [Error Handling](#error-handling)
- [Development](#development)
- [Contributing](#contributing)

## Introduction

The Todo API is a REST API built with Nitro. It provides endpoints for interacting with tasks, with support for both in-memory storage (v1), Firebase (v2), and advanced features such as authentication and query support (v3). This README outlines the available routes and how to get started with the API.

## API Endpoints

### Root Endpoint

**`GET /`**

Returns a welcome message and a list of available API endpoints.

**Response:**

```json
{
  "message": "Welcome to the API",
  "available_endpoints": [
    {
      "version": "v1",
      "links": {
        "root": "/api/v1",
        "tasks": "/api/v1/tasks"
      }
    },
    {
      "version": "v2",
      "links": {
        "root": "/api/v2",
        "tasks": "/api/v2/tasks"
      }
    },
    {
      "version": "v3",
      "links": {
        "root": "/api/v3",
        "auth": "/api/v3/auth",
        "tasks": "/api/v3/tasks"
      }
    }
  ]
}
```

### Tasks Endpoint (v1)

**`GET /api/v1/tasks`**

Returns a list of all tasks.

**Response:**

```json
{
  "data": [
    {
      "id": "task-id-1",
      "title": "Sample Task",
      "completed": false
    }
  ]
}
```

**`POST /api/v1/tasks`**

Creates a new task. Requires a request body with `title` and `completed` fields.

**Request Body:**

```json
{
  "title": "New Task",
  "completed": false
}
```

**Response:**

```json
{
  "message": "A new task has been added",
  "data": {
    "id": "new-task-id",
    "title": "New Task",
    "completed": false
  }
}
```

**`GET /api/v1/tasks/{id}`**

Retrieves a task by its `id`.

**Response:**

```json
{
  "data": {
    "id": "task-id",
    "title": "Task Title",
    "completed": false
  }
}
```

**`PUT /api/v1/tasks/{id}`**

Updates an existing task. Requires a request body with `title` and/or `completed` fields.

**Request Body:**

```json
{
  "title": "Updated Task Title",
  "completed": true
}
```

**Response:**

```json
{
  "message": "Task with id {id} has been updated",
  "data": {
    "id": "task-id",
    "title": "Updated Task Title",
    "completed": true
  }
}
```

**`DELETE /api/v1/tasks/{id}`**

Deletes a task by its `id`.

**Response:**

```json
{
  "message": "Task with id {id} has been deleted"
}
```

### Tasks Endpoint (v2)

**`GET /api/v2/tasks`**

Returns a list of all tasks from Firebase.

**Response:**

```json
{
  "data": [
    {
      "id": "task-id-1",
      "title": "Sample Task",
      "completed": false
    }
  ]
}
```

**`POST /api/v2/tasks`**

Creates a new task in Firebase. Requires a request body with `title` and `completed` fields.

**Request Body:**

```json
{
  "title": "New Task",
  "completed": false
}
```

**Response:**

```json
{
  "message": "A new task has been added",
  "data": {
    "id": "new-task-id",
    "title": "New Task",
    "completed": false
  }
}
```

**`GET /api/v2/tasks/{id}`**

Retrieves a task by its `id` from Firebase.

**Response:**

```json
{
  "data": {
    "id": "task-id",
    "title": "Task Title",
    "completed": false
  }
}
```

**`PUT /api/v2/tasks/{id}`**

Updates an existing task by ID in Firebase. Requires a request body with `title` and/or `completed` fields.

**Request Body:**

```json
{
  "title": "Updated Task Title",
  "completed": true
}
```

**Response:**

```json
{
  "message": "Task with id {id} has been updated",
  "data": {
    "id": "task-id",
    "title": "Updated Task Title",
    "completed": true
  }
}
```

**`DELETE /api/v2/tasks/{id}`**

Deletes a task by its `id` from Firebase.

**Response:**

```json
{
  "message": "Task with id {id} has been deleted"
}
```

**`POST /api/v2/tasks/[id]`**

Creates a task with a specific ID in Firebase.

**Request Body:**

```json
{
  "title": "Task Title",
  "completed": false
}
```

**Response:**

```json
{
  "message": "A new task with the specific ID has been added",
  "data": {
    "id": "specific-task-id",
    "title": "Task Title",
    "completed": false
  }
}
```

### Tasks Endpoint (v3)

**`GET /api/v3/tasks`**

Returns a list of tasks from Firebase with support for query parameters like filtering and ordering.

**Query Parameters:**
- `filter`: Additional filters can be applied using query parameters i.e completed=true.

**Response:**

```json
{
  "data": [
    {
      "id": "task-id-1",
      "title": "Sample Task",
      "completed": false
    }
  ]
}
```

**`POST /api/v3/tasks`**

Creates a new task in Firebase with authentication required. Requires a request body with `title` and `completed` fields.

**Request Body:**

```json
{
  "title": "New Task",
  "completed": false
}
```

**Response:**

```json
{
  "message": "A new task has been added",
  "data": {
    "id": "new-task-id",
    "title": "New Task",
    "completed": false
  }
}
```

**`GET /api/v3/tasks/{id}`**

Retrieves a task by its `id` from Firebase.

**Response:**

```json
{
  "data": {
    "id": "task-id",
    "title": "Task Title",
    "completed": false
  }
}
```

**`PUT /api/v3/tasks/{id}`**

Updates an existing task by ID in Firebase with authentication required. Requires a request body with `title` and/or `completed` fields.

**Request Body:**

```json
{
  "title": "Updated Task Title",
  "completed": true
}
```

**Response:**

```json
{
  "message": "Task with id {id} has been updated",
  "data": {
    "id": "task-id",
    "title": "Updated Task Title",
    "completed": true
  }
}
```

**`DELETE /api/v3/tasks/{id}`**

Deletes a task by its `id` from Firebase with authentication required.

**Response:**

```json
{
  "message": "Task with id {id} has been deleted"
}
```

### Auth Endpoint (v3)

**`POST /api/v3/auth/register`**

Registers a new user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "data": {
    "id": "user-id",
    "email": "user@example.com"
  }
}
```

**`POST /api/v3/auth/login`**

Logs in an existing user.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "message": "User logged in successfully",
  "data": {
    "token": "jwt-token"
  }
}
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ekunemmanuel/todo-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd todo-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. The API will be available at `http://localhost
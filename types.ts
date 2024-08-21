export interface Task {
  id?: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  email: string;
  displayName: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register extends Login {
  firstName: string;
  lastName: string;
}

declare module "#auth-utils" {
  interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
  }

  interface UserSession {
    user: User;
  }
}

export {};

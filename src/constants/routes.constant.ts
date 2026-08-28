const ROUTES = {
  AUTH_REGISTER: "/register",
  AUTH_LOGIN: "/login",

  USERS: "/",
  USER_BY_ID: "/users/:id",
  USER_AGENTS: "/users/agents",
} as const;

export default ROUTES;

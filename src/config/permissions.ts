export const ALL_PERMISSIONS = [
  // users
  "users:roles:write", // Allowed to add a role to an user
  "users:roles:delete", // Allowed to remove a role to an user

  // roles
  "roles:write",

  // posts
  "posts:write",
  "posts:read",
  "posts:delete",
  "posts:edit",
] as const;

export const PERMISSIONS = ALL_PERMISSIONS.reduce(
  (acc, permissions) => {
    acc[permissions] = permissions;

    // const obj = {"users:roles:write": "user:roles:write"}
    return acc;
  },
  {} as Record<
    (typeof ALL_PERMISSIONS)[number],
    (typeof ALL_PERMISSIONS)[number]
  >,
);

export const USER_ROLE_PERMISSIONS = [
  PERMISSIONS["posts:read"],
  PERMISSIONS["posts:write"],
];

export const SYSTEM_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  APPLICATION_USER: "APPLICATION_USER",
};

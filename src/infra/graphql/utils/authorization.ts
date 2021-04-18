import { UserRole } from "@entities/UserRole";
import { AuthenticationError } from "apollo-server-errors";

export const authorization = (context: any, roles: UserRole[] = []) => {
  const user = context?.user;

  if (
    !user ||
    !user?.id ||
    !user?.roles ||
    (roles.length && !user.roles.some((role: UserRole) => roles.includes(role)))
  ) {
    throw new AuthenticationError("Permission denied.");
  }
};

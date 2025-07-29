"use server";
import { User } from "@/payload-types";
import { caller } from "@/trpc/server";
export const currentUser = async () => {
  const session = await caller.auth.session();
  const user = session.user as User;
  return user;
};

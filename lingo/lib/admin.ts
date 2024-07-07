import { auth } from "@clerk/nextjs/server";

// "user_2iCVK4jHSONIE3GH6UpLyvelFJh"

export const getIsAdmin = () => {
  const { userId } = auth();
  const adminIds = "user_2iCVK4jHSONIE3GH6UpLyvelFJh".split(", "); // stored in .env.local file as string separated by comma(,) and space( )

  if (!userId) return false;

  return adminIds.indexOf(userId) !== -1;
};
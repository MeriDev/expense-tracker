import { currentUser } from '@clerk/nextjs/server';
import { db } from './db';

export const checkUser = async () => {
  const user = await currentUser();

  //check for logged cler user
  if (!user) return null;

  //check if user in DB
  const loggedInUser = await db.user.findUnique({
    where: {
      clerkUserId: user.id,
    },
  });

  //id user in Db return user
  if (loggedInUser) {
    return loggedInUser;
  }

  //if not in Db, create new user
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};

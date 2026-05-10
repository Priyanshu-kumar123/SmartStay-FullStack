import User from "../models/User.js";
import { clerkClient } from "@clerk/express";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
  const { userId } = req.auth;
  if (!userId) {
    res.json({ success: false, message: "not authenticated" });
  } else {
    let user = await User.findById(userId);

    // Agar user nahi mila toh Clerk se data lekar create karo
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);
      user = await User.create({
        _id: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        username: clerkUser.firstName + " " + clerkUser.lastName,
        image: clerkUser.imageUrl,
      });
    }

    req.user = user;
    next();
  }
};
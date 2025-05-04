import { Webhook } from "svix";
import User from "../models/User.js";

// API controller function to manage Clerk Users in the database
export const clerkwebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = await whook.verify(
      JSON.stringify(req.body),
      {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
      }
    );

    const { data, type } = payload;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.json({ success: true, message: "User created" });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({ success: true, message: "User updated" });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({ success: true, message: "User deleted" });
        break;
      }

      default:
        res.status(200).send(); // Do nothing for unknown events
        break;
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(400).json({
      success: false,
      message: "Webhook error",
      error: error.message,
    });
  }
};

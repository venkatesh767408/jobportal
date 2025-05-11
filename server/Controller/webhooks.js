import { Webhook } from "svix";
import User from "../models/User.js";

// API controller function to manage Clerk Users in the database
export const clerkwebhooks = async (req, res) => {
<<<<<<< HEAD
    try {
        // Create a new webhook verification instance using your secret key
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify the incoming request using the svix headers for signature verification
        const payload = await whook.verify(
            JSON.stringify(req.body),
            {
                'svix-id': req.headers["svix-id"],
                "svix-timestamp": req.headers['svix-timestamp'],
                "svix-signature": req.headers["svix-signature"]
            }
        );

        // Extract the payload data from the verified webhook
        const { data, type } = payload;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                    resume: ''
                };
                // Save the user data in the MongoDB database
                await User.create(userData);
                return res.json({ success: true, message: "User created successfully" });
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                };
                // Update the user data in the MongoDB database by matching the Clerk user ID
                await User.findByIdAndUpdate(data.id, userData);
                return res.json({ success: true, message: "User updated successfully" });
            }

            case 'user.deleted': {
                // Delete the user from MongoDB by matching the Clerk user ID
                await User.findByIdAndDelete(data.id);
                return res.json({ success: true, message: "User deleted successfully" });
            }

            default:
                return res.status(200).send(); // Send a blank response for unknown types
        }
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({
            success: false,
            message: 'Webhook error',
            error: error.message
        });
=======
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
>>>>>>> a1edce70c7241271cee1e040c9d082f723873c3b
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

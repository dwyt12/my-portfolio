import { Router } from "express";
import Message from "../models/message.js";
import { sendContactNotification } from "../utils/mailer.js";

const router = Router();

// POST /api/messages — submit the contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email and message are required" });
    }
    const saved = await Message.create(req.body);
    console.log(`[messages] Saved ${saved._id} to ${saved.collection.name} collection (db: ${saved.db.name})`);

    // Fire-and-forget: don't let a mail failure fail the request, since
    // the message is already safely stored in MongoDB either way.
    sendContactNotification(saved).catch(() => {});

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to send message" });
  }
});

// GET /api/messages — list submissions (e.g. for an admin view)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
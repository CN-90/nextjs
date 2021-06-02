import { MongoClient } from "mongodb";
import { getAllDocuments } from "../../../helpers/db-util";

const handler = async (req, res) => {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    `mongodb+srv://CN90:${process.env.DB_PASSWORD}@cnrl.snedz.mongodb.net/events?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = client.db();

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId;
    res.status(201).json({ message: "Comment created.", comment: newComment });
  }

  if (req.method === "GET") {
    const comments = await getAllDocuments(
      client,
      "comments",
      { _id: -1 },
      { eventId: eventId }
    );
    res.status(200).json({ comments: comments });
  }

  client.close();
};

export default handler;

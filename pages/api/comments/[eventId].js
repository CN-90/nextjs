import {
  getAllDocuments,
  connectDatabase,
  insertDocument,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  const eventId = req.query.eventId;
  let result;
  let client;

  try {
    client = await connectDatabase();
  } catch (err) {
    res.status(500).json({ message: "Connecting to database failed." });
    return;
  }

  // POST REQUEST //   // POST REQUEST //
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      client.close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result._id;
      res
        .status(201)
        .json({ message: "Comment created.", comment: newComment });
    } catch (err) {
      res.status(500).json({ message: "Creating comment failed." });
      return;
    }
  }
  // POST REQUEST END //   // POST REQUEST END //   // POST REQUEST END //

  // GET REQUEST //   // GET REQUEST //  // GET REQUEST //
  if (req.method === "GET") {
    try {
      const comments = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: comments });
    } catch (err) {
      res.status(500).json({ message: "Failed to retreive comments." });
    }
  }

  client.close();
};

export default handler;

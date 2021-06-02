import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    const client = await MongoClient.connect(
      `mongodb+srv://CN90:${process.env.DB_PASSWORD}@cnrl.snedz.mongodb.net/events?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const db = client.db();
    await db.collection("newsletter").insertOne({ email: userEmail });

    client.close();
    res.status(201).json({ message: "Thanks for subscribing!" });
  }
};

// function handler(req, res) {
//   const filepath = path.join(process.cwd(), "data", "newsletter.json");
//   const fileData = fs.readFileSync(filepath);
//   const data = JSON.parse(fileData);
//   data.push(req.body.email);
//   fs.writeFileSync(filepath, JSON.stringify(data));
// }

export default handler;

import { connectDatabase, insertDocument } from "../../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method === "POST") {
    //validate email
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (err) {
      res.status(500).json({ message: "Connecting to database failed." });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed." });
      return;
    }

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

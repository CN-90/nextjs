import fs from "fs";
import path from "path";

const handler = (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    console.log(userEmail);
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

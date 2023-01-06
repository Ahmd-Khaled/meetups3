// import fs from 'fs';
// import path from 'path';

import { MongoClient } from 'mongodb';

// api/new-meetup
// POST api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // Send data to mongodb
    const client = await MongoClient.connect(`mongodb+srv://ahmed123:01117494780@cluster0.iluostq.mongodb.net/meetups2?retryWrites=true&w=majority`)
    const db = client.db();

    const meetupsCollection = db.collection('meetups2');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted! '});
  }

  // if (req.method === 'POST') {
  //   const data = req.body;

  //   // Send data to JSON local file
  //   const filePath = path.join(process.cwd(), 'data', 'localdb.json');
  //   const fileData = fs.readFileSync(filePath);
  //   const oldData = JSON.parse(fileData);
  //   oldData.push(data);
  //   fs.writeFileSync(filePath, JSON.stringify(oldData));

  //   res.status(201).json({ message: 'Meetup inserted to local file db!', feedback: data});
  // }
}

export default handler;
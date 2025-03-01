const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://Vocab_Boss:yfzAWQ13sIzgLrG9@cluster0.irm8dks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const userCollection = client.db(`Jp_Vocab`).collection(`users`);


    // get requests
    app.get("/", (req, res) => {
      res.send("Hello Gaja");
    });

    // post request
    app.post("/users", async (req, res) => {
      const userInfo = req.body;
      const result = userCollection.insertOne(userInfo);
      res.send(result);
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });

    // //////////////////////////////////////////////////////////
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

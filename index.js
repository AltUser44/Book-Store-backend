const express = require('express');
const app = express();
const port = process.env.PORT || 2000;
const cors = require('cors');

// CORS Configuration
const corsOptions = {
  origin: 'https://book-store-frontend-teal-iota.vercel.app',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// MongoDB Configuration
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;

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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Create a collection of documents
    const booksCollection = client.db('BookInventory').collection('books');

    // Insert a book to the db: POST method
    app.post('/api/upload-book', async (req, res) => {
      const data = req.body;
      const result = await booksCollection.insertOne(data);
      res.send(result);
    });

    // Get all books or filter by category
    app.get('/api/all-books', async (req, res) => {
      try {
        let query = {};
        if (req.query?.category) {
          query = { category: req.query.category };
        }
        const books = booksCollection.find(query);
        const result = await books.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch books' });
      }
    });

    // Update a book using PATCH or POST update method
    app.patch('/api/book/:id', async (req, res) => {
      const id = req.params.id;
      const updateBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          ...updateBookData,
        },
      };

      const result = await booksCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Delete a book using DELETE method
    app.delete('/api/book/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await booksCollection.deleteOne(filter);
      res.send(result);
    });

    // Get a single book's data
    app.get('/api/book/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await booksCollection.findOne(filter);
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: 'Failed to fetch book details' });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

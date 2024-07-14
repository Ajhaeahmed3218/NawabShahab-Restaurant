const express = require('express')
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://assignmet-eleven.web.app",
      "https://assignmet-eleven.firebaseapp.com",
    ],
    credentials: true,
  })
);

app.use(express.json())
app.use(cookieParser())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.itn5riw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//middleware-------------------->.>>>>>>>>>>>>>>

const logger = (req, res, next ) => {
  console.log("log : info", req.mehod, req.url);
  next()
};

const verifyToken = (req, res, next) => { 
  const token = req.cookies?.token
  console.log("token in the middleware", token);
  if (!token) {
    return res.status(401).send({message : "unauthorized access"})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({message : 'unauthorized access'})
    }
    req.user = decoded
    next()

  })
  
}
const cookeOption =  {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" ? true : false ,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
}


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const allFoodCollections = client.db("allFoodDB").collection('allFood')
    const foodGalleryCollections = client.db("allFoodDB").collection('foodGallery')
    const PurchaseCollections = client.db("allFoodDB").collection('allPurchase')


    // Auht Related Api ------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>
    app.post('/jwt', (req, res) => {
      const user = req.body;
      console.log("user for token ", user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

      res
        .cookie('token', token, cookeOption )
        .send({ success: true })
    })

    app.post('/logout', async (req, res) => {
      const user = req.body;
      console.log("loginoout", user);
      res.clearCookie('token', { ...cookeOption, maxAge: 0 }).send({ success: true })
    })





    // All Food ------------------------------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>

    app.get('/allfood', async (req, res) => {
      const cursor = allFoodCollections.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    // All Food use sort
    app.get('/allfoodSort', async (req, res) => {
      const cursor = allFoodCollections.find().sort({ purchase: -1 }).limit(6);
      const result = await cursor.toArray();
      res.send(result)
    })

    // A Food by Search 
    app.get('/search/:query', async (req, res) => {
      const searchQuery = req.params.query;
      const cursor = allFoodCollections.find({ foodName: { $regex: searchQuery, $options: 'i' } });
      const result = await cursor.toArray();
      res.send(result);
    });

    // A data From All Food 
    app.get("/allfood/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await allFoodCollections.findOne(query)
      console.log("cookcook", req.cookies);
      res.send(result)
    })
    // Add food to" add my food "
    app.post("/allfood", async (req, res) => {
      const newFood = req.body
      console.log(newFood);
      const result = await allFoodCollections.insertOne(newFood);
      res.send(result);
    })

    // My Adde Food find || My added food items
    app.get('/myfood/:email',logger, verifyToken, async (req, res) => {
      

      if (req.user.email !== req.params.email) {
        return res.status(403).send({message : "forbidden access"})
      }
      const food = await allFoodCollections.find({ addBy: req.params.email }).toArray();
      res.send(food);
      console.log(req.params.email);
      // console.log("token ownar info", req.user);


    })

    // My Added Food Update 
    app.put('/allfood/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const updateFoot = req.body;
      const Spot = {
        $set: {
          foodName: updateFoot.foodName,
          foodImg: updateFoot.foodImg,
          foodCategory: updateFoot.foodCategory,
          quantity: updateFoot.quantity,
          price: updateFoot.price,
          addBy: updateFoot.addBy,
          foodOrigin: updateFoot.foodOrigin,
          shorDescription: updateFoot.shorDescription,
          purchase: updateFoot.purchase

        }
      }
      const result = await allFoodCollections.updateOne(filter, Spot, options)
      res.send(result)
    })

    // My Added Food DElete
    app.delete("/allfood/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await allFoodCollections.deleteOne(query)
      res.send(result)
    })


    // Gallery Collection ..........................................>>>>>>>

    // Add Gallery Data 
    app.get('/foodgallery', async (req, res) => {
      const cursor = foodGalleryCollections.find();
      const result = await cursor.toArray();
      res.send(result)
    })

    // Add a data from Gallery page 
    app.post("/foodgallery", async (req, res) => {
      const newFood = req.body
      console.log(newFood);
      const result = await foodGalleryCollections.insertOne(newFood);
      res.send(result);
    })


    // Purchase Collection...............................>>>>>>>>>>>>>>>>>>>

    // Add a data from Gallery page 
    app.post("/purchase/:id", async (req, res) => {
      const newFood = req.body
      const newQuantity = parseInt(req.query.newQuantity);
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }

      console.log(req.params.id);
      const result = await PurchaseCollections.insertOne(newFood);
      const plusPurchase = await allFoodCollections.updateOne(query, { $inc: { purchase: newQuantity } });
      const minusQuantity = await allFoodCollections.updateOne(query, { $inc: { quantity: -newQuantity } });
      res.send(result);
      // res.send(addPurchase);

    })

    app.get('/purchase/:email',logger, verifyToken, async (req, res) => {
      if (req.user.email !== req.params.email) {
        return res.status(403).send({message : "forbidden access"})
      }
      const food = await PurchaseCollections.find({ beyerEmail: req.params.email }).toArray();
      res.send(food);
      console.log(req.params.email);

    })

    // My Purchase Food DElete
    app.delete("/purchase/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await PurchaseCollections.deleteOne(query)
      res.send(result)
    })




    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







app.get('/', (req, res) => {
  res.send('Nawab Sahab is runing')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express');
const cors=require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zhpccyh.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });

        const toysCollection=client.db("toys").collection('toy')





        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        app.post("/addtoys",async(req,res)=>{
            const body=req.body
            console.log(body)
            const result=await toysCollection.insertOne(body);
            console.log(result);


        })

        app.get("/allToys",async(req,res)=>{
            const result = await toysCollection.find().toArray();
            res.send(result);

        })

        app.delete('/allToys/:id',async(req,res)=>{
            const id=req.params.id
            
        })





    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('bodda ki hobor')
})

app.listen(port, () => {
    console.log(`lilos server on port ${port}`)
})
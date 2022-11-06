const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//MongoDB CRUD Server
const uri = "mongodb+srv://dbuser01:tushar2151@learnph.159fxoq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async() =>{
    try{
        const userCollection = client.db('nodeMongoCrud').collection('users');

        //Create
        app.post('/users', async(req, res) =>{
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        //READ
        app.get('/users', async(req, res) =>{
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

        //READ - (Dynamic)
        app.get('/users/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result);
        });

        //Update
        app.put('/users/:id', async(req, res) =>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
            const user = req.body;
            console.log(user);
            const updateUser = {$set: {
                name: user.name,
                address: user.address,
                email: user.email
            }}
            const result = await userCollection.updateOne(filter, updateUser, options);
            res.send(result);

        });

        //Delete
        app.delete('/users/:id', async(req, res)=>{
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            console.log(result);
            res.send(result);
        })

    }
    finally{

    }
}
run().catch(error => console.log(error));

app.get('/', (req, res) =>{
    res.send('Hello From Node MongoDB CRUD Sever');
});

app.listen(port, () =>{
    console.log(`Node MongoDB Server is Running on Port: ${port}`);
});
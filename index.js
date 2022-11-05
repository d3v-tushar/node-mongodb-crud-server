const express = require('express');
const cors = require('cors');
const app = express();
const port = process.nextTick.PORt || 5000;

//Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('Hello From Node MongoDB CRUD Sever');
});

app.listen(port, () =>{
    console.log(`Node MongoDB Server is Running on Port: ${port}`);
});
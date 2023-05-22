const express = require('express');
const cors=require('cors');
const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('bodda ki hobor')
})

app.listen(port, () => {
    console.log(`lilos server on port ${port}`)
})
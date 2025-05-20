const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.listen(4120, () => {    
    console.log(`Server is running on port 4120`);
});
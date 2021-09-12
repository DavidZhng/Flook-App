// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5001;

// app.use(cors());
// app.use(express.json());

// const uri = process.env.ATLAS_URI;
// //const uri = process.envv.MONGODB_URI;
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

// const usersRouter = require('./routes/users');

// app.use('/users', usersRouter);

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });
require('./config/db')

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const usersRouter = require('./routes/users');

const bodyParser = require('express').json;
app.user(bodyParser());

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
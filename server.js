const express = require('express');
const server = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes/user'); 
const cors=require('cors');
server.use(cors())

// const DB_URL="mongodb://127.0.0.1:27017/admin"
dotenv.config({ path: './config/.env' });
// Middleware
server.use(express.json());
// Routes
server.use('/api', routes);

// Error handling middleware
server.use(function(err, req, res, next)  {
  res.header ("Access-Control-Allow-Origin","*");
  res.header ("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header ("Access-Control-Allow-Headers","x-Requested-with,Content-Type,Accept,Authorization");

    next();
  console.error(err);
});

// connection with mongoose atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to the database');
}).catch((err) => {
  console.error('Error connecting to the database:', err);
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// connection with mongo db compass
// mongoose.connect(DB_URL);
// const conn=mongoose.connection;
// conn.once('open',()=>{
//   console.log('successfully connected to database');
// })
// conn.on('error',(err)=>{
//   console.log(`failed to connect to database${err.message}`)
// })

server.use('/api/task', require('./routes/taskRouter'));
server.use('/api/admin', require('./routes/adminRouter'));


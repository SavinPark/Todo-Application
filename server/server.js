// Express / port / cors & body-parser --------------------------------- //
const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');

// InitialTodoData ------------------------------------------------------ //
const initialTodoData = require('../src/InitialTodoData.js');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// API ------------------------------------------------------------------ //
// GET 
app.get('/initialtodos', (req, res) => {
  // Request
  // const todoCode = req.body.name;
  // Response
  console.log(req.body);
  res.send(initialTodoData);
})


// listen() ------------------------------------------------------------- //
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
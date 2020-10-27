const express = require('express');
const app = express();
const PORT = 5000;
// const bodyParser = require('body-parser');

app.use(express.static('server/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const history = [];

app.post('/api/calc', (req, res) => {
  const val1 = parseInt(req.body.val1);
  const val2 = parseInt(req.body.val2);
  let answer = 0;
  const op = req.body.op;

  if (!val1 || !val2) return res.send(400);

  if (op === 'add') {
    answer = val1 + val2;
  } else if (op === 'sub') {
    answer = val1 - val2;
  } else if (op === 'mul') {
    answer = val1 * val2;
  } else if (op === 'div') {
    answer = val1 / val2;
  } else {
    return res.sendStatus(400);
  }

  const equation = {
    val1,
    val2,
    op,
    answer,
  };

  history.push(equation);

  //switch(op) {
  //  case "add":
  //  answer = val1 + val2;

  ///break;
  //case "sub":
  //answer = val1 - val2;

  ///break;
  //case "mul":
  //answer = val1 * val2;

  //break;
  //case "div":
  //answer = val1 / val2;

  //break;
  //}

  res.sendStatus(200);
});

app.get('/api/history', (req, res) => {
  res.send(history);
});

app.listen(PORT, () => {
  console.log('server is running on port: ${PORT}');
});

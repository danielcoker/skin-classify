const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const TeachableMachine = require('@sashido/teachablemachine-node');

dotenv.config();

const model = new TeachableMachine({
  modelUrl: 'https://teachablemachine.withgoogle.com/models/aKnrU6zyg/',
});

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get('/image/classify', async (req, res) => {
  const { url } = req.query;

  return model
    .classify({
      imageUrl: url,
    })
    .then((predictions) => {
      console.log(predictions);
      return res.json(predictions);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send('Something went wrong!');
    });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

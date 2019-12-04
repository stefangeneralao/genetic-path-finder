const express = require('express');
const path = require('path');

const port = process.env.PORT || 3003;
const app = express();
const buildPath = path.resolve(__dirname, '../build');

app.use(['/genetic-path-finder', '/'], express.static(buildPath));
app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`Listening to port ${ port }.`);
});
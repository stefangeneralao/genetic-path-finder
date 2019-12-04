const express = require('express');
const path = require('path');

const port = 3003 || process.env.PORT;
const app = express();
const buildPath = path.resolve(__dirname, '../build');

app.use(['/genetic-path-finder', '/'], express.static(buildPath));

app.listen(port, () => {
  console.log(`Listening to port ${ port }.`);
});
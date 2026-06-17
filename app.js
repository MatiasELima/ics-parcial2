const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('CI/CD CORRIENDO PAPU');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
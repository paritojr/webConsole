const { exec } = require('child_process');
const express = require('express');
const path = require('path');
const app = express();
app.use(express.json()); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/api/terminal', (req, res) => {
  if (!req.body.data) {
    res.status(400).json({ error: 'no commands :(' });
    return;
  }
  exec(req.body.data, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ result: error.message });
      return;
    }
    if (stderr) {
      res.status(500).json({ result: stderr.message });
      return;
    }
    res.json({ result: stdout });
  });
});
app.listen(3000, () => {
  console.log('running lol');
});

const app = require('express')();

app.get('/', (req, res) => res.send('Working!'));

module.exports = () => {
  app.listen(3000);
}

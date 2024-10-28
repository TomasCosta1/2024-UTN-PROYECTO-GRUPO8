const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const loginRoutes = require('./routes/login');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);
app.use('/login', loginRoutes)

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
}); 
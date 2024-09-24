const express = require('express');
const sequelize = require('./config/database');
const User = require('./models/User');
const Book = require('./models/Book');
const BorrowRecord = require('./models/BorrowRecord');
const UserRoutes = require('./routes/userRoutes')
const BookRoutes = require('./routes/bookRoutes')
const BorrowRoutes = require('./routes/borrowRoutes')

const app = express();
app.use(express.json());

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Failed to sync database:', err);
});

app.use('/api', UserRoutes)
app.use('/api', BookRoutes)
app.use('/api', BorrowRoutes)

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

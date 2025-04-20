const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Chat = require('./models/chat');
require('dotenv').config();

// DB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// Use PORT from .env or default to 3000
const PORT = process.env.PORT || 3000;

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Home route
app.get('/', (req, res) => {
  res.render('home.ejs');
});

// Index route
app.get('/chats', async (req, res) => {
  const chats = await Chat.find();
  res.render('index.ejs', { chats });
});

// New chat route
app.get('/chats/new', (req, res) => {
  res.render('new.ejs');
});

// Create chat
app.post('/chats', async (req, res) => {
    try {
      const { from, to, message } = req.body;
      const newChat = new Chat({ from, to, message, created_at: new Date() });
      await newChat.save();
      res.redirect('/chats');
    } catch (err) {
      console.error("Chat Creation Error:", err);
      res.status(500).send("Error creating chat");
    }
  });

// Edit chat route
app.get('/chats/:id/edit', async (req, res) => {
  const { id } = req.params;
  const chat = await Chat.findById(id);
  res.render('edit.ejs', { chat });
});

// Update chat
app.put('/chats/:id', async (req, res) => {
  const { id } = req.params;
  const { message: newMsg } = req.body;
  await Chat.findByIdAndUpdate(id, { message: newMsg }, { runValidators: true, new: true });
  res.redirect('/chats');
});

// Delete chat
app.delete('/chats/:id', async (req, res) => {
  const { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect('/chats');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
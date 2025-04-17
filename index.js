const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')

const mongoose = require('mongoose');
const Chat = require('./models/chat');

main().then((res)=>{
    console.log('Connection successful!')
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public'))); //for accessing css
app.use(express.urlencoded({extended:true})); //for passing the POST data from req.body 
app.use(methodOverride('_method'))

// app.get('/', (req, res)=>{
//     res.send("The server is working")
// })

app.listen(8080,()=>{
    console.log(`The server is listen at port 8080`)
})

//index route

app.get('/chats', async (req,res)=>{
   let chats = await Chat.find();
//    console.log(chats)
   res.render('./index.ejs',{chats})
})
//New Route
app.get('/chats/new', (req,res)=>{
    res.render("new.ejs")
})

//POST route

app.post ('/chats', (req,res)=>{
    let {from,to,message} = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        message : message,
        created_at : new Date()
    });

    newChat.save().then((res)=>{
        console.log('Chat was saved')
    }).catch((err)=>{console.log(err)});

    res.redirect('/chats')
})

//edit route

app.get('/chats/:id/edit', async (req, res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);

    res.render('edit.ejs', {chat})
})

//PUT (Update) route

app.put("/chats/:id", async(req, res)=>{
    let {id} = req.params;
    let {message : newMsg} = req.body;



    let updatedChat = await Chat.findByIdAndUpdate(
        id, 
        {message : newMsg},
         {runValidators : true, new : true},
          );
    console.log(updatedChat);
    res.redirect('/chats')
})

//DELETE Route


app.delete ('/chats/:id', async (req, res)=>{
    let {id}= req.params;
    let chatDeleted = await Chat.findByIdAndDelete(id);

    console.log(chatDeleted)
    res.redirect('/chats')
}) 
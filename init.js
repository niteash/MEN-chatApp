const mongoose = require('mongoose');
const Chat = require('./models/chat');


main().then((res)=>{
    console.log('Connection successful!')
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

let Allchats = [
    {
        from : "Nitesh",
        to : 'Min Han',
        message : 'Good Morning!',
        created_at : new Date()  
    },
    {
        from : "Leh Leh Thu",
        to : 'Min Han',
        message : 'Dont go outside at night!',
        created_at : new Date()  
    },
    {
        from : "Myint Aung",
        to : 'Leh Leh Thu',
        message : 'I Love You!',
        created_at : new Date()  
    },
    {
        from : "Zin Mar Htun",
        to : 'Min Han',
        message : 'I love you!',
        created_at : new Date()  
    },

]

Chat.insertMany(Allchats);


const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
app.use(express.static(path.join(__dirname , 'src')));

const views = {
    root : './src/views'
}

// Use html
app.set('view engine' ,'html');

app.get('/' , (req,res) => {
    // Static files use .sendFile
    /*
        If using hbs , moustache or nunjucks.
        Use res.render() BUT must have app.set('view engines','hbs') to run
    */
    res.sendFile('index.html',views);
});

app.get('/page2' , (req,res)=>{
    res.sendFile('page2.html' , views);
});

app.get('/page3' , (req,res)=>{
    res.sendFile('page3.html',views);
});

app.listen(port , '0.0.0.0' , function () {
    console.log(`Listening to port ${port}`);
});
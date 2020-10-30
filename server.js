const express = require('express');
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static("public"));

app.use((req, res, next)=>{
  console.log('I run for all the routes');
  next();
});

app.use(express.urlencoded({ extended: true}));
// app.use(bodyParser.json());
app.use('/pokemon', require('./controllers/pokemon.js'));
app.use('/players',require('./controllers/playersControllers.js'));

var port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log('I am not listening')
})
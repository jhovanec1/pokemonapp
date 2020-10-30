const express = require('express');
const router = express.Router();

module.exports = router;
const Pokemon = require("../models").Pokemon;
const Player = require("../models").Player;

// Index Page
router.get('/', (req,res)=>{
  Pokemon.findAll().then((pokemon)=>{
    res.render('index.ejs', {
      pokemon: pokemon
      })
    });
});


// GET profile page
router.get('/:id', (req,res)=>{
  Pokemon.findByPk(req.params.id).then((pokemon)=>{
    res.render('show.ejs',{
      pokemon:pokemon,
    })
  })
  })  
  

// CREATE ITEM
router.get('/profile/new', (req,res)=>{
  res.render('new.ejs')
});

router.post('/profile/new', (req,res)=>{
  Pokemon.create(req.body).then((newPokemon)=>{
    res.redirect(`/pokemon/${newPokemon.id}`)
    console.log(req.body)
  })
})

// DELETE ITEM
router.delete('/:id', (req,res)=>{
    Pokemon.destroy({
      where: {
        id: req.params.id
      }
    }).then(()=>{
      res.redirect("/pokemon")
    })
  });

// EDIT ROUTE
router.get('/:id/edit', function(req, res){
  Pokemon.findByPk(req.params.id).then((pokemon)=>{
    Player.findAll().then((allPlayers)=> {
      res.render('edit.ejs',{
        pokemon:pokemon,
        players: allPlayers,
    });
  });
});
  });


// PUT UPDATE ROUTE
router.put('/:id', (req,res)=>{
    Pokemon.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true,
    }).then((pokemon)=>{
      console.log(req.body)
      Player.findByPk(req.body.player).then((foundPlayer)=>{
        console.log(foundPlayer)
        Pokemon.findByPk(req.params.id).then((foundPokemon)=>{
          console.log(foundPokemon)
          foundPokemon.addPlayer(foundPlayer);
          res.redirect('/pokemon');
        })
      })
    })
  });
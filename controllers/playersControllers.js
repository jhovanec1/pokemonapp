const express= require('express');
const router = express.Router();
const Players = require('../models').Player;
const Team = require('../models').Team;
const Pokemon = require('../models').Pokemon;


//GET INDEX PAGE
router.get('/', (req,res)=>{
    Players.findAll().then((players)=>{
        res.render('players/index.ejs',{
            players:players
        });   
    })
});

//POST LOGIN
router.post('/login', (req,res)=>{
    Players.findOne({
        where: {
            name: req.body.name,
            password: req.body.password,
        }
    }).then((player)=>{
        res.redirect(`/players/profile/${player.id}`)
    });
    // console.log(req.body.name)
    // console.log(req.params.name)
    // console.log(req.params.password)
});

// GET PROFILE PAGE

router.get('/profile/:id', (req,res)=>{
    Players.findByPk(req.params.id, {
        include: [{ model: Team},{model: Pokemon}],
    }).then((players)=>{
        Team.findAll().then((allTeams)=>{
            res.render('players/profile.ejs', {
                players:players,
                teams: allTeams, 
        });
    });
});
});

// EDIT THE PROFILE
router.put('/profile/:id', (req,res)=>{
    Players.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true,
    }).then((players)=>{
        res.redirect(`/players/profile/${req.params.id}`)
    })
    // COULD ADD A RENDER EJS TO SHOW EDITED
});
// CREATE NEW PLAYER
router.post("/signup", (req, res) => {
    Players.create(req.body).then((newPlayer) => {
      res.redirect(`/players/profile/${newPlayer.id}`);
    });
  });

// DELETE THE PLAYER
router.delete('/profile/:id', (req,res)=>{
    Players.destroy({
        where: {
            id: req.params.id
          }
        }).then(()=>{
          res.redirect("/players")
        })
})


module.exports = router;
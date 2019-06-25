const express = require('express');
const router = express.Router();
const knex = require('../db/client');

router.get('/new', (req, res) => {
  res.render('pages/new');
});

router.post('/', (req, res) => {
  let imgURL = "assets/img/placeholder.png"
  if (req.body.imgURL) {
    imgURL = req.body.imgURL;
  }
  const hashtags = getHashtags(req.body.content);

  for (let hashtag of hashtags) {
    knex('hashtags')
    .select('count')
    .where('hashtag', hashtag)
    .then(([count]) => {
     // if (count.length == 0)
     if (!count) {
       knex('hashtags')
       .insert({
         count: 1,
         hashtag: hashtag
       })
       .returning('*')
       .then(([count]) => {
         console.log(count);
       })
     } else {
       const newCount = count.count + 1;
       knex('hashtags')
       .where('hashtag', hashtag)
       .update({
         count: newCount
       })
       .returning('*')
       .then(hashtag => {
         console.log(hashtag);
       });
     }
    });
    
  }

  knex
    .insert({
      content: req.body.content,
      img_url: imgURL,
      username: req.cookies.username
    })
    .into('clucks')
    .returning('*')
    .then(([cluck]) => {
      res.redirect('/clucks');
    });
});

router.get('/', (req, res) => {

  knex
    .select('*')
    .from('clucks')
    .orderBy('created_at', 'desc')
    .then(clucks => {

      const newClucks = clucks;
      for (let cluck of newClucks) {
        cluck.easyCreatedAt = dateParser(dateConverter(cluck.created_at));
      }
      knex.select()
      res.render('pages/clucks', {
        newClucks: newClucks
      });
    });
});


function getHashtags(cluck) {
  const hashtags = cluck.split(" ").filter((word) => word[0] === "#");
  return hashtags;
}

function dateConverter(date_created) {

  const seconds = (Date.now() - date_created) / 1000;
  const totalMinutes = Math.trunc(seconds / 60);


  const minute = totalMinutes % 60;
  const totalHours = Math.trunc(totalMinutes / 60);

  const hour = totalHours % 24;
  const totalDays = Math.trunc(totalHours / 24);

  const day = totalDays % 7;
  const totalWeeks = Math.trunc(totalDays / 7);

  const week = totalWeeks % 5;
  const month = Math.trunc(week / 5);

  return {
    month,
    week,
    day,
    hour,
    minute
  };
}

function dateParser(date_obj) {
  let dateString = "";
  if (date_obj.minute === 0) {
    return "Just now";
  }
  for (let key in date_obj) {

    if (date_obj[key] != 0) {
      if (date_obj[key] > 1) {
        dateString += (date_obj[key] + " " + key + 's')
      } else {
        dateString += (date_obj[key] + " " + key)
      }
      dateString += " ";
    }
  }
  return dateString + " ago";
}
module.exports = router;
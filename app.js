const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://127.0.0.1:27017/wikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = new mongoose.Schema({
    title: {
      type: String,
    //   required: true
    },
    content: {
      type: String,
    //   required: true
    }
})
const Article = mongoose.model('Article', articleSchema);

app.get("/articles", function(req, res){
    Article.find(function(err, foundArticles){
        if (err) {
            res.send(err);
        } else {
            res.send(foundArticles);
        }
    })
});

app.post("/articles", function(req,res){
    console.log();
    console.log();

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save(function(err){
        if(!err){
            res.send("Successfully added a new article.")
        }else{
            res.send(err);
        }
    });
})

app.listen(3000, () => {
  console.log('App listening on port 3000');
});

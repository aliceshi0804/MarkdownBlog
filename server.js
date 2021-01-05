const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const articelRouter = require('./routes/articles');
const methodOverride = require('method-override')
const app = express();
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.set("view engine", "ejs");
// can access our article form inside our article route
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
});

app.use("/articles", articelRouter);

app.listen(PORT);

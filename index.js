import express from 'express';

import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'hyunmindev',
  resave: false,
  saveUninitialized: true,
}));

app.get('/', (req, res) => {
  if (req.session.count === undefined) {
    req.session.count = 1;
  } else {
    req.session.count += 1;
  }
  res.render('index', {name: req.cookies.name, count: req.session.count});
});

app.post('/set', (req, res) => {
  res.cookie('name', req.body.name);
  res.redirect('/');
});

app.listen(3000);

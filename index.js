import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(bodyParser.json())

const TOKEN_SECRET = process.env.TOKEN_SECRET;
console.log(TOKEN_SECRET);

function generateAccessToken(username) {
  const jwt_content = { username: username, isAdmin: false }
  return jwt.sign(jwt_content, TOKEN_SECRET, { expiresIn: '1800s' });
}

function authToken(token) {
  const decode = jwt.verify(token, process.env.TOKEN_SECRET)
  return decode;
}

app.get('/', (req, res) => {
  res.json({message: "ok"});
});

app.post('/create', (req, res) => {
  const token = generateAccessToken(req.body.username);
  res.json({token});
});

app.post('/check', async (req, res) => {
  const token = req.body.token;
  const decode = authToken(token);
  res.json(decode);
});

app.get('/create', (req, res) => {
  res.json({message: "please use post"});
});

app.listen(8888, () => {
  console.log("Listen on http://localhost:8888")
})
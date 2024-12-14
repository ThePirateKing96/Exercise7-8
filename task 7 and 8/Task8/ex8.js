//Elad Silam - 208112185
//Shai Salem - 314784372
const fs = require("fs");
const { i, forEach } = require("mathjs");

const listOfObj = fs.readFileSync(__dirname + "/data/users.json");

console.log(JSON.parse(listOfObj).length);
const arrOfUsers = JSON.parse(listOfObj);


fs.writeFileSync(`${__dirname}/data/ex8Out2.json`, "list of names:\n");

for(let i=0;i<arrOfUsers.length;i++){
  console.log(arrOfUsers[i].name)
  fs.appendFileSync(`${__dirname}/data/ex8Out2.txt`, `${arrOfUsers[i].name}\n` );
}

fs.writeFileSync(`${__dirname}/data/ex8Out1.txt`, `${arrOfUsers.length}`);



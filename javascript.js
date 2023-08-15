const { log } = require("console");
const express = require("express");
const { get } = require("https");
const app = express();
app.use(express.json());

const port = 3000;

app.get("/users", (req, res) => {
  res.send(data);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = getUser(id);
  res.send(user);
});

app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});

app.put('/users/:id', (req, res) => {
    let update = req.body;
    const id = req.params.id;
    userUp = getUser(id);
    userUp.id = update.id
    res.send(data);

})

app.post("/users/new", (req, res) => {
  let newUser = req.body;
  data.push(newUser);
  res.send(data)

});

 app.delete('/users/:id', (req, res) =>{
    userUp = getUser(id);
    data.find
 })

function getUser(id) {
  let temp = 0;
  data.forEach((element) => {
    if (element.id === id) {
      temp = element;
    }
  });
  return temp;
}

const data = [
  {
    id: "ori",
    email: "ori@gmail.com",
    password: "ori123",
  },
  {
    id: "elad",
    email: "elad@gmail.com",
    password: "elad123",
  },
  {
    id: "daniel",
    email: "dani@gmail.com",
    password: "dani123",
  },
];

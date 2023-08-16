import express from "express";
import bcrypt from "bcryptjs";
import passwordValidator from "password-validator";
import emailValidator from "email-validator";
import jsonfile from "jsonfile"
const passwordSchema = new passwordValidator();
passwordSchema.is().min(8).has().uppercase().has().lowercase();
const saltRounds = 10;
const app = express();

let data = [];

jsonfile.readFile("./data.json", function (err, obj) {
  if (err) console.error(err)
  data = obj.users;
})
app.use(express.json());
import { v4 as uuidv4 } from "uuid";
const port = 3000;

app.get("/users/all-users", (req, res) => {
  res.send(data)
})

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = getUser(id);
  res.send(user)
  jsonfile.readFile("./data.json", function (err, obj) {
    if (err) console.error(err)
    console.dir(obj)
  })
});

app.put("/users/:id", (req, res) => {
  let update = req.body;
  const id = req.params.id;
 const userUp = getUser(id);
  userUp.id = update.id;
  jsonfile.writeFile("./data.json", {users: data}, function (err) {
    if (err) console.error(err)
  })
  res.send(data);
});

app.post("/users/new", (req, res) => {
  let newUser = req.body;
  newUser.id = uuidv4();
  newUser.password = bcrypt.hashSync(newUser.password, saltRounds);
  let userPassword = newUser.password;
  res.send(userPassword);
  bcrypt.compare(userPassword, hash, (err, result) => {
    if (result) {
      res.send("ive found ur password");
    } else {
      res.send("thats not ur password u idiot");
    }
  });
  let userEmail = newUser.email;
  let send = false;
  data.forEach((element) => {
    if (element.password === userPassword && element.email == userEmail) {
      send = true;
    }
  });
  jsonfile.writeFile("./data.json", {users: data}, function (err) {
    if (err) console.error(err)
  })
  res.send(send);
});

app.post("/users/pass", (req, res) => {
  const password = req.body.password;
  const validePassword = passwordSchema.validate(password);
  if (!validePassword) {
    res.send("this is not a valid password");
  } else {
    res.send("great password");
  }
  jsonfile.writeFile("./data.json", {users: data}, function (err) {
    if (err) console.error(err)
  })
});

app.post("/users/email", (req, res) => {
  const email = req.body.email;
  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    res.send("this is not a valid email");
  } else {
    res.send("great email");
  }
  jsonfile.writeFile("./data.json", {users: data}, function (err) {
    if (err) console.error(err)
  })
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userUp = getUser(id);
  const index = data.indexOf(userUp);
  data.splice(index, 1);
  res.send("hi");
  jsonfile.writeFile("./data.json", {users: data}, function (err) {
    if (err) console.error(err)
  })
});

function getUser(id) {
  let temp = 0;
  data.forEach((element) => {
    if (element.id === id) {
      temp = element;
    }
  });
  return temp;
}

app.listen(3000, () => console.log("Example app listening on port 3000!"));

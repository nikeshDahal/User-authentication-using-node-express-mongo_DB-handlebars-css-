const express = require("express");
// const { path } = require("express/lib/application");
const app = express();
const port = process.env.PORT || 3000;
require("./db/connection");
const path = require("path");
const hbs = require("hbs");
const exp = require("constants");
const Register = require("./models/registers");
const { isWindows } = require("nodemon/lib/utils");
const { json } = require("express/lib/response");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partial_path = path.join(__dirname, "../templates/partials");
console.log(partial_path);
console.log(template_path);
console.log(path.join(__dirname, "../public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //to get data from forms
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

// routes
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});

// create a new user in the database
app.post("/register", async (req, res) => {
  try {
    // const password = req.body.password;
    // const cpassword = req.body.confirmPassword;
    const { name, email, password, confirmPassword } = req.body;
    Register.findOne({ email: email }, async (err, user) => {
      if (user) {
        const message=1;//for already registered user
        res.render("register",{message});
      } else {
        if (password === confirmPassword) {
          const registerdUser = new Register({
            name,
            email,
            password,
            confirmPassword,
          });
          const registered = await registerdUser.save();
          console.log(registered, "registered");
          res.status(201).render("login");
        } else {
          const message=2;//for password mismatch
          res
            .status(500)
            .render("register",{message});
        }
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//email validation in the database
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(`email is ${email} and password is ${password}`);
  const validatedUser = await Register.findOne({ email: email });
  if (password === validatedUser.password) {
    res.status(201).render("index");
  } else {
    // res.status(400).send("password is not correct");
    const errorValue=1;//for passwrd not correct
    res.render("login",{errorValue});
  }
});

//routes end

app.listen(port, () => console.log(`server is running in port ${port}`));

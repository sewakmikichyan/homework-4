const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.redirect("index.html");
});

class User {
    constructor(name, lastname, age) {
        this.name = name;
        this.lastname = lastname;
        this.age = age;
        this.id = `${this.name}_${this.lastname}_${this.age}`;
    }
}

const users = [
    new User("Sevak", "Mikichyan", 17),
    new User("Lusine", "Karapetyan", 25),
    new User("Aren", "Minasyan", 21),
    new User("Sona", "Avdalyan", 32),
];

app.get("/users", (req, res) => {
    res.json(users);
});

app.post("/users", (req, res) => {
    const { name, lastname, age } = req.body;
    users.push(new User(name, lastname, age));
    res.json(users);
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is runnig http://localhost:${PORT}`);
});
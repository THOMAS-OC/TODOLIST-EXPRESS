const express = require("express");
const session = require("express-session")
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// app.use(session({

//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }

// }))

const tasks = [

    {
        title: "apprendre EJS",
        statut: false
    },

    {
        title: "apprendre Anglais",
        statut: false
    },

    {
        title: "apprendre VUE.JS",
        statut: true
    },

    {
        title: "apprendre Python",
        statut: true
    },

]

console.log(tasks);

app.get("/", (req, res) => {
    console.log("ok");
    res.render('todo', {tasks});
})

// Modification d'état d'une tâche

app.get("/task/update/:id", (req, res) => {

    let identifiant = parseInt(req.params.id)
    tasks[identifiant].statut = true
    res.redirect('/');
})

// Suppression d'une tâche

app.get("/task/del/:id", (req, res) => {
    // console.log(req.params);
    let identifiant = parseInt(req.params.id)
    tasks.splice(identifiant, 1)
    res.redirect('/');
})

// Ajout d'une tâche

app.post("/task", (req, res) => {

    if (req.body.task){
        tasks.push({
            id : tasks.length+1,
            title : req.body.task,
            statut : false
        })
        console.log(tasks);
        res.redirect('/');
    }

    else {
        console.log("tâche vide !");
        res.redirect('/');
    }

})



app.listen(port, ()=>{
    console.log("serveur lancé sur le port 3000");
})
const express = require('express');
const fs = require('fs');
var cors = require('cors')
const app = express();
const port = 4000;
app.use(cors());

var notes = [];
var categories = [];
var users = ['user1', 'user2', 'user3'];
var loggedInUser = '';

class Note {
    constructor(title, content, date, category) {
        this.title = title;
        this.content = content;
        this.date = date;
        this.category = category;
    }
}

class Category {
    constructor(name) {
        this.name = name;
        this.id = categories.length;
    }
}

function testServerInit() {
    categories.push(new Category('Shopping'));
    categories.push(new Category('Work'));
    categories.push(new Category('Hobbies'));

    notes.push(new Note('Buy party supplies', '2x Cola\n2x Snacks\n4x Avocado\n1x Salsa sauce', new Date().toJSON().slice(0, 10), 'Shopping'));
    notes.push(new Note('Band practice', 'Band practice on Friday 04.09, usual spot', new Date().toJSON().slice(0, 10), 'Hobbies'));
    notes.push(new Note('Sprint planning', 'Wednesday, second floor conference room', new Date().toJSON().slice(0, 10), 'Work'));
    notes.push(new Note('Deploy an updated app', 'Friday, report to the client', new Date().toJSON().slice(0, 10), 'Work'));
}

function saveData() {
    fs.writeFileSync(loggedInUser + '.json', JSON.stringify({ notes: notes, categories: categories }));
}

function loadData() {
    notes = JSON.parse(fs.readFileSync(loggedInUser + '.json')).notes;
    categories = JSON.parse(fs.readFileSync(loggedInUser + '.json')).categories;
    notes = notes.filter(note => categories.filter(category => category.name === note.category).length > 0)
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    if (req.body.user && users.filter(user => user == req.body.user).length > 0) {
        loggedInUser = req.body.user;
        loadData();
        res.send({ 'success': true, 'categories': categories, 'notes': notes });
    }
    else
        res.send({ 'success': false });
});
app.post('/logout', (req, res) => {
    saveData();
    loggedInUser = '';
    res.send({});
});
app.post('/note', (req, res) => {
    if (req.body.title && req.body.content && req.body.date && req.body.category) {
        notes.push(new Note(req.body.title, req.body.content, req.body.date, req.body.category));
        saveData();
    }
    res.send({ 'categories': categories, 'notes': notes });
});
app.post('/deleteNote', (req, res) => {
    if (req.body.title) {
        notes = notes.filter(el => el.title != req.body.title)
        saveData();
    }
    res.send({ 'categories': categories, 'notes': notes });
});
app.post('/newCat', (req, res) => {
    if (req.body.name) {
        categories.push(new Category(req.body.name));
        saveData();
    }
    res.send({ 'categories': categories, 'notes': notes });
});
app.post('/editCat', (req, res) => {
    if (req.body.name && req.body.id) {
        categories.filter(el => el.id == req.body.id)[0].name = req.body.name;
        saveData();
    }
    res.send({ 'categories': categories, 'notes': notes });
});
app.post('/deleteCat', (req, res) => {
    if (req.body.id) {
        categories = categories.filter(el => el.id != req.body.id);
        saveData();
    }
    res.send({ 'categories': categories, 'notes': notes });
});


app.listen(port, () => console.log(`Notes server listening on port ${port}!`));

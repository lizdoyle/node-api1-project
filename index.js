// implement your API here
//const http = requires('http');
//commented out require of standard http information

const express = require('express');

//must bring in database in order to use CRUD operations (each function in the db.js file returns a PROMISE)
const db = require('./data/db');

// const hostname= '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", 'text-plain');
//     res.end('Hello')

// })
// html version with plain txt is commented out. working code is using express

const server = express();


//ROUTE HANDLER:
//('endpoint', (callback)  => {for server request tells server wht to do}
//req = request, res = response

//CRUD - Create Read Update Delete/Destroy
//       Post,  Get,  PUT,   Delete
server.get('/', (req, res) => {
    res.send('server is working');
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    db.insert(userInfo)
        .then((user) => {
            res.status(201).json({success: true, user})

        })
        .catch(err => {
            if(userInfo === !name || !bio) {
                res.status(400).json({
                    errorMessage: "Please provide name and bio for the user." 
                })
            }
            else {
                res.status(500).json({
                     error: "There was an error while saving the user to the database" })
            }
        })

})


//get request working in postman
server.get('/api/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({error: "The users information could not be retrieved." })
        })
})

server.get('/api/users/:id', (req, res) => {

    db.findById()
        .then(user => {
            return res.status(200).json(user)
        })
        .catch(err => {
            if(user === !id){
                return res.status(404).json({
                     message: "The user with the specified ID does not exist." })
            }
            else{
                res.status(500).end().json({
                     error: "The user information could not be retrieved." })
            }
        })
    
})

//delete function works via postman
server.delete('/api/users/:id', (req, res) => {

    const id = req.params.id;

    db.remove(id)
        .then(count => {
            return res.status(200).json({message: `User with id # of ${id} was deleted`})
        })
        .catch(err => {
            if(!id){
                return res.status(404).json({
                     message: "The user with the specified ID does not exist." })
            }
            else {
               return res.status(500).end().json({ error: "The user could not be removed" })
            }
        })
})

server.put('/api/users/:id', (req, res) => {
    db.update()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            if(user === !id){
                return res.status(404).json({
                    message: "The user with the specified ID does not exist." })
            }
            else {
                res.status(500).end().json({
                     error: "The user information could not be modified." })
            }
        })
    
})

// server.listen(port, hostname, () => {
//     console.log(`server listening on port http://${hostname}:${port}`)
// }

//using hostname and port set with standard http request, takes a port and a callback function below:
//listening on the port
server.listen(4000, () => {
    console.log('\n===server listening on port 4000===\n');
});

console.log("hello world")

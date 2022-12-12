let express = require("express");
let app = express();

//DB - 1 - Connect to the mongo DB
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://ConnectionsLab_Final:Safeguard1%21@connectionslab01.bvvwbnh.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect(); 

// to parse JSON
app.use(express.json());

let Leaderboard = [];

// app.get('/', (req,res)=> {
//     res.send('this is the main page');
// })


//2. add a route on server, that is listening for a post request

app.post('/Score', (req, res)=> {
    console.log(req.body);
    let obj = {
        name: req.body.name,
        score: req.body.score
    }

    //DB - 2 - add values to the DB
    db.push("ScoreData", obj);

    // coffeeTracker.push(obj);
    // console.log(coffeeTracker);
    res.json({task:"success"});
})

app.use('/', express.static('public'));
app.use('/Leaderboard/', express.static('public/Leaderboard'));
//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;


server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//add route to get all coffee track information
app.get('/getScore', (req,res)=> {
    //DB - 3 - fetch from the DB
    db.get("ScoreData").then(ScoreData => {
        let obj = {data: ScoreData};
        res.json(obj);
    })
    
})

// //Initialize socket.io
// let io = require("socket.io");
// io = new io.Server(server);

// io.on('connection', function(socket) {
//     console.log("We have a new client: " + socket.id);



//     //Listen for this client to disconnect
//     socket.on('disconnect', function() {
//         console.log("A client has disconnected: " + socket.id);
//     });

//     // Listen for a message named 'data' from this client
//     socket.on('position', function(position) {
//         //Data can be numbers, strings, objects
//         console.log("Received: 'position' " + position);

//         //Send the data to all clients, including this one
//         //Set the name of the message to be 'data'
//         // io.sockets.emit('position', position);

//         //Send the data to all other clients, not including this one
//         socket.broadcast.emit('position', position);

//         //Send the data to just this client
//         // socket.emit('data', data);
//     });

//     socket.on('player', function(player) {
//         io.sockets.emit('player', player);
//     })
// });

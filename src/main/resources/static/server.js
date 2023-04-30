const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// Connect to MongoDB - Update the URL to match your MongoDB server and database name
mongoose.connect("mongodb://localhost:27017/server-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error(error));

// Define the server schema - Update this to match your server data structure
const serverSchema = new mongoose.Schema({
    name: String,
    id: String,
    language: String,
    framework: String
});

// Define the server model - Update this to match your server collection name
const Server = mongoose.model("servers", serverSchema);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// API route to get all servers
app.get("/servers", function(req, res) {
    Server.find({}, function(error, servers) {
        if (error) {
            console.error(error);
            res.status(500).send("An error occurred while retrieving servers");
        } else {
            res.send(servers);
        }
    });
});

// API route to get a single server by ID
app.get("/servers/:id", function(req, res) {
    Server.findById(req.params.id, function(error, server) {
        if (error) {
            console.error(error);
            res.status(500).send("An error occurred while retrieving the server");
        } else if (!server) {
            res.status(404).send("Server not found");
        } else {
            res.send(server);
        }
    });
});

// API route to add a new server
app.post("/servers", function(req, res) {
    const server = new Server({
        name: req.body.name,
        id: req.body.id,
        language: req.body.language,
        framework: req.body.framework
    });
    server.save(function(error) {
        if (error) {
            console.error(error);
            res.status(500).send("An error occurred while adding the server");
        } else {
            res.send(server);
        }
    });
});

// API route to update an existing server by ID
app.put("/servers/:id", function(req, res) {
    Server.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        id: req.body.id,
        language: req.body.language,
        framework: req.body.framework
    }, {new: true}, function(error, server) {
        if (error) {
            console.error(error);
            res.status(500).send("An error occurred while updating the server");
        } else if (!server) {
            res.status(404).send("Server not found");
        } else {
            res.send(server);
        }
    });
});

// API route to delete a server by ID
app.delete("/servers/:id", function(req, res) {
    Server.findByIdAndDelete(req.params.id, function(error, server) {
        if (error) {
            console.error(error);
            res.status(500).send("An error occurred while deleting the server");
        } else if (!server) {
            res.status(404).send("Server not found");
        } else {
            res.send("Server deleted successfully");
        }
    });
});

// Serve the static HTML file
app.use(express.static("public"));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Server started on port ${port}`);
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://marlon_veiga2:tnAk4FVoPHiomUno@cluster0-bzt3p.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

app.use(cors());/* {origin:'http://localhost:3000'} */
app.use(express.json());
app.use(routes);

const PORT = 3333
server.listen(PORT);

const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const formData = require('express-form-data');
const ApiRouter = require('./src/routes/tLoanRoutes');

const app = express();
app.use('*', cors());

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// const io = require("socket.io")(server)

app.use(formData.parse({}));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
app.use(router);

app.use("/api", ApiRouter)

// 404 Error
app.use((req, res) => {
    res.status(404).send(`Sorry can't find that!`);
});

server.listen(PORT, (err) => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    return console.log(`Server is Listening on: http://localhost:${PORT}/`);
});

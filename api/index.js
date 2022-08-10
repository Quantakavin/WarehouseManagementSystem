const cors = require('cors');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
const formData = require('express-form-data');

const routes = require('./src/routes/index');
const config = require('./src/config/config');
const { userConnect, getUser, userLogout, userDisconnect } = require('./socketUsers');

app.use('*', cors());

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('login', ({ userid }) => {
        if (!getUser(userid)) {
            userConnect(socket.id, userid);
        }
    });

    socket.on('logout', ({ userid }) => {
        if (getUser(userid)) {
            userLogout(userid);
        }
    });

    socket.on('disconnect', () => {
        userDisconnect(socket.id);
        console.log(socket.id);
        console.log('user disconnected');
    });

    socket.on('send notification', ({ userid, notification }) => {
        if (getUser(userid)) {
            const pUser = getUser(userid);
            console.log('send notification is called');
            io.to(pUser.id).emit('notification', {
                id: pUser.id,
                userid: pUser.userid,
                text: notification
            });
        }
    });
});

app.use(formData.parse({}));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(config.cookiesecret));

app.use('/api', routes);

// 404 Error
app.use((req, res, next) => {
    res.status(404).send(`Sorry can't find that!`);
    next();
});

server.listen(PORT, (err) => {
    if (err) return console.log(`Cannot Listen on PORT: ${PORT}`);
    return console.log(`Server is Listening on: http://localhost:${PORT}/`);
});

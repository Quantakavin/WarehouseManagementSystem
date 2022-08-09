const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formData = require('express-form-data');
const routes = require('./src/routes/index');
const config = require('./src/config/config');
const { user_Connect, get_User, user_Logout, user_Disconnect } = require("./socketUsers");

const app = express();
app.use('*', cors());

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
       origin:  '*',
    },
 });


 io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on("login", ({userid}) => {
        if (!get_User(userid)) {
            user_Connect(socket.id, userid);
        }
    })

    socket.on("logout", ({userid}) => {
        if (get_User(userid)) {
            user_Logout(userid);
        }
    })

    socket.on("disconnect", () => {
        user_Disconnect(socket.id);
        console.log(socket.id)
        console.log("user disconnected");
    });

    socket.on("send notification", ({userid, notification}) => {
        if (get_User(userid)) {
            const p_user = get_User(userid);
            console.log(
                "send notification is called"
            )
            io.to(p_user.id).emit("notification", {
                id: p_user.id,
                userid: p_user.userid,
                text: notification,
            });
        }
    })
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

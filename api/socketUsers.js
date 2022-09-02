const cUsers = [];

function userConnect(id, userid) {
    const pUser = { id, userid };

    cUsers.push(pUser);
    return pUser;
}

function getUser(id) {
    return cUsers.find((pUser) => pUser.userid === id);
}

function userLogout(id) {
    const index = cUsers.findIndex((pUser) => pUser.userid === id);

    if (index !== -1) {
        return cUsers.splice(index, 1)[0];
    }
    return null;
}

function userDisconnect(id) {
    const index = cUsers.findIndex((pUser) => pUser.id === id);

    if (index !== -1) {
        return cUsers.splice(index, 1)[0];
    }
    return null;
}

module.exports = {
    userConnect,
    getUser,
    userLogout,
    userDisconnect
};

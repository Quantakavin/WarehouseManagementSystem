const c_users = [];

function user_Connect(id, userid) {
    const p_user = { id, userid };

    c_users.push(p_user);
    console.log('user added');
    console.log(c_users, 'users');
    return p_user;
}

function get_User(id) {
    return c_users.find((p_user) => p_user.userid === id);
}

function user_Logout(id) {
    const index = c_users.findIndex((p_user) => p_user.userid === id);

    if (index !== -1) {
        c_users.splice(index, 1)[0];
        console.log('user removed');
        console.log(c_users, 'users');
    }
}

function user_Disconnect(id) {
    const index = c_users.findIndex((p_user) => p_user.id === id);

    if (index !== -1) {
        c_users.splice(index, 1)[0];
    }
}

module.exports = {
    user_Connect,
    get_User,
    user_Logout,
    user_Disconnect
};

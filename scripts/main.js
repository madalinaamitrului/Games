function getUserManager() {
    let userManager = new UserManager();
    let userJsonFormat = window.localStorage.getItem('userManager');
    if (userJsonFormat) {
        var usersList = JSON.parse(userJsonFormat);
    }
    if (usersList) {
        userManager.users = usersList;
    }
    return userManager;
}
function register() {
    if (verifyInputs()) {
        let userEmail = $('#registerUserEmail').val();
        if (verifyEmail(userEmail)) {
            let userName = $('#registerUserName').val();
            let userPassword = $('#registerUserPassword').val();

            let user = new User(userName, userEmail, userPassword);
            let userManager = getUserManager();
            userManager.addUser(user);
            let usersList = userManager.users;
            let usersJsonFormat = JSON.stringify(usersList);
            window.localStorage.setItem('userManager', usersJsonFormat);
            window.location.href = "../pages/login.html";
        } else {
            $("#errorMail").text('Please enter a valid email address');
        }
    } else {
        $("#errorInputs").text('Please complete all the inputs valid data')
    }
}
function verifyInputs() {
    if (($('#registerUserName').val()) != '' && ($('#registerUserEmail').val()) != '' && (($('#registerUserPassword').val()) != '')) {
        return true;
    } else {
        return false;
    }
}
function verifyEmail(email) {
    if (email.includes('@')) {
        return true;
    } else {
        return false;
    }
}
function login() {
    let userEmail = $('#loginUserEmail').val();
    let userPassword = $('#loginUserPassword').val();
    let userManager = getUserManager();
    let isLoggedIn = userManager.loginUser(userEmail, userPassword);
    window.localStorage.setItem('userEmail', userEmail);

    if (isLoggedIn) {
        window.location.href = "../pages/menu.html";
    } else {
        return $('#loginerror').text('Login failed, try again');

    }
}
function logout() {
    window.localStorage.removeItem('userEmail');
    window.location.href = "../pages/login.html";
}
function getCurrentUser() {
    let userEmail = window.localStorage.getItem('userEmail')
    let userManager = getUserManager();
    let usersList = userManager.users;
    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].email == userEmail) {
            return usersList[i];
        }
    }
}
function removeUser() {
    let userManager = getUserManager();
    let userEmail = window.localStorage.getItem('userEmail');
    let users = userManager.removeUser(userEmail);
    window.localStorage.removeItem('userEmail');
    window.localStorage.setItem('userManager', users);
    window.location.href = "../pages/register.html";
}
function changePassword() {
    let oldPassword = rememberOldPasswords();
    let newpassword = $('#inputNewPassword').val();
    let userEmail = window.localStorage.getItem('userEmail');
    let userManager = getUserManager();
    userManager.changePassword(userEmail, newpassword);
    if (oldPassword == newpassword) {
        return $("#alertOldPassword").text("OLD PASSWORD,TRY ANOTHER ONE");
    }
    let usersList = userManager.users;
    let usersJsonFormat = JSON.stringify(usersList);
    window.localStorage.setItem('userManager', usersJsonFormat);
}
function rememberOldPasswords() {
    let currentUser = getCurrentUser();
    let oldPassword = currentUser.password;
    return oldPassword;
}
function changeName() {
    let newname = $('#inputNewName').val();
    let userEmail = window.localStorage.getItem('userEmail');
    let userManager = getUserManager();
    userManager.changeName(userEmail, newname);
    let usersList = userManager.users;
    let usersJsonFormat = JSON.stringify(usersList);
    window.localStorage.setItem('userManager', usersJsonFormat);
}
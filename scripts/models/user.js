class User {
    constructor(firstName, emailAddress, userPassword) {
        this.name = firstName;
        this.email = emailAddress;
        this.password = userPassword;
    }
    changePassword(password) {
        this.password = password;
    }
    changeName(name) {
        this.name = name;
    }
}
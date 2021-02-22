class UserManager {
    users = [];


    addUser(user) {
        this.users.push(user);
    }
    removeUser(email) {
        for (let index = 0; index < this.users.length; index++) {
            const user = this.users[index];
            if (user.email == email) {
                this.users.splice(index, 1);
            }
            return this.users;
        }
    }
    loginUser(email, password) {
        for (let index = 0; index < this.users.length; index++) {
            const currentUser = this.users[index];
            if (currentUser.email == email && currentUser.password == password) {
                return true;
            }
        } return false;
    }
    changePassword(email, newpassword) {
        for (let index = 0; index < this.users.length; index++) {
            const currentUser = this.users[index];
            if (currentUser.email == email) {
                currentUser.password = newpassword;
            }
        }
    }
    changeName(email, newname) {
        for (let index = 0; index < this.users.length; index++) {
            const currentUser = this.users[index];
            if (currentUser.email == email) {
                currentUser.name = newname;
            }
        }
    }
}
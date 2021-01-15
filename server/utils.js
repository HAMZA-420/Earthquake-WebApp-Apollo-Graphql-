const db = require('./db');

module.exports = {
    createStore: () => {
        const users = db.map(user => {
            return user
        })
        return {
            users
        }
    }
}
const login = require('./login')
const register = require('./register')

module.exports = {
    paths:{
        '/login':{
            ...login
        },
        '/signup':{
            ...register
        }
    }
}

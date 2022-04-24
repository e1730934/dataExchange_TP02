const addStudent = require('./addStudent');
const deleteStudent = require('./delStudent');

module.exports ={
    paths:{
        '/addStudent': {
            ...addStudent
        },
        '/deleStudent/:id': {
            ...deleteStudent
        }
    }
}

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/school.sqlite3');

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ dest: 'uploads/' , storage: storage}).single('file')

exports.addStudent = async (req,res) => {
    if(!Array.isArray(req.body)) {
        const {first_name, last_name, email} = req.body;
        db.run('INSERT INTO students (first_name, last_name, email) VALUES (?, ?, ?)', [first_name, last_name, email], (err) => {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                res.status(201).json({
                    message: 'Étudiant créé'
                });
            }
        });
    }else{
        const students = req.body;
        students.forEach(student => {
            db.run('INSERT INTO students (first_name, last_name, email) VALUES (?, ?, ?)', [student.first_name, student.last_name, student.email], (err) => {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }
            });
        });
        return res.status(201).json({
            message: 'Étudiant créé'
        });
    }
}

exports.editStudent = async (req,res) => {
    const {id} = req.params;
    const {first_name, last_name, email} = req.body;
    db.run('UPDATE students SET first_name = ?, last_name = ?, email = ? WHERE id = ?', [first_name, last_name, email, id], (err) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(201).json({
                message: 'Étudiant modifié'
            });
        }
    });
}

exports.deleteStudent = async (req,res) => {
    const {id} = req.params;
    db.run('DELETE FROM results WHERE student_id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            db.run('DELETE FROM students WHERE id = ?', [id], (err) => {
                if (err) {
                    res.status(500).json({
                        error: err.message
                    });
                } else {
                    db.run('DELETE FROM students WHERE id = ?', [id], (err) => {
                        if (err) {
                            res.status(500).json({
                                error: err.message
                            });
                        } else {
                            res.status(201).json({
                                message: 'Étudiant supprimé'
                            });
                        }
                    });
                }
            });
        }
    });
}
exports.addStudentImage = async (req,res) => {
    const {id} = req.params
    db.run('UPDATE students SET (image) = (?) WHERE id = (?)', [`${req.file.path}`, id], () => {
        upload(req,res, (err) =>{
            if(err){
                res.status(400).send("Something went wrong!");
            } res.send(req.file);
        })
    });
}

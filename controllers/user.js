const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const csv = require('csv-parser')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/school.sqlite3');
require("dotenv").config();

exports.registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    db.run('SELECT * FROM user WHERE email = ?', email, function(err, row) {
        if (err) {
            return res.status(500).json({
                message: "Error registering user",
                error: err
            });
        }
        if (row) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        db.run('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, hashPassword], (err) => {
            if (err) {
                res.status(500).json({
                    error: err.message
                });
            } else {
                res.status(201).json({
                    message: 'Utilisateur créé'
                });
            }
        });
    });

}

exports.loginUser = async (req,res) =>{
    const {email, password} = req.body;
    db.get('SELECT * FROM user WHERE email = ?', [email], (err, row) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else if (!row) {
            res.status(401).json({
                error: 'Utilisateur non trouvé'
            });
        } else {
            if (bcrypt.compareSync(password, row.password)) {
                const token = jwt.sign({
                    id: row.id,
                    nom: row.nom,
                    email: row.email
                }, process.env.TOKEN_KEY, {
                    expiresIn: '4h'
                });
                res.status(200).json({
                    message: 'Utilisateur connecté',
                    token: token
                });
            } else {
                res.status(401).json({
                    error: 'Mot de passe incorrect'
                });
            }
        }
    });
}

exports.insertUserCSV =  (req,res) =>{
    let users = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data',  (row) => {
            const user = {
                name: row.name,
                email: row.email,
                password: bcrypt.hashSync(row.password, 10)
            }
            users.push(user);
        })
        .on('end',() => {
            users.forEach(user => {
                db.run('SELECT * FROM user WHERE email = ?', [user.email], (err, row) => {
                    if (err) {
                        res.status(500).json({
                            error: err.message
                        });
                    } else if (!row) {
                        db.run('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password], (err) => {
                            if (err) {
                                res.status(500).json({
                                    error: err.message
                                });
                            }
                        });
                    }
                });
            });
        });
    res.json({
        success: true,
        message: 'Utilisateur(s) créé'
    })
}

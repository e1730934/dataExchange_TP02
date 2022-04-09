const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/school.sqlite3');

exports.registerUser = async (req,res) => { //TODO: add error if user already exists
    const {name, email, password} = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

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
                }, 'secret', {
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

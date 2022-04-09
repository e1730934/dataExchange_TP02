const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/school.sqlite3');

exports.registerUser = async (req,res) => {
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
    db.close();
}

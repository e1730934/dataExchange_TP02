const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/school.sqlite3');

exports.addStudent = async (req,res) => {
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
}

exports.editStudent = async (req,res) => {
    // TODO: Donner à vos routes la possibilité d’enregistrer une collection données (par exemple dans la route addStudent je peux ajouter trois étudiants dans le body de la requête et ce sera 3 enregistrements dans la table students)
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
    // TODO: Si cet étudiant a un résultat il faut aussi supprimer tous les résultats obtenus par cet étudiant.
    const {id} = req.params;
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

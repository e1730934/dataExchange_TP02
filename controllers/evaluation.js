const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/school.sqlite3');

exports.addEval = async (req,res) => { //TODO: add error if evals already exists
    const {name} = req.body;
    db.run('INSERT INTO evaluation (name) VALUES (?)', [name], (err) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(201).json({
                message: 'Évaluation créée'
            });
        }
    });
}

exports.editEvaluation = async (req, res) => {
    const {name} = req.body;
    const {id} = req.params;
    db.run('UPDATE evaluation SET name = ? WHERE id = ?', [name, id], (err) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(201).json({
                message: 'Évaluation modifiée'
            });
        }
    });
}

exports.delEval = async (req,res) => {
    //TODO: // Si cette évaluation a un résultat il faut aussi supprimer tous les résultats obtenus par cette évaluation.
    //     // En supprimant une évaluation vous devez aussi supprimer tous les résultats associées à cette évaluation.
    const {id} = req.params;
    db.run('DELETE FROM evaluation WHERE id = ?', [id], (err) => {
        if (err) {
            res.status(500).json({
                error: err.message
            });
        } else {
            res.status(201).json({
                message: 'Évaluation supprimée'
            });
        }
    });
}

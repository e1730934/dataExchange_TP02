const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/school.sqlite3');

exports.addResult = async (req,res) => {
    const {student_id, eval_id, note} = req.body;
    db.run(`INSERT INTO results (student_id, eval_id, note) VALUES (?, ?, ?)`, [student_id, eval_id, note],(err) => {
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
exports.editResult = async (req, res) => {
    const {student_id, eval_id, note} = req.body;
    db.run(`UPDATE results SET student_id = ?, eval_id = ?, note = ? WHERE id = ?`, [student_id, eval_id, note, req.params.id], (err) => {
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

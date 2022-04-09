const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/school.sqlite3');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validateUserSignUp, registerValidation} = require("./middleware/validation/user");
const {registerUser} = require("./controllers/user");

const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const port = process.env.PORT || 3000;

router.post('/signup', validateUserSignUp, registerValidation, registerUser) //Créer la route qui permet d’enregistrer un utilisateur (http://localhost :3000/signup)

router.post('/login', (req, res) => {
    //Créer la route qui permet de se connecter (http://localhost :3000/login)
    // - Le champ (email) doit être valide.
    // - Le champ (password) doit être encrypter avant son enregistrement dans la base de données.
    // - Générer un token qui expire après 4heures.
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
})

router.post('/addStudent', (req, res) => {
    // Créer une route qui permet d’enregistrer un étudiant (http://localhost:3000/addStudent)
    // - Les champs (prénom et nom) ne peuvent pas être vides et ne peuvent pas contenir moins de 5 caractères et plus de 20 caractères.
    // - Le champ (email) doit être valide.
    //TODO: Vérifier les conditions de validation
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
});

router.post('/addEvaluation', (req, res) => {
    //     Créer une route qui permet d’enregistrer une évaluation (http://localhost :3000/addEvaluation)
    // - Le champ (nom évaluation) ne peut pas être vide et ne peut pas contenir moins de 5 caractères.
    // TODO: Vérifier les conditions de validation
    const {name} = req.body;
    db.run('INSERT INTO evaluations (name) VALUES (?)', [name], (err) => {
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
})



router.put('/editStudent/:id', (req, res) => {
    // Créer les routes qui permettent de modifier un étudiant, une évaluation et un résultat à partir de son id.
    //Donner à vos routes la possibilité d’enregistrer une collection données (par exemple dans la route addStudent je peux ajouter trois étudiants dans le body de la requête et ce sera 3 enregistrements dans la table students)
    //Vous devez utiliser express validator pour valider les données des étudiants et aussi ajouter des message d’erreur personnalisées.
    // TODO: Vérifier les conditions de validation

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
})

router.delete('/delStudent/:id', (req, res) => {
    // Créer les routes qui permettent de supprimer un étudiant, une évaluation et un résultat à partir de son id.
    // Créer une route qui permet de supprimer un étudiant à partir de son id (http://localhost :3000/delStudent/id).
    // Si cet étudiant a un résultat il faut aussi supprimer tous les résultats obtenus par cet étudiant.
    // TODO: Vérifier les conditions de validation
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
})

router.delete('/delEvaluation/:id', (req, res) => {
    // Créer les routes qui permettent de supprimer un étudiant, une évaluation et un résultat à partir de son id.
    // Créer une route qui permet de supprimer une évaluation à partir de son id (http://localhost :3000/delEvaluation/id).
    // Si cette évaluation a un résultat il faut aussi supprimer tous les résultats obtenus par cette évaluation.
    // En supprimant une évaluation vous devez aussi supprimer tous les résultats associées à cette évaluation.
    // TODO: Vérifier les conditions de validation
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
})
//TODO : Documenter l'API
const server = app.listen(port, () => {
    console.log(`L'API peut maintenant recevoir des requêtes http://localhost:` + port);
});

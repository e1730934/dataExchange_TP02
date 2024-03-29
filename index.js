const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const docs = require('./docs');
require("dotenv").config()

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ dest: './uploads/' , storage: storage}).single('file')
const uploadCSV = multer({ dest: './uploads/' , storage: storage}).single('csv')

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

app.use(router)

const auth = require("./middleware/auth");
const {validateUserSignUp, registerValidation, validateUserLogin, loginValidation} = require("./middleware/validation/user");
const {registerUser, loginUser, insertUserCSV} = require("./controllers/user");
const {validationAddStudent, addStudentValidation, validationEditStudent} = require("./middleware/validation/student");
const {addStudent, editStudent, deleteStudent, addStudentImage} = require("./controllers/student");
const {validationAddEvaluation, addEvalValidation, validationEditEvaluation} = require("./middleware/validation/evaluation");
const {addEval, editEvaluation, delEval} = require("./controllers/evaluation");
const {validationAddResult, addResultValidation, validationEditResult} = require("./middleware/validation/results");
const {addResult, editResult, deleteResult} = require("./controllers/results");
const {printImage} = require("./controllers/utilities");


router.use('/api-docs',swaggerUi.serve,swaggerUi.setup(docs));

router.get('/getFile/:fileName', printImage)

router.post('/signup', validateUserSignUp, registerValidation, registerUser) //Créer la route qui permet d’enregistrer un utilisateur (http://localhost:3000/signup)
router.post('/login',validateUserLogin,loginValidation,loginUser) //Créer la route qui permet de se connecter (http://localhost:3000/login)
router.post('/addStudent',auth,validationAddStudent,addStudentValidation,addStudent) //Créer la route qui permet d’ajouter un étudiant (http://localhost:3000/addStudent)
router.post('/addEvaluation',auth,validationAddEvaluation, addEvalValidation, addEval) //Créer la route qui permet d’ajouter une évaluation (http://localhost:3000/addEvaluation)
router.post('/addResult',auth,validationAddResult, addResultValidation, addResult) //Créer la route qui permet d’ajouter un résultat (http://localhost:3000/addResult)
router.post('/csv',uploadCSV, insertUserCSV) //Créer la route qui permet d’ajouter un utilisateur à l'aide d'un fichier CSV (http://localhost:3000/csv)

router.put('/editStudent/:id',auth,validationAddStudent,addStudentValidation, editStudent) //Créer la route qui permet de modifier un étudiant (http://localhost:3000/editStudent/:id)
router.put('/editEvaluation/:id',auth,validationAddEvaluation, addEvalValidation, editEvaluation) //Créer la route qui permet de modifier une évaluation (http://localhost:3000/editEvaluation/:id)
router.put('/editResult/:id',auth,validationEditResult, addResultValidation, editResult) //Créer la route qui permet de modifier un résultat (http://localhost:3000/editResult/:id)
router.put('/student/:id/image' ,upload,addStudentImage,) //Créer la route qui permet d’ajouter une image à un étudiant (http://localhost:3000/student/:id/image)

router.delete('/delStudent/:id',auth,validationEditStudent, addStudentValidation, deleteStudent) //Créer la route qui permet de supprimer un étudiant (http://localhost:3000/delStudent/:id)
router.delete('/delEvaluation/:id',auth,validationEditEvaluation, addEvalValidation, delEval) //Créer la route qui permet de supprimer une évaluation (http://localhost:3000/delEvaluation/:id)
router.delete('/delResult/:eval_id',auth,validationEditResult, addResultValidation, deleteResult) //Créer la route qui permet de supprimer un résultat (http://localhost:3000/delResult/:id)

const server = app.listen(port, () => {
    console.log(`L'API peut maintenant recevoir des requêtes http://localhost:` + port);
});

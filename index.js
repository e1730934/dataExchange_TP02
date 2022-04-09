const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config()

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

app.use(router)

const auth = require("./middleware/auth");
const {validateUserSignUp, registerValidation, validateUserLogin, loginValidation} = require("./middleware/validation/user");
const {registerUser, loginUser} = require("./controllers/user");
const {validationAddStudent, addStudentValidation, validationEditStudent} = require("./middleware/validation/student");
const {addStudent, editStudent, deleteStudent} = require("./controllers/student");
const {validationAddEvaluation, addEvalValidation, validationEditEvaluation} = require("./middleware/validation/evaluation");
const {addEval, editEvaluation} = require("./controllers/evaluation");
const {validationAddResult, addResultValidation, validationEditResult} = require("./middleware/validation/results");
const {addResult, editResult} = require("./controllers/results");

const swaggerOptions = {
    swaggerDefinition : {
        info: {
            title: "TP02 API",
            description: "TP02 API",
            contact: {
                name: "Bilal Khendaf"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["index.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


router.post('/signup', validateUserSignUp, registerValidation, registerUser) //Créer la route qui permet d’enregistrer un utilisateur (http://localhost:3000/signup)
router.post('/login',validateUserLogin,loginValidation,loginUser) //Créer la route qui permet de se connecter (http://localhost:3000/login)
router.post('/addStudent',validationAddStudent,addStudentValidation,addStudent) //Créer la route qui permet d’ajouter un étudiant (http://localhost:3000/addStudent)
router.post('/addEvaluation',auth,validationAddEvaluation, addEvalValidation, addEval) //Créer la route qui permet d’ajouter une évaluation (http://localhost:3000/addEvaluation)
router.post('/addResult',auth,validationAddResult, addResultValidation, addResult) //Créer la route qui permet d’ajouter un résultat (http://localhost:3000/addResult)

router.put('/editStudent/:id',auth,validationAddStudent,addStudentValidation, editStudent) //Créer la route qui permet de modifier un étudiant (http://localhost:3000/editStudent/:id)
router.put('/editEvaluation/:id',auth,validationAddEvaluation, addEvalValidation, editEvaluation) //Créer la route qui permet de modifier une évaluation (http://localhost:3000/editEvaluation/:id)
router.put('/editResult/:id',auth,validationEditResult, addResultValidation, editResult) //Créer la route qui permet de modifier un résultat (http://localhost:3000/editResult/:id)

router.delete('/delStudent/:id',auth,validationEditStudent, addStudentValidation, deleteStudent) //Créer la route qui permet de supprimer un étudiant (http://localhost:3000/delStudent/:id)
router.delete('/delEvaluation/:id',auth,validationEditEvaluation, addEvalValidation, deleteStudent) //Créer la route qui permet de supprimer une évaluation (http://localhost:3000/delEvaluation/:id)
router.delete('/delResult/:id',auth,validationEditResult, addResultValidation, deleteStudent) //Créer la route qui permet de supprimer un résultat (http://localhost:3000/delResult/:id)

//TODO : Documenter l'API
/**
 * @swagger
 * /signup:
 *   post:
 *     parameters:
 *      - in: body
 *        name: user
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *            - name
 *          properties:
 *            email:
 *              type: string
 *              example: email@email.com
 *            password:
 *              type: string
 *              example: password12345
 *            name:
 *              type: string
 *              example: name
 *        responses:
 *          201:
 *            description: User created
 */
const server = app.listen(port, () => {
    console.log(`L'API peut maintenant recevoir des requêtes http://localhost:` + port);
});

module.exports = {
    post: {
        tags: [
            "TP02 CRUD operations"
        ],
        summary: "Add student",
        description: "Ajout d'un étudiant",
        operationId: "addStudent",
        parameters: [
            {
                in: "body",
                name: "Student",
                description: "Student to add",
                required: true,
                schema: {
                    type: "object",
                    $ref: "#/components/schemas/AddStudent"
                },
                properties: {
                    email: {
                        type: "string",
                        description: "Email of the student",
                        example: "email@email.com"
                    },
                    firstName: {
                        type: "string",
                        description: "First name of the student",
                        example: "John"
                    },
                    lastName: {
                        type: "string",
                        description: "Last name of the student",
                        example: "Doe"
                    },
                }
            }
        ],
        responses: {
            "200": {
                description: "Student added",
                // schema: {
                //     type: "object",
                //     $ref: "#/definitions/Student"
                // }
            },
            "400": {
                description: "Bad request",
                // schema: {
                //     type: "object",
                //     $ref: "#/definitions/Error"
                // }
            },
            "500": {
                description: "Internal server error",
                // schema: {
                //     type: "object",
                //     $ref: "#/definitions/Error"
                // }
            }
        },
    },
}

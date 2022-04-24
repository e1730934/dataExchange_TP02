module.exports = {
    post: {
        tags: [
            "TP02 CRUD operations"
        ],
        summary: "Register",
        description: "",
        operationId: "signUp",
        parameters: [
            {
                in: "body",
                name: "body",
                description: "Add a user to the DB",
                required: true,
                schema: {
                    $ref: "#/components/schemas/Register"
                }
            }
        ],
        responses: {
            201: {
                description: "User created"
            }
        }
    },
}

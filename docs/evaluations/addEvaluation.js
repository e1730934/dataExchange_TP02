module.exports = {
    post: {
        tags: [
            "TP02 CRUD operations"
        ],
        description: "Add a new evaluation",
        operationId: "addEvaluation",
        summary: "Add a new evaluation",
        parameters: [
            {
                name: "body",
                in: "body",
                description: "The evaluation to add",
                required: true,
                schema: {
                    $ref: "#/definitions/Evaluation"
                },
                properties:{
                  name: {
                    type: "string",
                    description: "The name of the evaluation"
                  },
                }
            }
        ],
        responses:{
            "201":{
                description: "The evaluation was added",
                schema: {
                    $ref: "#/definitions/Evaluation"
                }
            },
            "400":{
                description: "The evaluation was not added",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
}

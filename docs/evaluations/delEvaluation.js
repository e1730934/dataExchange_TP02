module.exports = {
    delete: {
        tags: [
            "TP02 CRUD operations"
        ],
        description: "Delete an evaluation",
        operationId: "deleteEvaluation",
        summary: "Delete an evaluation",
        parameters: [
            {
                name: "id",
                in: "path",
                description: "The id of the evaluation to delete",
                required: true,
                schema: {
                    type: "string"
                }
            }
        ],
    }
}

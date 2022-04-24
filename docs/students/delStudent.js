module.exports = {
    delete:{
        tags: [
            "TP02 CRUD operations"
        ],
        description: "Delete a student",
        operationId: "deleteStudent",
        summary: "Delete a student",
        parameters: [
            {
                name: "id",
                in: "path",
                description: "The id of the student to delete",
                required: true,
                schema: {
                    type: "string"
                }
            }
        ],
    }
}

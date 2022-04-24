module.exports = { //TODO - EDIT THIS TEMPLATE
    components: {
      schemas: {
        // id model
        id: {
          type: "string", // data type
          description: "An id of a user", // desc
          example: "1234", // example of an id
        },
        // user model
        User: {
          type: "object", // data type
          properties: {
            id: {
              type: "string", // data-type
              description: "User identification number", // desc
              example: "12345", // example of an id
            },
            name: {
              type: "string", // data-type
              description: "User's name", // desc
              example: "Lorry James", // example of a name
            },
            email: {
                type: "string", // data-type
                description: "User's email", // desc
                example: "lorry@mail.com", // example of a email
              },
             password: {
                type: "string", // data-type
                description: "User's password", // desc
                example: "adm@adm", // example of a email
              },
          },
        },
        // Todo input model
        UserInput: {
          type: "object", // data type
          properties: {
            name: {
              type: "string", // data type
              description: "User's name", // desc
              example: "Lorry James", // example of a name
            },
            email: {
                type: "string", // data type
                description: "User's email", // desc
                example: "lorry@mail.com", // example of a email
              },
          },
        },
        // error model
        Error: {
          type: "object", //data type
          properties: {
            message: {
              type: "string", // data type
              description: "Error message", // desc
              example: "User Not found", // example of an error message
            },
            internal_code: {
              type: "string", // data type
              description: "Error internal code", // desc
              example: "Invalid parameters", // example of an error internal code
            },
          },
        },
      },
    },
  };

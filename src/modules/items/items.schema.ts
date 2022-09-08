export const getAllItemsSchema = {
    tags: ["items"],
    reponse: {
        200: {
            type: "array",
            items: {
                id: {
                    type: "number"
                },
                name: {
                    type: "string"
                },
                image: {
                    type: "string"
                },
                description: {
                    type: "string"
                }
            }
        }
    }
}
export const getItemSchema = {
    tags: ["items"],
    params: {
        id: {
            type: "number"
        }
    },
    reponse: {
        200: {
            id: {
                type: "number"
            },
            name: {
                type: "string"
            },
            image: {
                type: "string"
            },
            description: {
                type: "string"
            }
        }
    }
}

export const getAllItemsSchema = {
    tags: ["items"],
    response: {
        200: {
            type: "array",
            items: {
                type: "object",
                properties: {
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
}
export const getItemSchema = {
    tags: ["items"],
    params: {
        id: {
            type: "number"
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
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

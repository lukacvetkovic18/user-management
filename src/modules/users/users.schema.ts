export const getAllUsersSchema = {
    tags: ["users"],
    reponse: {
        200: {
            type: "array",
            items: {
                id: {
                    type: "number"
                },
                firstName: {
                    type: "string"
                },
                lastName: {
                    type: "string"
                },
                email: {
                    type: "string"
                },
                phoneNumber: {
                    type: "number"
                },
                age: {
                    type: "number"
                },
                createdAt: {
                    type: "string"
                }
            }
        }
    }
}
export const getUserSchema = {
    tags: ["users"],
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
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            email: {
                type: "string"
            },
            phoneNumber: {
                type: "number"
            },
            age: {
                type: "number"
            },
            createdAt: {
                type: "string"
            }
        }
    }
}
export const createUserSchema = {
    tags: ["users"],
    body: {
        type: "object",
        properties: {
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            email: {
                type: "string"
            },
            password: {
                type: "string"
            },
            phoneNumber: {
                type: "number"
            },
            age: {
                type: "number"
            },
        }
    },
    reponse: {
        200: {
            type: "object",
            properties: {
                message: {
                    type: "string"
                }
            }
        }
    }
}
export const deleteUserSchema = {
    tags: ["users"],
    body: {
        type: "object",
        properties: {
            id: {
                type: "number"
            }
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                message: {
                    type: "string"
                }
            }
        }
    }
}
export const updateUserSchema = {
    tags: ["users"],
    body: {
        id: {
            type: "number"
        },
        firstName: {
            type: "string"
        },
        lastName: {
            type: "string"
        },
        email: {
            type: "string"
        },
        password: {
            type: "string"
        },
        phoneNumber: {
            type: "number"
        },
        age: {
            type: "number"
        },
    },
    response: {
        200: {
            type: "object",
            properties: {
                message: {
                    type: "string"
                }
            }
        }
    }
}


export const getAllAdminsSchema = {
    tags: ["admins"],
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
                },
                isSuperAdmin: {
                    type: "boolean"
                }
            }
        }
    }
}
export const getAdminSchema = {
    tags: ["admins"],
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
            },
            isSuperAdmin: {
                type: "boolean"
            }
        }
    }
}
export const createAdminSchema = {
    tags: ["admins"],
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
            isSuperAdmin: {
                type: "boolean"
            }
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
export const deleteAdminSchema = {
    tags: ["admins"],
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
export const updateAdminSchema = {
    tags: ["admins"],
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

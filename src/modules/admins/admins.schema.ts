export const getAllAdminsSchema = {
    tags: ["admins"],
    response: {
        200: {
            type: "array",
            items: {
                type: "object",
                properties: {
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
}
export const getAdminSchema = {
    tags: ["admins"],
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
        type: "object",
        properties: {
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


export const adminAuthSchema = {
    tags: ["admins"],
    body: {
        type: "object",
        properties: {
            email : { type: "string" },
            password: { type: "string" }
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                token: { type: "string" }
            }
        }
    }
}
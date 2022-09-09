export const getAllUsersSchema = {
    tags: ["users"],
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
                    }
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
                }
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

export const addAddressSchema = {
    tags: ["users"],
    body: {
        user_id: {
            type: "number"
        },
        address_id: {
            type: "number"
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

export const removeAddressSchema = {
    tags: ["users"],
    body: {
        user_id: {
            type: "number"
        },
        address_id: {
            type: "number"
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

export const insertItemSchema = {
    tags: ["users"],
    body: {
        type: "object",
        properties: {
            name: {
                type: "string"
            },
            image: {
                type: "string"
            },
            description: {
                type: "string"
            },
            user_id: {
                type: "number"
            },
            address_id: {
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

export const removeItemSchema = {
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

export const requestPasswordResetSchema = {
    tags: ["users"],
    body: {
        type: 'object',
        properties: {
            admin_id: { type: "number" },
            email: { type: "string" },
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                message: { type: "string" }
            }
        }
    }
}

export const resetPasswordSchema = {
    tags: ["users"],
    body: {
        type: 'object',
        properties: {
            code: { type: "number" },
            email: { type: "string" },
            newPassword: { type: "string" },
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                message: { type: "string" }
            }
        }
    }
}
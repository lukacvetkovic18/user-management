export const getAllAddressesSchema = {
    tags: ["addresses"],
    response: {
        200: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "number"
                    },
                    country: {
                        type: "string"
                    },
                    city: {
                        type: "string"
                    },
                    street: {
                        type: "string"
                    },
                    streetNumber: {
                        type: "string"
                    },
                    placeType: {
                        type: "string"
                    }
                }
            }
        }
    }
}
export const getAddressSchema = {
    tags: ["addresses"],
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
                country: {
                    type: "string"
                },
                city: {
                    type: "string"
                },
                street: {
                    type: "string"
                },
                streetNumber: {
                    type: "string"
                },
                placeType: {
                    type: "string"
                }
            }
        }
    }
}
export const createAddressSchema = {
    tags: ["addresses"],
    body: {
        type: "object",
        properties: {
            country: {
                type: "string"
            },
            city: {
                type: "string"
            },
            street: {
                type: "string"
            },
            streetNumber: {
                type: "string"
            },
            placeType: {
                type: "string"
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
export const deleteAddressSchema = {
    tags: ["addresses"],
    body: {
        type: "object",
        properties: {
            id: {
                type: "number"
            }
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
export const updateAddressSchema = {
    tags: ["addresses"],
    body: {
        type: "object",
        properties: {
            id: {
                type: "number"
            },
            country: {
                type: "string"
            },
            city: {
                type: "string"
            },
            street: {
                type: "string"
            },
            streetNumber: {
                type: "string"
            },
            placeType: {
                type: "string"
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

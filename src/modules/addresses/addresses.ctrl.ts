import { getCustomRepository } from "typeorm"
import { AddressesRepository } from "./addresses.repo";


export default async (server) => {
    const adR = getCustomRepository(AddressesRepository);

    const getAllAddresses = async (req, reply) => {
        try {
            return await adR.getAllAddresses()
        }
        catch(e) {
            console.error(e);
        }
    }

    const getAddress = async (req, reply) => {
        try {
            return await adR.getAddress(req.params.id)
        }
        catch(e) {
            console.error(e);
        }
    }

    const createAddress = async (req, reply) => {
        try {
            return await adR.createAddress(req.body)
        }
        catch(e) {
            console.error(e);
        }
    }

    const deleteAddress = async (req, reply) => {
        try {
            return await adR.deleteAddress(req.params.id)
        }
        catch(e) {
            console.error(e);
        }
    }

    const updateAddress = async (req, reply) => {
        try {
            return await adR.updateAddress(req.body)
        }
        catch(e) {
            console.error(e);
        }
    }


    return {
        getAllAddresses,
        getAddress,
        createAddress,
        deleteAddress,
        updateAddress
    }
}
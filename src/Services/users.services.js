import axios from "axios";

export default class UserService
{
    static async getAll()
    {
        return axios.get('/users')
    }

    static async storeClient(params)
    {
        return axios.post('users/', params)
    }

    static async getClient(id)
    {
        return axios.get(`users/${id}`)
    }

    static async editClient(id, params)
    {
        return axios.put(`users/${id}`, params)
    }

    static async getAddress(id)
    {
        return axios.get(`users/address/${id}/details`)
    }

 

    static async deleteClient(id)
    {
        return axios.delete(`users/${id}`)
    }

    
}
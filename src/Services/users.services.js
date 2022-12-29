import axios from "axios";

export default class UserService
{
    static async getAll(param)
    {
        return axios.get('/users', {param})
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
}
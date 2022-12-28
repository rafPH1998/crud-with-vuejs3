import axios from "axios";

export default class UserService
{
    static async getAll()
    {
        return axios.get('/users')
    }

    static async storeClient(params)
    {
        return axios.post('/users', params)
    }
}
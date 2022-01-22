import axios from 'axios';
import { TOKEN } from '../config'

class FetchAxios {
    async getUserData() {
        try {
            const result = await axios.get(`https://api.github.com/user?access`, {
                headers: { Authorization: `Token ${TOKEN}` }
            });
            return result.data;
        } catch (err) {
            console.error(err);
        }

    }

    // async getGistset() {
    //     const login = localStorage.getItem('username');
    //     try {
    //         const result = await axios.get(`https://api.github.com/users/${login}/gists`, {
    //             headers: { Authorization: `token pavansbhat:${TOKEN}` }
    //         })
    //         return result.data;
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    async getGists() {
        const login = localStorage.getItem('username');
        try {
            const result = await axios.get(`https://api.github.com/users/${login}/gists`, {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            return result;
        } catch (err) {
            console.error(err);
        }
    }

    async postGistset(data) {
        try {
            const result = await axios.post(`https://api.github.com/gists`, {
                ...data
            }, { headers: { Authorization: `Token ${TOKEN}` } })
            return result;
        } catch (err) {
            console.error(err);
        }

    }




}

export default new FetchAxios();


import axios from '@/api/axios-instance'

const common = {
    async login(params) {
        const url = '/api/common/login'
        return await axios.post(url, params)
    },
    async register(params) {
        const url = '/api/common/register'
        return await axios.post(url, params)
    },
}

export default common

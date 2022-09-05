import axios from '@/api/axios-instance'

const client = {
    async getNoteDetail(params) {
        const url = '/api/client/getNoteDetail'
        return await axios.get(url, {params})
    },
}

export default client

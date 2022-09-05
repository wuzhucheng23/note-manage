import axios from '@/api/axios-instance'

const server = {
    async personInfo(params) {
        const url = '/api/server/personInfo'
        return await axios.get(url, {params})
    },
    async getNotes(params) {
        const url = '/api/server/getNotes'
        return await axios.get(url, {params})
    },
    async getCategory(params) {
        const url = '/api/server/getCategory'
        return await axios.get(url, {params})
    },
    async getCategoryList(params) {
        const url = '/api/server/getCategoryList'
        return await axios.get(url, {params})
    },
    async getCategoryDetail(params) {
        const url = '/api/server/getCategoryDetail'
        return await axios.get(url, {params})
    },
    async getLogs(params) {
        const url = '/api/server/getLogs'
        return await axios.get(url, {params})
    },
    async getUser(params) {
        const url = '/api/server/getUser'
        return await axios.get(url, {params})
    },
    async addNotes(params) {
        const url = '/api/server/addNotes'
        return await axios.post(url, params)
    },
    async editNotes(params) {
        const url = '/api/server/editNotes'
        return await axios.post(url, params)
    },
    async deltNotes(params) {
        const url = '/api/server/deltNotes'
        return await axios.post(url, params)
    },
    async addCategory(params) {
        const url = '/api/server/addCategory'
        return await axios.post(url, params)
    },
    async editCategory(params) {
        const url = '/api/server/editCategory'
        return await axios.post(url, params)
    },
    async delCategory(params) {
        const url = '/api/server/delCategory'
        return await axios.post(url, params)
    },
    async editUser(params) {
        const url = '/api/server/editUser'
        return await axios.post(url, params)
    },
}

export default server

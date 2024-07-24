import { create } from 'apisauce'

const apiClient = create({
    baseURL: 'https://www.alphavantage.co'
})



export default apiClient;
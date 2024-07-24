import client from './client'

const apiKey = 'O0XV3HX4KMQNAYKF'


const getListings = (symbol: string | undefined) => client.get(`/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`);

export default {
    getListings
}
import axios from 'axios'

export const sendHttpRequest = async ({ url, method, body, headers }) => {
    // eslint-disable-next-line no-self-assign
    headers ? headers = headers : headers = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    
    try {
        const { data } = method === ('get' || 'delete')
        ? await axios[method](url, headers)
        : await axios[method](url, body, headers)

        return data.payload
    } catch (error) {
        throw error.respose ? error.response.data : error
    }
}
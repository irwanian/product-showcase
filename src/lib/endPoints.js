// const BASE_API = 'http://localhost:2021/'
const BASE_API = 'https://jubelio-products.herokuapp.com/'

const GET_ALL_PRODUCTS = (params) => {
    if (params){
        const { page, rows, keyword, order } = params
        return `${BASE_API}products/?page=${page}&rows=${rows}&keyword=${keyword}&order=${order}`
    }
    return `${BASE_API}products/?page=1&rows=90&keyword=&order=id asc`

}

const DELETE_PRODUCT = (id) => {
    return `${BASE_API}products/${id}/delete`
}

const EDIT_PRODUCT = `${BASE_API}products/`

export {
    GET_ALL_PRODUCTS,
    DELETE_PRODUCT,
    EDIT_PRODUCT
}
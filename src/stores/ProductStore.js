import React from 'react'
import { runInAction } from 'mobx'
import { sendHttpRequest } from '../lib/httpRequest'
import { BASE_API } from '../lib/api'

export const ProductStore = () => {
    return {
        products: [],
        isLoading: false,
        isModalEditOpen: false,
        async fetchProducts({ page, rows, keyword, order }){
            try {
                const getProductElements = {
                    url: `${BASE_API}products/?page=${page}&rows=${rows}&keyword=${keyword}&order=${order}`,
                    method: 'get'
                }
                const productData = await sendHttpRequest(getProductElements)
                
                runInAction(() => {
                    this.products = productData
                })
                console.log({ productData: this.products })
            } catch (error) {
                throw error            
            }
        },
        setLoading(){
            this.isLoading = !this.isLoading
        },
        setModalEdit(){
            this.isModalEditOpen = !this.isModalEditOpen
        }
    }
}

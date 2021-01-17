import React from 'react'
import { runInAction } from 'mobx'
import { sendHttpRequest } from '../lib/httpRequest'
import { BASE_API } from '../lib/api'

export const ProductStore = () => {
    return {
        products: [],
        modalData: {},
        modalEditData: {},
        isLoading: false,
        isModalProductLoading: false,
        isModalEditLoading: false,
        isModalOpen: false,
        isModalEditOpen: false,
        editProductNameValue: '',
        editProductSkuValue: '',
        editProductPriceValue: 0,
        editProductImageValue: '',
        editProductDescriptionValue: '',

        async fetchProducts(params){
            try {
                const getProductElements = {
                    url: `${BASE_API}products/?page=${params.page}&rows=${params.rows}&keyword=${params.keyword}&order=${params.order}`,
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
        async deleteProduct(e, id){
            e.preventDefault()
            this.setLoading('delete')
            try {
                console.log({ id })
                const deleteProductElements = {
                    url: `${BASE_API}products/${id}/delete`,
                    method: 'delete'
                }

                const productDeleted = await sendHttpRequest(deleteProductElements)

                console.log({ productDeleted })
                this.isModalOpen = false
                this.fetchProducts({ page: 1, rows: 1000, keyword: '', order: 'id asc' })
                this.setLoading('delete')
            } catch (error) {
                this.setLoading('delete')
                throw error
            }
        },
        async submitEditData(e, id){
            e.preventDefault()
            try {
                const objEditProduct = {
                    name: this.editProductNameValue,
                    price: this.editProductPriceValue,
                    sku: this.editProductSkuValue,
                    description: this.editProductDescriptionValue,
                    image: this.editProductImageValue
                }
    
                const editProductElements = {
                    url: `${BASE_API}products/${id}`,
                    method: 'post',
                    body: objEditProduct
                }
    
                const productEdited = await sendHttpRequest(editProductElements)
                console.log({ productEdited })
                
                this.fetchProducts({ page: 1, rows: 1000, keyword: '', order: 'id asc' })
            } catch (error) {
                th                
            }
        },
        onProductNameValueChange(e){
            this.editProductNameValue = e.target.value
        },
        onProductSkuValueChange(e){
            this.editProductSkuValue = e.target.value
        },
        onProductPriceValueChange(e){
            this.editProductImageValue = Number(e.target.value)
        },
        onProductDescriptionValueChange(e){
            this.editProductPriceValue = e.target.value
        },
        onProductImageValueChange(e){
            this.editProductDescriptionValue = e.target.value
        },
        setLoading(option){
            switch (option) {
                case 'delete':
                    this.isModalProductLoading = !this.isModalProductLoading
                    break;
                default:
                    this.isLoading = !this.isLoading
                    break;
            }
        },
        setModal(e, data){
            e.preventDefault()
            this.modalData = data
            console.log(this.modalData)
            this.isModalOpen = !this.isModalOpen
        },
        setModalEdit(e, data){
            e.preventDefault()
            this.modalEditData = data
            console.log(this.modalData)
            this.isModalOpen = false
            this.isModalEditOpen = !this.isModalEditOpen
        },
        cancelEdit(){
            this.isModalEditOpen = false
        }
    }
}

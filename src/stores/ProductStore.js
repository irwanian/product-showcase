import { runInAction } from 'mobx'
import Swal from 'sweetalert2'
import { sendHttpRequest } from '../lib/httpRequest'
import { GET_ALL_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT } from '../lib/endPoints'

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
                    url: GET_ALL_PRODUCTS(),
                    method: 'get'
                }
                const productData = await sendHttpRequest(getProductElements)
                
                runInAction(() => {
                    this.products = productData
                })
            } catch (error) {
                throw error            
            }
        },
        async deleteProduct(e, data){
            e.preventDefault()
            this.setLoading('delete')
            try {
                const deleteProductElements = {
                    url: DELETE_PRODUCT(data.id),
                    method: 'delete'
                }
                await sendHttpRequest(deleteProductElements)

                runInAction(()=> {
                    this.isModalOpen = false
                })
                this.throwAlert('delete', data.name)
                this.fetchProducts()
                this.setLoading('delete')
            } catch (error) {
                this.setLoading('delete')
                throw error
            }
        },
        async submitEditData(e, data){
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
                    url: EDIT_PRODUCT + data.id,
                    method: 'put',
                    body: objEditProduct
                }
    
                const productEdited = await sendHttpRequest(editProductElements)
                this.setModalEdit(e, productEdited)
                this.throwAlert('edit', data.name)
                this.fetchProducts()
            } catch (error) {
                throw error              
            }
        },
        setDefaultFormData(previousData){
            if (previousData){
                this.editProductNameValue = previousData.name
                this.editProductPriceValue = previousData.price
                this.editProductSkuValue = previousData.sku
                this.editProductDescriptionValue = previousData.description
                this.editProductImageValue = previousData.image
            }
        },
        onValueChange(e, option){
            switch (option) {
                case 'name':
                    this.editProductNameValue = e.target.value
                    break;
                case 'price':
                    this.editProductPriceValue = Number(e.target.value)
                    break;
                case 'sku':
                    this.editProductSkuValue = e.target.value
                    break;
                case 'image':
                    this.editProductImageValue = e.target.value
                    break;
                case 'description':
                    this.editProductDescriptionValue = e.target.value
                    break;
                default:
                    return null
            }
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
            this.isModalOpen = !this.isModalOpen
        },
        setModalEdit(e, data){
            e.preventDefault()
            this.modalEditData = data
            this.isModalOpen = false
            this.isModalEditOpen = !this.isModalEditOpen
        },
        closeAlert(options){
            options === 'edit' ? this.isEditProductSuccess = false : this.isDeleteProductSuccess = false
        },
        cancelEdit(){
            this.isModalEditOpen = false
        },
        throwAlert(type, name){
            if (type === 'edit'){
                Swal.fire({
                    icon: 'success',
                    title: `Succesfully Edit ${name}`,
                    showConfirmButton: false,
                    timer: 1000
                  })
            }
            else {
                Swal.fire({
                    icon: 'success',
                    title: `${name} Deleted`,
                    showConfirmButton: false,
                    timer: 1000
                  })
            }
        }
    }
}

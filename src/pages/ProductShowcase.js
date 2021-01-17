import React, { useEffect } from 'react'
import { Observer } from 'mobx-react'
import { useProductsStore } from '../contexts/ProductContext'
import { formatMoneyToIdr } from '../lib/moneyFormat'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import ProductModal from '../components/Modals/ProductModal'
import Alert from '../components/Alert'

const ProductShowcase = () => {
    const store = useProductsStore()

    useEffect(() => {
        fetchData()
    })

    const fetchData = async () => {
        store.setLoading('initial')
        await store.fetchProducts({ page: 1, rows: 1000, keyword: '', order: 'id asc' })
        store.setLoading('initial')
    }

    const cutLongText = (text) => {
        if (text.length > 60){
            const shortText = text.substring(0, 60) + '. . .'
            return shortText
        }
        return text
    }

    const renderData = () => {
        if (store.isLoading){
            return (
                <div className="mx-auto d-flex justify-content-center align-items-center">
                    <Loading className='align-middle' />
                </div>
            )        
        }
        return store.products.map((product, i) => {
            return (
                <div onClick={(e) => store.setModal(e, product)} className='col-md-3 mr-3' key={i}>
                        <ProductCard
                        id='Cards'
                        class={'px-1'}
                        name={product.name}
                        image={product.image}
                        price={formatMoneyToIdr(product.price)}
                        sku={product.sku}
                        description={cutLongText(product.description)}
                        />
                </div>
            )
        })
    }

    return (
    <div className='container'>
        <div className='row justify-content-between'>
           <Observer>{() => renderData()}</Observer>
           <Observer>{() => <ProductModal data={store.modalData} isOpen={store.isModalOpen} toggle={store.setModal} />}</Observer>
        </div>
    </div>
    )
}


export default ProductShowcase
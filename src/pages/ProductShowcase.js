import React, { useEffect } from 'react'
import { Observer } from 'mobx-react'
import { useProductsStore } from '../contexts/ProductContext'
import { formatMoneyToIdr } from '../lib/moneyFormat'
import ProductCard from '../components/ProductCard'
import Loading from '../components/Loading'
import Pagination from '../components/Pagination'

const ProductShowcase = () => {
    const store = useProductsStore()
    const defaultRows = 9

    useEffect(() => {
        fetchData()
    })

    const fetchData = async () => {
        store.setLoading()
        await store.fetchProducts({ page: 1, rows: 9, keyword: '', order: 'id asc' })
        store.setLoading()
    }

    const cutLongText = (text) => {
        if (text.length > 100){
            const shortText = text.substring(0, 100) + '. . .'
            return shortText
        }
        return text
    }

    const renderData = () => {
        console.log({ len: store.products.length })
        if (store.isLoading){
            return (
                <div className="mx-auto d-flex justify-content-center align-items-center">
                    <Loading className='align-middle' />
                </div>
            )        
        }
        return store.products.map((product, i) => {
            return (
                <div className='col-md-3 mr-3' key={i}>
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
        </div>
        <div style={{'marginTop': '50px'}}>
           <Observer>{() => store.products.length > 0 && <Pagination lengths={store.products[0].rows} rows={defaultRows} />}</Observer>
        </div>
    </div>
    )
}


export default ProductShowcase
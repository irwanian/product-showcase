import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Observer } from 'mobx-react'
import { formatMoneyToIdr } from '../../lib/moneyFormat'
import { useProductsStore } from '../../contexts/ProductContext'
import Loading from '../Loading'
import ModalEdit from './ProductModalForm'

const ProductModal = (props) => {
    const store = useProductsStore()
    console.log({ store })

const renderModal = () => {
    if (store.isModalProductLoading){
        return (
            <div className="mx-auto d-flex justify-content-center align-items-center">
                <Loading className='align-middle' />
            </div> 
        )
    }
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggle} backdrop={false}>
            <ModalHeader toggle={props.toggle}>{props.data ? props.data.sku : ''}</ModalHeader>
            <ModalBody>
            <div>
                <div className="thumbnail">
                <img src={props.data ? props.data.image : ''} alt={props.data ? props.data.name : ''}
                style={{'maxWidth': '345px'}}
                />
                </div>
            <div>
                <h4 className='mt-5'>{props.data ? formatMoneyToIdr(props.data.price) : formatMoneyToIdr(0)}</h4>
                <h4 className='py-1'>{props.data ? props.data.name : ''}</h4>
                <p>{props.data ? props.data.description : ''}</p>
            </div>
            </div>
            </ModalBody>
            <ModalFooter>
                <button onClick={(e) => store.deleteProduct(e, props.data ? props.data.id : '')} type="button" className="btn btn-danger"> Delete </button>
                <button onClick={(e) => store.setModalEdit(e, props.data ? props.data : {})} type="button" className="btn btn-primary"> Edit </button>
            </ModalFooter>
        </Modal>
    )
    }

    return (
        <div>
            <Observer>{() => renderModal()}</Observer>
            <Observer>{() => <ModalEdit data={store.modalEditData} isOpen={store.isModalEditOpen} toggle={store.setModalEdit}/>}</Observer>
        </div>
    )
}

export default ProductModal
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Observer } from 'mobx-react'
import { useProductsStore } from '../../contexts/ProductContext'
import Loading from '../Loading'
import Form from '../ModalForm'

const ProductModal = (props) => {
    const store = useProductsStore()

    const renderModal = () => {
    if (store.isModalEditLoading){
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
                <Form data={props.data ? props.data : {}} />
            </ModalBody>
            <ModalFooter>
                <button onClick={()=> store.cancelEdit()} type="button" className="btn btn-danger"> Cancel </button>
                <button onClick={(e) => store.submitEditData(e, props.data ? props.data : 0)} type="button" className="btn btn-primary"> Edit </button>
            </ModalFooter>
        </Modal>
    )
    }

    return <Observer>{() => renderModal()}</Observer>
}

export default ProductModal
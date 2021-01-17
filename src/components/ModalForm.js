import React from 'react';
import { Observer } from 'mobx-react'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { useProductsStore } from '../contexts/ProductContext' 

const ProductForm = (props) => {
    const store = useProductsStore()
    
    store.setDefaultFormData(props.data ? props.data : undefined)
  return (
      <Observer>{()=>(
        <Form>
            <FormGroup>
                <Label>Product Name</Label>
                <Input onChange={(e)=> store.onValueChange(e, 'name')} type="text" name="name" defaultValue={props.data.name} placeholder="Insert Product Name" />
            </FormGroup>
            <FormGroup>
                <Label>SKU</Label>
                <Input onChange={(e)=> store.onValueChange(e, 'sku')} type="text" defaultValue={props.data.sku} name="text" placeholder="Insert SKU Code" />
            </FormGroup>
            <FormGroup>
                <Label>Price</Label>
                <Input onChange={(e)=> store.onValueChange(e, 'price')} type="number" defaultValue={props.data.price} name="text" placeholder="Insert Price" />
            </FormGroup>
            <FormGroup>
                <Label>Image URL</Label>
                <Input onChange={(e)=> store.onValueChange(e, 'image')} type="text" defaultValue={props.data.image} placeholder="Insert Image URL" />
            </FormGroup>
            <FormGroup>
                <Label>Description</Label>
                <Input onChange={(e)=> store.onValueChange(e, 'description')} defaultValue={props.data.description} type="textarea" name="text" />
            </FormGroup>
        </Form>
      )}</Observer>
  );
}

export default ProductForm;
import React from 'react'
import { Alert } from 'reactstrap'

const Alerts = (props) => {
    return (
        <Alert color={props.color}>
            {props.message}
        </Alert>
    )
}

export default Alerts
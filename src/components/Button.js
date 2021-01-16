import { Button } from 'reactstrap'

const ButtonComponent = (props) => {
    return <Button color={props.color}>{props.label}</Button>
}

export default ButtonComponent
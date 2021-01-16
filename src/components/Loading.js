import { Spinner } from 'reactstrap'

const Loading = () => {
    return (
        <div style={{'marginTop': '40vh'}}>
            <Spinner type='grow' color='primary' style={{'height': '5rem', 'width': '5rem'}} />
            <Spinner type='grow' color='primary' style={{'height': '5rem', 'width': '5rem'}} />
            <Spinner type='grow' color='primary' style={{'height': '5rem', 'width': '5rem'}} />
        </div>

    )
}

export default Loading
import { Navbar } from 'reactstrap'

const NavigationBar = () => {
    return <Navbar style={{'fontWeight': '700', 'fontSize': '28px', 'color': '#fafafa'}} className='py-3 mb-5' color='success' dark expand='xl'>
        Elevenia Product Showcase
    </Navbar>
}

export default NavigationBar
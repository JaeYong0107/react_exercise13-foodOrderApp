import { useContext } from 'react'
import { CartContext } from '../store/shopping-cart-context'
import imgLogo from '../assets/logo.jpg'


export default function Header({ onOpen }) {
    const { items } = useContext(CartContext);

    const totalNumber = items.reduce((total, item) => {
        return total + item.quantity
    }, 0);

    return (<div id='main-header'>
        <div id="title">
            <img src={imgLogo} />
            <h1 >REACTFOOD</h1>
        </div>
        <button className='text-button' onClick={onOpen}>{`Cart (${totalNumber})`}</button>
    </div>)
}
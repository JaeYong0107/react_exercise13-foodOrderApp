import { useEffect, useRef, useContext } from "react"
import { CartContext } from "../store/shopping-cart-context";


export default function CartModal({ open, onClose, onCheckout }) {
    const cart = useRef();
    const { items, updateItemCart } = useContext(CartContext)

    const totalPrice = items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0).toFixed(2);

    useEffect(() => {
        if (open) {
            cart.current.showModal();
        } else {
            cart.current.close();
        }
    }, [open]);

    return (
        <dialog className="modal" ref={cart}>
            <div className="cart">
                <h2>Your Cart</h2>
                <ul>
                    {items.map((item) => {
                        return <li key={item.id} className="cart-item">
                            <p>{item.name} - {item.quantity} X ${item.price}</p>
                            <p className="cart-item-actions">
                                <button onClick={() => updateItemCart(item.id, -1)}>-</button>
                                {item.quantity}
                                <button onClick={() => updateItemCart(item.id, 1)}>+</button>
                            </p>
                        </li>
                    })}
                </ul>
                <p className="cart-total">${totalPrice}</p>
                <p className="modal-actions">
                    <button className="text-button" onClick={onClose}>Close</button>
                    <button className="button" onClick={onCheckout}>Go to Checkout</button>
                </p>
            </div>
        </dialog >
    )
}
import { useEffect, useRef } from "react"


export default function CartModal({ open, cartMeals, onClose, onCheckout }) {
    const cart = useRef();

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
                <ul >
                    {cartMeals.map((meal) => {
                        return <li key={meal.id} className="cart-item">
                            <p>{meal.name} - 1 X ${meal.price}</p>
                            <p className="cart-item-actions">
                                <button>-</button>
                                1
                                <button>+</button>
                            </p>
                        </li>
                    })}
                </ul>
                <p className="cart-total">total</p>
                <p className="modal-actions">
                    <button className="text-button" onClick={onClose}>Close</button>
                    <button className="button" onClick={onCheckout}>Go to Checkout</button>
                </p>
            </div>
        </dialog >
    )
}
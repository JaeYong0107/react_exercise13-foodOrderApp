import { useRef, useEffect } from "react";

export default function CheckoutModal({ open, onClose }) {
    const checkout = useRef();

    useEffect(() => {
        if (open) {
            checkout.current.showModal();
        } else {
            checkout.current.close();
        }
    }, [open]);

    return (
        <dialog className="modal" ref={checkout}>
            <h2>Checkout</h2>
            <p>Total Amount: total</p>
            <form className="control">
                <label>Full name</label>
                <input type="text" name="fullName" />
                <label>E-Mail Address</label>
                <input type="email" name="email" />
                <label>Street</label>
                <input type="text" name="street" />
                <p className="control-row">
                    <label>Postal Code</label>
                    <input type="text" name="postalCode" />
                    <label>City</label>
                    <input type="text" name="city" />
                </p>
                <p className="control-row">
                    <button className="text-button" onClick={onClose}>Close</button>
                    <button className="button">Submit Order</button>
                </p>
            </form>
        </dialog>
    )
}
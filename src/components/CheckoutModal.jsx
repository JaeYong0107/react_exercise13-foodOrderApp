import { useRef, useEffect, useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
import { updateUserItem } from "../http";

export default function CheckoutModal({ open, onClose }) {
    const checkout = useRef();
    const { items } = useContext(CartContext);

    const totalPrice = items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0).toFixed(2);

    useEffect(() => {
        if (open) {
            checkout.current.showModal();
        } else {
            checkout.current.close();
        }
    }, [open]);

    function handleSubmitOrder(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        updateUserItem(items, customerData);

        onClose();
    }

    return (
        <dialog className="modal" ref={checkout}>
            <h2>Checkout</h2>
            <p>Total Amount: ${totalPrice}</p>
            <form className="control" onSubmit={handleSubmitOrder}>
                <label>Full name</label>
                <input type="text" name="name" />
                <label>E-Mail Address</label>
                <input type="email" name="email" />
                <label>Street</label>
                <input type="text" name="street" />
                <p className="control-row">
                    <label>Postal Code</label>
                    <input type="text" name="postal-code" />
                    <label>City</label>
                    <input type="text" name="city" />
                </p>
                <p className="modal-actions">
                    <button className="text-button" onClick={onClose}>Close</button>
                    <button className="button">Submit Order</button>
                </p>
            </form>
        </dialog>
    )
}


// import { useRef, useEffect, useContext } from "react";
// import { CartContext } from "../store/shopping-cart-context";
// import useHttp from "../hooks/useHttp";

// const requestConfig = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// };

// export default function CheckoutModal({ open, onClose }) {
//     const checkout = useRef();
//     const { items } = useContext(CartContext);
//     const {
//         data,
//         isLoading,
//         error,
//         sendRequest } = useHttp('http://localhost:3000/orders', requestConfig);

//     const totalPrice = items.reduce((total, item) => {
//         return total + item.price * item.quantity;
//     }, 0).toFixed(2);

//     useEffect(() => {
//         if (open) {
//             checkout.current.showModal();
//         } else {
//             checkout.current.close();
//         }
//     }, [open]);

//     function handleSubmitOrder(event) {
//         event.preventDefault();

//         const fd = new FormData(event.target);
//         const customerData = Object.fromEntries(fd.entries());

//         sendRequest(JSON.stringify({
//             order: {
//                 items,
//                 customer: customerData
//             }
//         }));

//         onClose();
//     }

//     let actions = (<>
//         <button className="text-button" onClick={onClose}>Close</button>
//         <button className="button">Submit Order</button>
//     </>)

//     if (isLoading) {
//         actions = <span>Sending order data.... </span>
//     }

//     if (data && !error) {
//         return (
//             <dialog className="modal" ref={checkout}>
//                 <h2>Success!</h2>
//                 <p>Your order was submitted successfully.</p>
//                 <p>
//                     We will get back to you with more details via email within the next few minutes.
//                 </p>
//                 <p className="modal-actions">
//                     <button className="text-button" onClick={onClose}>Okay</button>
//                 </p>
//             </dialog >
//         )
//     }

//     return (
//         <dialog className="modal" ref={checkout}>
//             <h2>Checkout</h2>
//             <p>Total Amount: ${totalPrice}</p>
//             <form className="control" onSubmit={handleSubmitOrder}>
//                 <label>Full name</label>
//                 <input type="text" name="name" />
//                 <label>E-Mail Address</label>
//                 <input type="email" name="email" />
//                 <label>Street</label>
//                 <input type="text" name="street" />
//                 <p className="control-row">
//                     <label>Postal Code</label>
//                     <input type="text" name="postal-code" />
//                     <label>City</label>
//                     <input type="text" name="city" />
//                 </p>
//                 {error && <Error title="Failed ro submit order" message={error} />}

//                 <p className="modal-actions"><button className="text-button" onClick={onClose}>Close</button>
//                     <button className="button">Submit Order</button></p>
//             </form>
//         </dialog>
//     )
// }
import { createContext, useReducer } from 'react';

export const CartContext = createContext({
    items: [],
    addItemCart: (item) => { },
    updateItemCart: (id) => { },
    clearCart: () => { }
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems }
    }

    if (action.type === 'UPDATE_ITEM') {
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.id
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex]
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        };

        return {
            ...state, items: updatedItems
        };
    }

    if (action.type === 'CLEAR_CART') {
        return { ...state, items: [] };
    }
    return state;
}

export default function ContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function handleAddItemToCart(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function handleUpdateItemQuantity(id, amount) {
        dispatchCartAction({ type: 'UPDATE_ITEM', payload: { id, amount } });
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }
    const ctxValue = {
        items: cart.items,
        addItemCart: handleAddItemToCart,
        updateItemCart: handleUpdateItemQuantity,
        clearCart
    };

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )

}
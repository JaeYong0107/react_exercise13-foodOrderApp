import { createContext, useReducer } from 'react';

export const CartContext = createContext({
    items: [],
    addItemCart: () => { },
    updateItemQuantity: () => { },
});

async function fetchMeals() {
    const response = await fetch('http://localhost:3000/meals');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch Meals!');
    }

    return resData;
}

async function shoppingCartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = await fetchMeals().find((product) => product.id === action.payload)
            updatedItems.push({
                id: action.payload,
                name: product.name,
                price: product.price,
                quantity: 1,
            })
        }

        return {
            items: updatedItems,
        }
    }

    return state;
}

export default function ContextProvider({ children }) {
    const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
        items: [],
    })

    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: id
        })
    }

    function handleUpdateItemQuantity() {

    }

    const ctxValue = {
        items: shoppingCartState.items,
        addItemCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateItemQuantity,
    };

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )

}
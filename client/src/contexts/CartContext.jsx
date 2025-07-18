import React, { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

// Initial state
const initialState = {
    items: [],
};

// Safely load cart from localStorage
const loadInitialState = () => {
    try {
        const saved = JSON.parse(localStorage.getItem('cart'));
        if (saved && Array.isArray(saved.items)) {
            return saved;
        }
    } catch (err) {
        console.warn('Invalid cart in localStorage, resetting.');
    }
    localStorage.removeItem('cart');
    return initialState;
};

// Reducer function
const cartReducer = (state, action) => {
    const safeItems = Array.isArray(state.items) ? state.items : [];

    switch (action.type) {
        case 'ADD_TO_CART': {
            const { product, quantity, customization } = action.payload;

            const existingIndex = safeItems.findIndex(
                item =>
                    item.product._id === product._id &&
                    JSON.stringify(item.customization) === JSON.stringify(customization)
            );

            if (existingIndex !== -1) {
                const updatedItems = [...safeItems];
                updatedItems[existingIndex].quantity += quantity;
                return { ...state, items: updatedItems };
            }

            return {
                ...state,
                items: [...safeItems, { product, quantity, customization }],
            };
        }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: safeItems.filter((_, index) => index !== action.payload),
            };

        case 'UPDATE_QUANTITY': {
            const updatedItems = [...safeItems];
            updatedItems[action.payload.index].quantity = action.payload.quantity;
            return { ...state, items: updatedItems };
        }

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
};

// Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, loadInitialState);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    const addToCart = (product, quantity, customization = {}) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, customization } });
    };

    const removeFromCart = (index) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: index });
    };

    const updateQuantity = (index, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } });
    };

    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const getTotalItems = () =>
        Array.isArray(state.items)
            ? state.items.reduce((sum, item) => sum + item.quantity, 0)
            : 0;

    const getTotalCost = () =>
        Array.isArray(state.items)
            ? state.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
            : 0;

    return (
        <CartContext.Provider
            value={{
                items: Array.isArray(state.items) ? state.items : [],
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalItems,
                getTotalCost,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
import { useState, useContext } from 'react';

import ContextProvider, { CartContext } from './store/shopping-cart-context';
import CartModal from "./components/CartModal";
import CheckoutModal from './components/CheckoutModal';
import Header from "./components/Header";
import Products from "./components/Products";


function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { clearCart } = useContext(CartContext);

  function handleOpenCart() {
    setCartOpen(true);
  }

  function handleCloseCart() {
    setCartOpen(false);
  }

  function handleResetCart() {
    setCartOpen(false);
    clearCart();
  }

  function handleOpenCheckout() {
    setCheckoutOpen(true);
  }

  function handleCloseCheckout() {
    setCartOpen(false);
    setCheckoutOpen(false);
  }

  return (
    <ContextProvider>
      <CartModal open={cartOpen} onClose={handleCloseCart} onCheckout={handleOpenCheckout} />
      <CheckoutModal open={checkoutOpen} onClose={handleCloseCheckout} onReset={handleResetCart} />
      <Header onOpen={handleOpenCart} />
      <Products />
    </ContextProvider>
  );
}

export default App;

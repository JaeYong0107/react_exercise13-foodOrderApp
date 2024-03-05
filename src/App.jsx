import { useState, useEffect } from 'react';

import ContextProvider from './store/shopping-cart-context';
import CartModal from "./components/CartModal";
import CheckoutModal from './components/CheckoutModal';
import Header from "./components/Header";
import Products from "./components/Products";


function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [productMeals, setProductMeals] = useState([]);
  const [cartMeals, setCartMeals] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  async function fetchMeals() {
    const response = await fetch('http://localhost:3000/meals');
    const resData = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch Meals!');
    }

    return resData;
  }


  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const meals = await fetchMeals();
        setProductMeals(meals);
      } catch (error) {
        setError({ message: error.message } || 'Could not fetch meals, please try again later.');
      } finally {
        setIsFetching(false);
      }
    }

    fetchData();
  }, []);

  function handleAddToCart(meal) {
    setCartMeals(prevMeals => [...prevMeals, meal])
  }

  function handleOpenCart() {
    setCartOpen(true);
  }

  function handleCloseCart() {
    setCartOpen(false);
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
      <CartModal open={cartOpen} cartMeals={cartMeals} onClose={handleCloseCart} onCheckout={handleOpenCheckout} />
      <CheckoutModal open={checkoutOpen} onClose={handleCloseCheckout} />
      <Header onOpen={handleOpenCart} count={cartMeals.length} />
      <Products productMeals={productMeals} onAdd={handleAddToCart} />
      {console.log(cartMeals)}
    </ContextProvider>
  );
}

export default App;

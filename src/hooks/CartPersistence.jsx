import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loadCart, setLoading, setError } from '../store/cartSlice'

const CartPersistence = () => {
  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  
  const userId = auth.email ? auth.email.replace(/[@.]/g, '_') : null;


  useEffect(() => {
    if (!userId || !auth.isLoggedIn) return;

    const fetchCart = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/carts/${userId}.json`
        );
        dispatch(loadCart(response.data || {}));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      }
    };

    fetchCart();
  }, [userId, auth.isLoggedIn, dispatch]);

  
  useEffect(() => {
    if (!userId || !auth.isLoggedIn) return;

    const saveCart = async () => {
      try {
        await axios.put(
          `https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/carts/${userId}.json`,
          cart
        );
      } catch (error) {
        
        console.error('Error saving cart:', error.message);
      }
    };

    saveCart();
  }, [cart, userId, auth.isLoggedIn]);

  return null; 
};

export default CartPersistence;

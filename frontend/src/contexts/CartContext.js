import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, saveCart, calculateCartTotal } from '../utils/cartStorage';

/**
 * Контекст для управления состоянием корзины
 */
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children, products = [] }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsList, setProductsList] = useState(products);

  // Обновляем список продуктов при изменении пропса
  useEffect(() => {
    setProductsList(products);
  }, [products]);

  // Загружаем корзину из localStorage при монтировании
  useEffect(() => {
    const savedCart = getCart();
    setCart(savedCart);
  }, []);

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    if (cart.length > 0) {
      saveCart(cart);
    } else {
      // Очищаем localStorage если корзина пуста
      localStorage.removeItem('shoozlypay_cart');
    }
  }, [cart]);

  // Вычисляем общую сумму
  const total = calculateCartTotal(cart, productsList);

  const value = {
    cart,
    setCart,
    total,
    isCartOpen,
    setIsCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import styles from './CartButton.module.css';

/**
 * Кнопка корзины с отображением общей суммы
 * Отображается внизу экрана
 */
const CartButton = ({ onClick }) => {
  const { total, cart } = useCart();

  if (cart.length === 0) {
    return null;
  }

  return (
    <button className={styles.cartButton} onClick={onClick}>
      <span className={styles.cartIcon}>🛒</span>
      <span className={styles.cartText}>
        Оплатить {Math.round(total)} ₽
      </span>
    </button>
  );
};

export default CartButton;

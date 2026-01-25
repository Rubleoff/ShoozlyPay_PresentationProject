import React, { useState, useEffect } from 'react';
import { addToCart } from '../../utils/cartStorage';
import { useCart } from '../../contexts/CartContext';
import styles from './ProductModal.module.css';

/**
 * Модальное окно для выбора параметров товара
 * Позволяет выбрать количество месяцев (для подписок),
 * сумму пополнения (для Steam) или количество игровой валюты
 */
const ProductModal = ({ product, isOpen, onClose }) => {
  const { setCart } = useCart();
  const [months, setMonths] = useState(1);
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Сбрасываем состояние при открытии/закрытии модального окна
  useEffect(() => {
    if (isOpen && product) {
      setMonths(1);
      setAmount('');
      setQuantity(1);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    const options = {};
    
    if (product.type === 'subscription') {
      options.months = months;
    } else if (product.type === 'steam') {
      const steamAmount = parseFloat(amount);
      if (isNaN(steamAmount) || steamAmount <= 0) {
        alert('Введите корректную сумму');
        return;
      }
      options.amount = steamAmount;
    } else if (product.type === 'game_currency') {
      const currencyAmount = parseFloat(amount);
      if (isNaN(currencyAmount) || currencyAmount <= 0) {
        alert('Введите корректную сумму');
        return;
      }
      options.amount = currencyAmount;
    }

    // Добавляем товар в корзину quantity раз
    for (let i = 0; i < quantity; i++) {
      const newCart = addToCart(product, options);
      setCart(newCart);
    }

    onClose();
  };

  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  let calculatedPrice = finalPrice;
  if (product.type === 'subscription') {
    calculatedPrice = finalPrice * months;
  } else if ((product.type === 'steam' || product.type === 'game_currency') && amount) {
    calculatedPrice = parseFloat(amount) || 0;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        
        <div className={styles.modalContent}>
          <img
            src={product.image || 'https://via.placeholder.com/300'}
            alt={product.name}
            className={styles.modalImage}
          />
          
          <h2 className={styles.modalTitle}>{product.name}</h2>
          <p className={styles.modalDescription}>{product.description}</p>

          {product.type === 'subscription' && (
            <div className={styles.optionGroup}>
              <label className={styles.label}>Количество месяцев:</label>
              <div className={styles.monthsSelector}>
                {[1, 3, 6, 12].map((m) => (
                  <button
                    key={m}
                    className={`${styles.monthButton} ${
                      months === m ? styles.active : ''
                    }`}
                    onClick={() => setMonths(m)}
                  >
                    {m} {m === 1 ? 'месяц' : m < 5 ? 'месяца' : 'месяцев'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {(product.type === 'steam' || product.type === 'game_currency') && (
            <div className={styles.optionGroup}>
              <label className={styles.label}>
                {product.type === 'steam' ? 'Сумма пополнения (₽):' : 'Сумма игровой валюты (₽):'}
              </label>
              <input
                type="number"
                className={styles.amountInput}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Введите сумму"
                min="1"
                step="1"
              />
            </div>
          )}

          <div className={styles.optionGroup}>
            <label className={styles.label}>Количество:</label>
            <div className={styles.quantitySelector}>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.priceSection}>
            <span className={styles.priceLabel}>Итого:</span>
            <span className={styles.priceValue}>
              {Math.round(calculatedPrice * quantity)} ₽
            </span>
          </div>

          <button className={styles.addButton} onClick={handleAddToCart}>
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

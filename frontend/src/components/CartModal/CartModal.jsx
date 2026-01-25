import React from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import { useCart } from '../../contexts/CartContext';
import { updateCartItemQuantity, clearCart, calculateCartTotal } from '../../utils/cartStorage';
import { createPayment } from '../../api/api';
import styles from './CartModal.module.css';

/**
 * Модальное окно корзины
 * Открывается снизу как "ящик тумбы", занимает 85% экрана
 * Показывает товары, позволяет изменять количество и перейти к оплате
 */
const CartModal = ({ isOpen, onClose }) => {
  const user = useTelegram();
  const { cart, setCart, total, setIsCartOpen } = useCart();

  if (!isOpen) return null;

  const handleQuantityChange = (productId, options, newQuantity) => {
    const newCart = updateCartItemQuantity(productId, options, newQuantity);
    setCart(newCart);
  };

  const handleClearCart = () => {
    if (window.confirm('Очистить корзину?')) {
      const newCart = clearCart();
      setCart(newCart);
    }
  };

  const handleCheckout = async () => {
    try {
      const payment = await createPayment(cart, total);
      if (payment.success && payment.paymentUrl) {
        // В реальном приложении здесь будет редирект на YooMoney
        window.location.href = payment.paymentUrl;
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Ошибка при создании платежа');
    }
  };

  const getItemPrice = (item) => {
    const product = item.product;
    let itemPrice = product.price;
    
    if (product.discount) {
      itemPrice = itemPrice * (1 - product.discount / 100);
    }
    
    if (product.type === 'subscription' && item.options.months) {
      itemPrice = itemPrice * item.options.months;
    }
    
    if ((product.type === 'steam' || product.type === 'game_currency') && item.options.amount) {
      itemPrice = item.options.amount;
    }
    
    return itemPrice * item.quantity;
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.userInfo}>
            {user.photoUrl && (
              <img
                src={user.photoUrl}
                alt={user.username}
                className={styles.avatar}
              />
            )}
            <div className={styles.userDetails}>
              <span className={styles.username}>
                {user.firstName} {user.lastName}
              </span>
              {user.username && (
                <span className={styles.userHandle}>@{user.username}</span>
              )}
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.divider} />

        <div className={styles.cartContent}>
          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Корзина пуста</p>
            </div>
          ) : (
            <>
              <div className={styles.cartItems}>
                {cart.map((item, index) => {
                  const product = item.product;
                  const itemTotal = getItemPrice(item);

                  return (
                    <div key={index} className={styles.cartItem}>
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{product.name}</span>
                        {product.type === 'subscription' && item.options.months && (
                          <span className={styles.itemDuration}>
                            {item.options.months}{' '}
                            {item.options.months === 1
                              ? 'месяц'
                              : item.options.months < 5
                              ? 'месяца'
                              : 'месяцев'}
                          </span>
                        )}
                      </div>
                      <div className={styles.itemControls}>
                        <div className={styles.quantityControls}>
                          <button
                            className={styles.quantityButton}
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.options,
                                item.quantity - 1
                              )
                            }
                          >
                            −
                          </button>
                          <span className={styles.quantity}>{item.quantity}</span>
                          <button
                            className={styles.quantityButton}
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.options,
                                item.quantity + 1
                              )
                            }
                          >
                            +
                          </button>
                        </div>
                        <span className={styles.itemTotal}>
                          {Math.round(itemTotal)} ₽
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.divider} />

              <div className={styles.cartFooter}>
                <div className={styles.totalSection}>
                  <span className={styles.totalLabel}>Итого:</span>
                  <span className={styles.totalAmount}>
                    {Math.round(total)} ₽
                  </span>
                </div>
                <button
                  className={styles.clearButton}
                  onClick={handleClearCart}
                >
                  Очистить корзину
                </button>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.checkoutButtonContainer}>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Перейти к оплате
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;

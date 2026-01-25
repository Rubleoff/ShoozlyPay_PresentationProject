/**
 * Утилиты для работы с корзиной в localStorage
 */

const CART_STORAGE_KEY = 'shoozlypay_cart';

/**
 * Получить корзину из localStorage
 */
export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

/**
 * Сохранить корзину в localStorage
 */
export const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

/**
 * Добавить товар в корзину
 */
export const addToCart = (product, options = {}) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (item) => item.productId === product.id && 
    JSON.stringify(item.options) === JSON.stringify(options)
  );

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      productId: product.id,
      product: product,
      options: options,
      quantity: 1,
    });
  }

  saveCart(cart);
  return cart;
};

/**
 * Обновить количество товара в корзине
 */
export const updateCartItemQuantity = (productId, options, quantity) => {
  const cart = getCart();
  const itemIndex = cart.findIndex(
    (item) => item.productId === productId && 
    JSON.stringify(item.options) === JSON.stringify(options)
  );

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
  }

  saveCart(cart);
  return cart;
};

/**
 * Удалить товар из корзины
 */
export const removeFromCart = (productId, options) => {
  const cart = getCart();
  const filteredCart = cart.filter(
    (item) => !(item.productId === productId && 
    JSON.stringify(item.options) === JSON.stringify(options))
  );
  saveCart(filteredCart);
  return filteredCart;
};

/**
 * Очистить корзину
 */
export const clearCart = () => {
  localStorage.removeItem(CART_STORAGE_KEY);
  return [];
};

/**
 * Вычислить общую сумму корзины
 */
export const calculateCartTotal = (cart, products) => {
  return cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId) || item.product;
    if (!product) return total;
    
    let itemPrice = product.price;
    
    // Применяем скидку если есть
    if (product.discount) {
      itemPrice = itemPrice * (1 - product.discount / 100);
    }
    
    // Для подписок умножаем на количество месяцев
    if (product.type === 'subscription' && item.options.months) {
      itemPrice = itemPrice * item.options.months;
    }
    
    // Для Steam и игровой валюты используем выбранную сумму
    if ((product.type === 'steam' || product.type === 'game_currency') && item.options.amount) {
      itemPrice = item.options.amount;
    }
    
    return total + (itemPrice * item.quantity);
  }, 0);
};

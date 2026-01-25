/**
 * Заготовки для API запросов к бэкенду
 * В реальном приложении здесь будут настоящие запросы
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Получить все категории
 */
export const fetchCategories = async () => {
  // TODO: Заменить на реальный запрос
  // const response = await fetch(`${API_BASE_URL}/categories`);
  // return response.json();
  
  // Заглушка для разработки
  return [
    { id: 1, name: 'Стриминги', icon: '📺' },
    { id: 2, name: 'Онлайн-кинотеатры', icon: '🎬' },
    { id: 3, name: 'Внутриигровые покупки', icon: '🎮' },
    { id: 4, name: 'Steam', icon: '💻' },
    { id: 5, name: 'ROZETKA VPN', icon: '🔒' },
    { id: 6, name: 'Иностранные сервисы', icon: '🌐' },
  ];
};

/**
 * Получить все товары
 */
export const fetchProducts = async () => {
  // TODO: Заменить на реальный запрос
  // const response = await fetch(`${API_BASE_URL}/products`);
  // return response.json();
  
  // Заглушка для разработки
  return [
    {
      id: 1,
      name: 'Netflix Premium',
      categoryId: 1,
      type: 'subscription',
      price: 999,
      image: 'https://via.placeholder.com/300',
      description: 'Подписка на Netflix Premium',
      discount: 0,
    },
    {
      id: 2,
      name: 'Spotify Premium',
      categoryId: 1,
      type: 'subscription',
      price: 299,
      image: 'https://via.placeholder.com/300',
      description: 'Подписка на Spotify Premium',
      discount: 10,
    },
    {
      id: 3,
      name: 'Steam Wallet',
      categoryId: 4,
      type: 'steam',
      price: 0, // Цена будет вводиться пользователем
      image: 'https://via.placeholder.com/300',
      description: 'Пополнение Steam кошелька',
      discount: 0,
    },
    {
      id: 4,
      name: 'ROZETKA VPN - Месяц',
      categoryId: 5,
      type: 'subscription',
      price: 199,
      image: 'https://via.placeholder.com/300',
      description: 'VPN подписка на 1 месяц',
      discount: 0,
    },
    {
      id: 5,
      name: 'ROZETKA VPN - Полгода',
      categoryId: 5,
      type: 'subscription',
      price: 999,
      image: 'https://via.placeholder.com/300',
      description: 'VPN подписка на 6 месяцев',
      discount: 15,
    },
    {
      id: 6,
      name: 'ROZETKA VPN - Год',
      categoryId: 5,
      type: 'subscription',
      price: 1799,
      image: 'https://via.placeholder.com/300',
      description: 'VPN подписка на 12 месяцев',
      discount: 25,
    },
  ];
};

/**
 * Создать категорию (админ)
 */
export const createCategory = async (categoryData) => {
  // TODO: Заменить на реальный запрос
  // const response = await fetch(`${API_BASE_URL}/categories`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(categoryData),
  // });
  // return response.json();
  
  console.log('Creating category:', categoryData);
  return { success: true, id: Date.now() };
};

/**
 * Обновить категорию (админ)
 */
export const updateCategory = async (id, categoryData) => {
  // TODO: Заменить на реальный запрос
  console.log('Updating category:', id, categoryData);
  return { success: true };
};

/**
 * Удалить категорию (админ)
 */
export const deleteCategory = async (id) => {
  // TODO: Заменить на реальный запрос
  console.log('Deleting category:', id);
  return { success: true };
};

/**
 * Создать товар (админ)
 */
export const createProduct = async (productData) => {
  // TODO: Заменить на реальный запрос
  console.log('Creating product:', productData);
  return { success: true, id: Date.now() };
};

/**
 * Обновить товар (админ)
 */
export const updateProduct = async (id, productData) => {
  // TODO: Заменить на реальный запрос
  console.log('Updating product:', id, productData);
  return { success: true };
};

/**
 * Удалить товар (админ)
 */
export const deleteProduct = async (id) => {
  // TODO: Заменить на реальный запрос
  console.log('Deleting product:', id);
  return { success: true };
};

/**
 * Создать платеж через YooMoney
 */
export const createPayment = async (cartData, totalAmount) => {
  // TODO: Заменить на реальный запрос
  // const response = await fetch(`${API_BASE_URL}/payment/create`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ cart: cartData, amount: totalAmount }),
  // });
  // return response.json();
  
  console.log('Creating payment:', { cart: cartData, amount: totalAmount });
  // В реальном приложении здесь будет редирект на YooMoney
  return { 
    success: true, 
    paymentUrl: 'https://yoomoney.ru/checkout/payments/v2/contract?orderId=test' 
  };
};

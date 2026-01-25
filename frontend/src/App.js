import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { fetchProducts } from './api/api';
import HomePage from './pages/HomePage/HomePage';
import AdminPage from './pages/AdminPage/AdminPage';
import './App.css';

/**
 * Главный компонент приложения
 * Настраивает роутинг и провайдер корзины
 */
function App() {
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Загружаем товары для контекста корзины
  useEffect(() => {
    const loadProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };
    loadProducts();
  }, []);

  // Проверка админ режима (в реальном приложении через бэкенд)
  useEffect(() => {
    // Для демо можно добавить параметр в URL: ?admin=true
    const urlParams = new URLSearchParams(window.location.search);
    setIsAdmin(urlParams.get('admin') === 'true');
  }, []);

  return (
    <Router>
      <CartProvider products={products}>
        <div className="App">
          {/* Навигация для переключения между страницами (для разработки) */}
          {process.env.NODE_ENV === 'development' && (
            <nav className="dev-nav">
              <Link to="/">Главная</Link>
              <Link to="/admin">Админ панель</Link>
            </nav>
          )}
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;

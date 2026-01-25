import React, { useState, useEffect } from 'react';
import CategoryCarousel from '../../components/CategoryCarousel/CategoryCarousel';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import ProductModal from '../../components/ProductModal/ProductModal';
import CartButton from '../../components/CartButton/CartButton';
import CartModal from '../../components/CartModal/CartModal';
import { useCart } from '../../contexts/CartContext';
import { fetchCategories, fetchProducts } from '../../api/api';
import styles from './HomePage.module.css';

/**
 * Главная страница приложения
 * Отображает карусель категорий, витрину товаров и корзину
 */
const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const { setIsCartOpen, isCartOpen } = useCart();

  // Загружаем категории и товары
  useEffect(() => {
    const loadData = async () => {
      const [categoriesData, productsData] = await Promise.all([
        fetchCategories(),
        fetchProducts(),
      ]);
      setCategories(categoriesData);
      setProducts(productsData);
    };
    loadData();
  }, []);

  // Фильтруем товары по выбранной категории
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : products;

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className={styles.homePage}>
      <CategoryCarousel
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      <div className={styles.content}>
        <ProductGrid
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
      </div>

      <CartButton onClick={() => setIsCartOpen(true)} />

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
      />

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default HomePage;

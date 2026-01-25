import React, { useState, useEffect } from 'react';
import AdminPanel from '../../components/AdminPanel/AdminPanel';
import {
  fetchCategories,
  fetchProducts,
  createCategory,
  updateCategory,
  deleteCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../api/api';
import styles from './AdminPage.module.css';

/**
 * Страница админ панели
 * Управление категориями и товарами
 */
const AdminPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Загружаем данные при монтировании
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

  // Обработчики для категорий
  const handleCategoryCreate = async (data) => {
    const result = await createCategory(data);
    if (result.success) {
      const newCategory = { ...data, id: result.id };
      setCategories([...categories, newCategory]);
    }
  };

  const handleCategoryUpdate = async (id, data) => {
    const result = await updateCategory(id, data);
    if (result.success) {
      setCategories(
        categories.map((cat) => (cat.id === id ? { ...cat, ...data } : cat))
      );
    }
  };

  const handleCategoryDelete = async (id) => {
    const result = await deleteCategory(id);
    if (result.success) {
      setCategories(categories.filter((cat) => cat.id !== id));
      // Также удаляем товары этой категории
      setProducts(products.filter((p) => p.categoryId !== id));
    }
  };

  // Обработчики для товаров
  const handleProductCreate = async (data) => {
    const result = await createProduct(data);
    if (result.success) {
      const newProduct = { ...data, id: result.id };
      setProducts([...products, newProduct]);
    }
  };

  const handleProductUpdate = async (id, data) => {
    const result = await updateProduct(id, data);
    if (result.success) {
      setProducts(
        products.map((prod) => (prod.id === id ? { ...prod, ...data } : prod))
      );
    }
  };

  const handleProductDelete = async (id) => {
    const result = await deleteProduct(id);
    if (result.success) {
      setProducts(products.filter((prod) => prod.id !== id));
    }
  };

  return (
    <div className={styles.adminPage}>
      <AdminPanel
        categories={categories}
        products={products}
        onCategoryCreate={handleCategoryCreate}
        onCategoryUpdate={handleCategoryUpdate}
        onCategoryDelete={handleCategoryDelete}
        onProductCreate={handleProductCreate}
        onProductUpdate={handleProductUpdate}
        onProductDelete={handleProductDelete}
      />
    </div>
  );
};

export default AdminPage;

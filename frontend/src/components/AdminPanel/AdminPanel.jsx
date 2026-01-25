import React, { useState } from 'react';
import CategoryForm from './CategoryForm';
import ProductForm from './ProductForm';
import styles from './AdminPanel.module.css';

/**
 * Админ панель для управления категориями и товарами
 * Содержит формы для создания, редактирования и удаления
 */
const AdminPanel = ({ categories, products, onCategoryCreate, onCategoryUpdate, onCategoryDelete, onProductCreate, onProductUpdate, onProductDelete }) => {
  const [activeTab, setActiveTab] = useState('categories');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleCategoryEdit = (category) => {
    setEditingCategory(category);
    setActiveTab('categories');
  };

  const handleCategoryDelete = (id) => {
    if (window.confirm('Удалить категорию?')) {
      onCategoryDelete(id);
    }
  };

  const handleProductEdit = (product) => {
    setEditingProduct(product);
    setActiveTab('products');
  };

  const handleProductDelete = (id) => {
    if (window.confirm('Удалить товар?')) {
      onProductDelete(id);
    }
  };

  const handleCategorySubmit = (data) => {
    if (editingCategory) {
      onCategoryUpdate(editingCategory.id, data);
      setEditingCategory(null);
    } else {
      onCategoryCreate(data);
    }
  };

  const handleProductSubmit = (data) => {
    if (editingProduct) {
      onProductUpdate(editingProduct.id, data);
      setEditingProduct(null);
    } else {
      onProductCreate(data);
    }
  };

  return (
    <div className={styles.adminPanel}>
      <h1 className={styles.title}>Админ панель</h1>
      
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'categories' ? styles.active : ''}`}
          onClick={() => {
            setActiveTab('categories');
            setEditingCategory(null);
          }}
        >
          Категории
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'products' ? styles.active : ''}`}
          onClick={() => {
            setActiveTab('products');
            setEditingProduct(null);
          }}
        >
          Товары
        </button>
      </div>

      {activeTab === 'categories' && (
        <div className={styles.tabContent}>
          <CategoryForm
            category={editingCategory}
            onSubmit={handleCategorySubmit}
            onCancel={() => setEditingCategory(null)}
          />
          
          <div className={styles.list}>
            <h2 className={styles.listTitle}>Список категорий</h2>
            {categories.map((category) => (
              <div key={category.id} className={styles.listItem}>
                <div className={styles.listItemInfo}>
                  <span className={styles.listItemIcon}>{category.icon}</span>
                  <span className={styles.listItemName}>{category.name}</span>
                </div>
                <div className={styles.listItemActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleCategoryEdit(category)}
                  >
                    Редактировать
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleCategoryDelete(category.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className={styles.tabContent}>
          <ProductForm
            product={editingProduct}
            categories={categories}
            onSubmit={handleProductSubmit}
            onCancel={() => setEditingProduct(null)}
          />
          
          <div className={styles.list}>
            <h2 className={styles.listTitle}>Список товаров</h2>
            {products.map((product) => (
              <div key={product.id} className={styles.listItem}>
                <div className={styles.listItemInfo}>
                  <img
                    src={product.image || 'https://via.placeholder.com/50'}
                    alt={product.name}
                    className={styles.listItemImage}
                  />
                  <div className={styles.listItemDetails}>
                    <span className={styles.listItemName}>{product.name}</span>
                    <span className={styles.listItemPrice}>
                      {product.price} ₽
                      {product.discount > 0 && (
                        <span className={styles.discount}> -{product.discount}%</span>
                      )}
                    </span>
                  </div>
                </div>
                <div className={styles.listItemActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleProductEdit(product)}
                  >
                    Редактировать
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleProductDelete(product.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

import React, { useState, useEffect } from 'react';
import styles from './ProductForm.module.css';

/**
 * Форма для создания/редактирования товара
 * Включает загрузку фото, настройку опций, категорию, цену и скидку
 */
const ProductForm = ({ product, categories, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [type, setType] = useState('subscription');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setDescription(product.description || '');
      setCategoryId(product.categoryId || '');
      setType(product.type || 'subscription');
      setPrice(product.price || '');
      setDiscount(product.discount || '');
      setImage(product.image || '');
    } else {
      setName('');
      setDescription('');
      setCategoryId('');
      setType('subscription');
      setPrice('');
      setDiscount('');
      setImage('');
    }
  }, [product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // В реальном приложении здесь будет загрузка на сервер
      // Для демо используем FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !categoryId || !price) {
      alert('Заполните все обязательные поля');
      return;
    }
    
    const productData = {
      name: name.trim(),
      description: description.trim(),
      categoryId: parseInt(categoryId),
      type,
      price: parseFloat(price),
      discount: discount ? parseFloat(discount) : 0,
      image: image || 'https://via.placeholder.com/300',
    };

    onSubmit(productData);
    
    if (!product) {
      setName('');
      setDescription('');
      setCategoryId('');
      setType('subscription');
      setPrice('');
      setDiscount('');
      setImage('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>
        {product ? 'Редактировать товар' : 'Создать товар'}
      </h2>

      <div className={styles.formGroup}>
        <label className={styles.label}>Название товара:</label>
        <input
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите название"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Описание:</label>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите описание"
          rows="3"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Категория:</label>
        <select
          className={styles.select}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Выберите категорию</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Тип товара:</label>
        <select
          className={styles.select}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="subscription">Подписка</option>
          <option value="steam">Steam пополнение</option>
          <option value="game_currency">Игровая валюта</option>
          <option value="service">Услуга</option>
        </select>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Цена (₽):</label>
          <input
            type="number"
            className={styles.input}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Скидка (%):</label>
          <input
            type="number"
            className={styles.input}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="0"
            min="0"
            max="100"
            step="1"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Фото товара:</label>
        <input
          type="file"
          className={styles.fileInput}
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && (
          <img src={image} alt="Preview" className={styles.imagePreview} />
        )}
        <input
          type="text"
          className={styles.input}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Или введите URL изображения"
        />
      </div>

      <div className={styles.formActions}>
        {product && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Отмена
          </button>
        )}
        <button type="submit" className={styles.submitButton}>
          {product ? 'Сохранить' : 'Создать'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

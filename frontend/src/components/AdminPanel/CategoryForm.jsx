import React, { useState, useEffect } from 'react';
import styles from './CategoryForm.module.css';

/**
 * Форма для создания/редактирования категории
 */
const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('📦');

  useEffect(() => {
    if (category) {
      setName(category.name || '');
      setIcon(category.icon || '📦');
    } else {
      setName('');
      setIcon('📦');
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Введите название категории');
      return;
    }
    onSubmit({ name: name.trim(), icon });
    if (!category) {
      setName('');
      setIcon('📦');
    }
  };

  const commonIcons = ['📺', '🎬', '🎮', '💻', '🔒', '🌐', '📦', '🎵', '📱', '💳'];

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>
        {category ? 'Редактировать категорию' : 'Создать категорию'}
      </h2>
      
      <div className={styles.formGroup}>
        <label className={styles.label}>Название категории:</label>
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
        <label className={styles.label}>Иконка:</label>
        <div className={styles.iconSelector}>
          {commonIcons.map((ic) => (
            <button
              key={ic}
              type="button"
              className={`${styles.iconButton} ${icon === ic ? styles.active : ''}`}
              onClick={() => setIcon(ic)}
            >
              {ic}
            </button>
          ))}
        </div>
        <input
          type="text"
          className={styles.input}
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="Или введите эмодзи"
          maxLength="2"
        />
      </div>

      <div className={styles.formActions}>
        {category && (
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Отмена
          </button>
        )}
        <button type="submit" className={styles.submitButton}>
          {category ? 'Сохранить' : 'Создать'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;

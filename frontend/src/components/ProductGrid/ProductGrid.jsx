import React from 'react';
import styles from './ProductGrid.module.css';

/**
 * Сетка товаров (витрина)
 * Отображает товары в виде плиток
 */
const ProductGrid = ({ products, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>Товары не найдены</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => {
        const finalPrice = product.discount
          ? product.price * (1 - product.discount / 100)
          : product.price;

        return (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => onProductClick(product)}
          >
            <div className={styles.imageContainer}>
              <img
                src={product.image || 'https://via.placeholder.com/300'}
                alt={product.name}
                className={styles.productImage}
              />
              {product.discount > 0 && (
                <div className={styles.discountBadge}>
                  -{product.discount}%
                </div>
              )}
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.priceContainer}>
                {product.discount > 0 && (
                  <span className={styles.oldPrice}>{product.price} ₽</span>
                )}
                <span className={styles.price}>
                  {product.type === 'steam' ? 'от ' : ''}
                  {Math.round(finalPrice)} ₽
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;

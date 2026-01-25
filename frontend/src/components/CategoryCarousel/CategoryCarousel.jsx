import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './CategoryCarousel.module.css';

/**
 * Карусель категорий товаров
 * Использует библиотеку Swiper для прокрутки категорий
 */
const CategoryCarousel = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView="auto"
        navigation
        pagination={{ clickable: true }}
        className={styles.swiper}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id} className={styles.slide}>
            <button
              className={`${styles.categoryButton} ${
                selectedCategory === category.id ? styles.active : ''
              }`}
              onClick={() => onCategorySelect(category.id)}
            >
              <span className={styles.categoryIcon}>{category.icon || '📦'}</span>
              <span className={styles.categoryName}>{category.name}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryCarousel;

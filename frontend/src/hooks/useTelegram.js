import { useState, useEffect } from 'react';

/**
 * Хук для работы с Telegram WebApp API
 * Получает данные пользователя из Telegram (аватар, юзернейм)
 */
export const useTelegram = () => {
  const [user, setUser] = useState({
    id: null,
    firstName: '',
    lastName: '',
    username: '',
    photoUrl: '',
  });

  useEffect(() => {
    // Проверяем, запущено ли приложение в Telegram
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      
      const initData = tg.initDataUnsafe?.user;
      if (initData) {
        setUser({
          id: initData.id,
          firstName: initData.first_name || '',
          lastName: initData.last_name || '',
          username: initData.username || '',
          photoUrl: initData.photo_url || '',
        });
      } else {
        // Заглушка для разработки вне Telegram
        setUser({
          id: 123456789,
          firstName: 'Test',
          lastName: 'User',
          username: 'testuser',
          photoUrl: '',
        });
      }
    } else {
      // Заглушка для разработки вне Telegram
      setUser({
        id: 123456789,
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
        photoUrl: '',
      });
    }
  }, []);

  return user;
};

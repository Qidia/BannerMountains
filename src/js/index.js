document.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".banner");
  const slider = document.querySelector(".slider");

  const imgMountains = document.querySelector(".imgMountains");
  const shiftImageMountains = document.querySelector(".shiftImageMountains");
  const shiftBannerMountains = document.querySelector(".shiftBannerMountains");

  let isDragging = false; // Переменная состояния для отслеживания активности перетаскивания
  let sliderPositionPercentage = 32; // Начальная позиция слайдера в процентах

  /**
   * Функция для обновления положения слайдера и установки значений clip-path в зависимости от текущей позиции слайдера.
   */
  function updateClipPaths() {
    const bannerPosition = banner.getBoundingClientRect(); // Получаем размеры и положение баннера
    const sliderWidth = slider.offsetWidth; // Получаем ширину слайдера

    // Расчет смещения от центра слайдера в процентах относительно ширины баннера
    const offsetPercentage = ((sliderWidth / 2) * 100) / bannerPosition.width;
    slider.style.left = `${sliderPositionPercentage}%`;

    // Устанавливаем значения clip-path для изображений в зависимости от положения слайдера
    imgMountains.style.clipPath = `inset(0 ${
      100 - sliderPositionPercentage - offsetPercentage
    }% 0 0)`;
    shiftImageMountains.style.clipPath = `inset(0 0 0 ${
      sliderPositionPercentage + offsetPercentage
    }%)`;
    shiftBannerMountains.style.clipPath = `inset(0 0 0 ${
      sliderPositionPercentage + offsetPercentage
    }%)`;
  }

  // Включение перетаскивания при нажатии мыши на слайдере
  slider.addEventListener("mousedown", (event) => {
    isDragging = true;
    event.currentTarget.style.cursor = "grabbing";
  });

  // Обработчик для перемещения слайдера при движении мыши
  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const bannerPosition = banner.getBoundingClientRect(); // Обновляем размеры баннера
      const sliderWidth = slider.offsetWidth; // Обновляем ширину слайдера

      let newLeft = event.clientX - bannerPosition.left - sliderWidth / 2; // Рассчитываем новую позицию слайдера относительно баннера
      // Ограничиваем положение слайдера внутри границ баннера
      newLeft = Math.max(
        -sliderWidth / 2,
        Math.min(newLeft, bannerPosition.width - sliderWidth / 2)
      );
      sliderPositionPercentage = (newLeft / bannerPosition.width) * 100; // Конвертируем новую позицию в проценты

      requestAnimationFrame(updateClipPaths); // Снижаем нагрузку на браузер (плавные обновления clip-path и позиции)
    }
  });

  // Завершение перетаскивания при отпускании мыши
  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      slider.style.cursor = "pointer";
    }
  });

  window.addEventListener("resize", updateClipPaths); // Обновление позиции слайдера и clip-path при изменении размеров окна
  updateClipPaths(); // Инициализируем слайдер и clip-path при загрузке
});

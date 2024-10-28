const banner = document.querySelector(".banner");
const slider = document.querySelector(".slider");

const imgMountains = document.querySelector(".imgMountains");
const shiftImageMountains = document.querySelector(".shiftImageMountains");
const shiftBannerMountains = document.querySelector(".shiftBannerMountains");

let isDragging = false;
let sliderPositionPercentage = 0;

slider.addEventListener("mousedown", (event) => {
  isDragging = true;
  event.currentTarget.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (event) => {
  if (isDragging) {
    const bannerPosition = banner.getBoundingClientRect();
    const sliderWidth = slider.offsetWidth;

    let newLeft = event.clientX - bannerPosition.left - sliderWidth / 2;

    if (newLeft < -sliderWidth / 2) newLeft = -sliderWidth / 2;
    if (newLeft > bannerPosition.width - sliderWidth + sliderWidth / 2)
      newLeft = bannerPosition.width - sliderWidth + sliderWidth / 2;

    sliderPositionPercentage = (newLeft / bannerPosition.width) * 100;
    slider.style.left = `${sliderPositionPercentage}%`;

    imgMountains.style.clipPath = `inset(0 ${
      100 -
      sliderPositionPercentage -
      ((sliderWidth / 2) * 100) / bannerPosition.width
    }% 0 0)`;
    shiftImageMountains.style.clipPath = `inset(0 0 0 ${
      sliderPositionPercentage + ((sliderWidth / 2) * 100) / bannerPosition.width
    }%)`;
    shiftBannerMountains.style.clipPath = `inset(0 0 0 ${
      sliderPositionPercentage + ((sliderWidth / 2) * 100) / bannerPosition.width
    }%)`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  slider.style.cursor = "pointer";
});

// Обновление позиции слайдера при изменении размеров окна
window.addEventListener("resize", () => {
  const bannerPosition = banner.getBoundingClientRect();

  // Пересчитываем позицию слайдера в пикселях на основе процента
  const newLeft = (sliderPositionPercentage / 100) * bannerPosition.width;
  slider.style.left = `${newLeft}px`;

  imgMountains.style.clipPath = `inset(0 ${
    100 -
    sliderPositionPercentage -
    ((sliderWidth / 2) * 100) / bannerPosition.width
  }% 0 0)`;
  shiftImageMountains.style.clipPath = `inset(0 0 0 ${
    sliderPositionPercentage + ((sliderWidth / 2) * 100) / bannerPosition.width
  }%)`;
  shiftBannerMountains.style.clipPath = `inset(0 0 0 ${
    sliderPositionPercentage + ((sliderWidth / 2) * 100) / bannerPosition.width
  }%)`;
});

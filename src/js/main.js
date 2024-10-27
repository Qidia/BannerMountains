const imgMountains = document.querySelector(".imgMountains");
const banner = document.querySelector(".banner");
const slider = document.querySelector(".slider");
let isDragging = false;
let sliderPositionPercentage = 0;

function getShiftImage() {
  imgMountains.classList.add("shiftImageMountains");
  banner.classList.add("shiftBannerMountains");
}

function getOriginalImage() {
  imgMountains.classList.remove("shiftImageMountains");
  banner.classList.remove("shiftBannerMountains");
}

banner.addEventListener("mouseover", (event) => {
  /*   console.log(event.target);
  console.log(event.currentTarget); */
  getShiftImage();
});

banner.addEventListener("mouseout", (event) => {
  getOriginalImage();
});

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
});

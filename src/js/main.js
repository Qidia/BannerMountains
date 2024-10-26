const imgMountains = document.querySelector(".imgMountains");
const banner = document.querySelector(".banner");

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

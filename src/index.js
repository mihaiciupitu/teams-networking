// Dark Theme
const icon = document.getElementById("icon");
const imgdark = document.querySelector(".image");
const logodark = document.querySelector(".logo");
const logo2dark = document.querySelector(".logo2");
const logo3dark = document.querySelector(".logo3");

icon.onclick = function () {
  document.body.classList.toggle("dark-theme");
  imgdark.classList.toggle("image-dark");
  logodark.classList.toggle("logo-dark");
  logo2dark.classList.toggle("logo-dark");
  logo3dark.classList.toggle("logo-dark");

  if (document.body.classList.contains("dark-theme")) {
    icon.src = "/src/images/sun.png";
  } else {
    icon.src = "/src/images/moon.png";
  }
};

document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookieBanner");
    const acceptButton = document.getElementById("acceptCookies");
    const rejectButton = document.getElementById("rejectCookies");

    // Check if cookies were accepted or rejected before
    if (localStorage.getItem("cookiesAccepted") || localStorage.getItem("cookiesRejected")) {
        cookieBanner.classList.add("hidden");
    }

    // Accept Cookies
    acceptButton.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.classList.add("hidden");
    });

    // Reject Cookies
    rejectButton.addEventListener("click", function () {
        localStorage.setItem("cookiesRejected", "true");
        cookieBanner.classList.add("hidden");
        alert("You have rejected cookies. Some features may not work properly.");
    });
});
const imageData = {
  RingDecor: [
    "images/birthday1.jpg",
    "images/birthday2.jpg"
  ],
  weddingEntris: [
    "images/wedding1.jpg",
    "images/wedding2.jpg"
  ],
  ThemeBirthdayDecor: [
    "images/theme1.jpg",
    "images/theme2.jpg"
  ],
  AnniversaryDecor: [
    "images/wedding1.jpg",
    "images/wedding2.jpg"
  ],
  RoomDecor: [
    "images/wedding1.jpg",
    "images/wedding2.jpg"
  ],
  RetirementDecor: [
    "images/wedding1.jpg",
    "images/wedding2.jpg"
  ],
  WelcomeDecor: [
    "images/wedding1.jpg",
    "images/wedding2.jpg"
  ],
  BabyShowerDecor: [
    "images/wedding1.jpg",
    "images/wedding2.jpg"
  ],
  terraceDecor: [
    "images/wedding1.jpg",
    "images/wedding2.jpg"
  ],
};

function openAlbum(category) {
  document.querySelector(".gallery").classList.add("hidden");
  document.getElementById("album-viewer").classList.remove("hidden");
  document.getElementById("album-title").innerText = category.charAt(0).toUpperCase() + category.slice(1) + " Decor";

  const imageList = document.getElementById("image-list");
  imageList.innerHTML = "";

  imageData[category].forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    imageList.appendChild(img);
  });
}
    




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
    
// 🔐 Basic password prompt (can improve later)
const password = prompt("Enter admin password:");
if (password !== "brilliantevents123") {
  alert("Unauthorized access.");
  window.location.href = "index.html"; // redirect if wrong
}  

const cloudName = "dasz8xina"; // change this
const uploadPresetBase = ""; // leave this blank

async function uploadImage() {
  const fileInput = document.getElementById("imageInput");
  const category = document.getElementById("categorySelect").value;
  const status = document.getElementById("statusMessage");

  if (!fileInput.files.length || !category) {
    status.innerText = "Please select category and image.";
    return;
  }

  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", category); // same as your unsigned preset name

  status.innerText = "Uploading...";

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.secure_url) {
      status.innerText = "✅ Upload successful!";
    } else {
      throw new Error(data.error?.message || "Unknown error");
    }
  } catch (err) {
    status.innerText = "❌ Error: " + err.message;
  }
}


  const pw = sessionStorage.getItem("admin_pw");
  if (pw === "brilliantevents123") {
    document.getElementById("adminTab").style.display = "inline-block";
  } else {
    const input = prompt("Enter Admin Password (optional):");
    if (input === "brilliantevents123") {
      sessionStorage.setItem("admin_pw", input);
      document.getElementById("adminTab").style.display = "inline-block";
    }
  }





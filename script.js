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

const cloudName = "dasz8xina"; 
const uploadPresets = {
  RingDecor_upload: "RingDecor_upload",
  weddingEntries_upload: "weddingEntries_upload",
  ThemeBirthdayDecor_upload: "ThemeBirthdayDecor_upload",
  terraceDecor_upload: "terraceDecor_upload"
};

document.getElementById("uploadForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const file = document.getElementById("imageUpload").files[0];
  const category = document.getElementById("category").value;
  const preset = uploadPresets[category];

  if (!file || !preset) {
    alert("Please select both an image and a category.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  document.getElementById("status").innerText = "Uploading...";

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.secure_url) {
      document.getElementById("status").innerText = "✅ Upload successful!";
      console.log("Image URL:", data.secure_url);
    } else {
      document.getElementById("status").innerText = "❌ Upload failed.";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("status").innerText = "❌ Upload failed.";
  }
});

<script>
  // Prompt for admin password
  const pw = prompt("Enter admin password (or leave blank to continue):");
  if (pw === "brilliantevents123") {
    document.getElementById("adminTab").style.display = "inline";
  }
</script>



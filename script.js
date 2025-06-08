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
    const cloudName = "dasz8xina"; 

    function uploadImage() {
      const fileInput = document.getElementById("imageUpload");
      const preset = document.getElementById("category").value;
      const status = document.getElementById("status");

      const file = fileInput.files[0];
      if (!file) {
        status.innerText = "Please select a file.";
        return;
      }

      status.innerText = "Uploading...";

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", preset);

      fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          if (data.secure_url) {
            status.innerHTML = `<span style="color:lightgreen">Uploaded Successfully!</span><br><a href="${data.secure_url}" target="_blank">View Image</a>`;
          } else {
            status.innerText = "Upload failed. Check Cloudinary config.";
          }
        })
        .catch(err => {
          status.innerText = "Upload failed.";
          console.error(err);
        });
    }
  

function goBack() {
  document.querySelector(".gallery").classList.remove("hidden");
  document.getElementById("album-viewer").classList.add("hidden");
}
const cloudName = "dasz8xina"; 
    const galleryDiv = document.getElementById("gallery");
    const noImagesMsg = document.getElementById("noImages");

    function loadGallery(folder) {
      galleryDiv.innerHTML = "Loading...";
      noImagesMsg.style.display = "none";

      fetch(`https://res.cloudinary.com/${cloudName}/image/list/${folder}.json`)
        .then(response => {
          if (!response.ok) throw new Error("No image list available.");
          return response.json();
        })
        .then(data => {
          galleryDiv.innerHTML = "";
          if (data.resources.length === 0) {
            noImagesMsg.style.display = "block";
            return;
          }

          data.resources.forEach(img => {
            const imgElem = document.createElement("img");
            imgElem.src = `https://res.cloudinary.com/${cloudName}/image/upload/${img.public_id}.jpg`;
            galleryDiv.appendChild(imgElem);
          });
        })
        .catch(err => {
          galleryDiv.innerHTML = "";
          noImagesMsg.style.display = "block";
        });
    }

    // Load default category on page load
    loadGallery('RingDecor');
  </script>

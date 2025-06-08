const CLOUD_NAME = "dasz8xina";
const UPLOAD_PRESET = "brilliant_preset";
const ADMIN_PASSWORD = "brilliantevents123";

function checkLogin() {
  const pass = document.getElementById("adminPass").value;
  if (pass === ADMIN_PASSWORD) {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("uploadBox").classList.remove("hidden");
  } else {
    alert("Incorrect password");
  }
}

function uploadImage() {
  const file = document.getElementById("fileInput").files[0];
  const folder = document.getElementById("category").value;
  const status = document.getElementById("status");

  if (!file) {
    alert("Please select a file");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", folder);

  status.innerText = "Uploading...";

  fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      status.innerText = "Upload successful!";
    })
    .catch(err => {
      console.error(err);
      status.innerText = "Upload failed.";
    });
}


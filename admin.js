// Optional basic admin access check
const password = prompt("Enter admin password:");
if (password !== "brilliantevents123") {
  alert("Unauthorized access.");
  window.location.href = "index.html"; // redirect to home
}

const cloudName = "dasz8xina"; 
const uploadPresets = {
  RingDecor_upload: "RingDecor_upload",
  weddingEntries_upload: "weddingEntries_upload",
  ThemeBirthdayDecor_upload: "ThemeBirthdayDecor_upload",
  AnniversaryDecor_upload: "AnniversaryDecor_upload",
  RoomDecor_upload: "RoomDecor_upload",
  RetirementDecor_upload: "RetirementDecor_upload",
  WelcomeDecor_upload: "WelcomeDecor_upload",
  BabyShowerDecor_upload: "BabyShowerDecor_upload",
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
      document.getElementById("status").innerText = "❌ Upload failed. Try again.";
    }
  } catch (error) {
    document.getElementById("status").innerText = "❌ Error uploading.";
    console.error(error);
  }
});

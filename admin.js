const form = document.getElementById("uploadForm");
const imageInput = document.getElementById("imageInput");
const folderSelect = document.getElementById("folderSelect");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = imageInput.files[0];
  const folder = folderSelect.value;

  if (!file || !folder) {
    statusMsg.textContent = "Please select an image and folder.";
    return;
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", folder);

  statusMsg.textContent = "Uploading...";

  try {
    const response = await fetch("https://brilliant-events-backend.onrender.com", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      statusMsg.textContent = "✅ Upload successful!";
    } else {
      statusMsg.textContent = "❌ Error: " + (result.message || "Upload failed.");
    }
  } catch (error) {
    statusMsg.textContent = "❌ Error uploading image.";
    console.error(error);
  }
});

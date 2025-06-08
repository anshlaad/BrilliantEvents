const cloudName = "daz8xina";
const uploadPreset = "brilliantevents123";
const githubToken = "YOUR_TOKEN_HERE"; // <- Replace this if needed
const githubUsername = "anshlaad";
const repoName = "BrilliantEvents";
const jsonFolderPath = "data";
const ADMIN_PASSWORD = "brilliantevents123";

// LOGIN
function checkLogin() {
  const enteredPassword = document.getElementById("adminPass").value;
  if (enteredPassword === ADMIN_PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("uploadBox").style.display = "block";
  } else {
    alert("Wrong password!");
  }
}

// IMAGE UPLOAD
document.getElementById("uploadForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Stop default form submission

  const file = document.getElementById("image").files[0];
  const category = document.getElementById("category").value;

  if (!file || !category) {
    alert("Please select a file and a category.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "brilliantevents123");
  formData.append("folder", category);

  const cloudRes = await fetch("https://api.cloudinary.com/v1_1/daz8xina/image/upload", {
    method: "POST",
    body: formData,
  });

  const cloudData = await cloudRes.json();

  if (!cloudData.secure_url) {
    alert("Upload failed!");
    return;
  }

  document.getElementById("status").textContent = "✅ Uploaded!";
});

  // Update GitHub JSON
  const jsonFile = `${jsonFolderPath}/${category}.json`;
  const getUrl = `https://api.github.com/repos/${githubUsername}/${repoName}/contents/${jsonFile}`;

  const fileRes = await fetch(getUrl, {
    headers: { Authorization: `Bearer ${githubToken}` },
  });

  let sha = "";
  let content = [];
  if (fileRes.ok) {
    const fileData = await fileRes.json();
    sha = fileData.sha;
    content = JSON.parse(atob(fileData.content));
  }

  content.push(imageUrl);

  const updatedContent = btoa(JSON.stringify(content, null, 2));

  await fetch(getUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${githubToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Add image to ${category}.json`,
      content: updatedContent,
      sha,
    }),
  });

  alert("✅ Image uploaded and JSON updated successfully!");
});

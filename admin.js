const cloudName = "daz8xina";
const uploadPreset = "brilliantevents123";
const githubToken = "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";
const githubUsername = "anshlaad";
const repoName = "BrilliantEvents";
const jsonFolderPath = "data";

document.getElementById("uploadForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const file = document.getElementById("image").files[0];
  const category = document.getElementById("category").value;
  const folder = category + "Decor";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  const cloudRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const cloudData = await cloudRes.json();
  const imageUrl = cloudData.secure_url;

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
      message: `Add new image to ${category}.json`,
      content: updatedContent,
      sha,
    }),
  });

  alert("Image uploaded and JSON updated successfully!");
});

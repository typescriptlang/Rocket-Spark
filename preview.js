document.getElementById('assetForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const assetId = document.getElementById('assetId').value.trim();
  const previewContainer = document.getElementById('previewContainer');
  const errorMsg = document.getElementById('errorMsg');

  // Clear previous content
  previewContainer.innerHTML = '';
  errorMsg.textContent = '';

  if (!assetId || isNaN(assetId)) {
    errorMsg.textContent = 'Please enter a valid numeric Asset ID.';
    return;
  }

  try {
    const response = await fetch(`https://thumbnails.roblox.com/v1/assets?assetIds=${assetId}&size=420x420&format=png&isCircular=false`);
    if (!response.ok) throw new Error('Network response was not ok.');

    const data = await response.json();
    if (!data.data || data.data.length === 0) {
      throw new Error('No data returned.');
    }

    const assetData = data.data[0];
    if (assetData.state !== 'Completed') {
      throw new Error('Thumbnail is not available yet.');
    }

    const imageUrl = assetData.imageUrl;
    if (!imageUrl) {
      throw new Error('No preview image found for this asset.');
    }

    // Create and show image
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `Preview of asset ${assetId}`;
    img.className = 'img-fluid border rounded';
    previewContainer.appendChild(img);

  } catch (error) {
    errorMsg.textContent = `Error loading preview: ${error.message}`;
  }
});

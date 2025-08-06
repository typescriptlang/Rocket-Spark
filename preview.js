document.getElementById('loadBtn').addEventListener('click', () => {
  const assetId = document.getElementById('assetId').value.trim();
  const previewDiv = document.getElementById('preview');
  const errorDiv = document.getElementById('error');
  
  previewDiv.innerHTML = '';
  errorDiv.textContent = '';

  if (!/^\d+$/.test(assetId)) {
    errorDiv.textContent = 'Please enter a valid numeric Asset ID.';
    return;
  }


  const imageUrl = `https://www.roblox.com/asset-thumbnail/image?assetId=${assetId}&width=420&height=420&format=png`;


  const img = new Image();
  img.src = imageUrl;
  img.alt = 'Roblox Clothing Preview';
  img.onload = () => {
    previewDiv.innerHTML = '';
    previewDiv.appendChild(img);
  };
  img.onerror = () => {
    previewDiv.innerHTML = '';
    errorDiv.textContent = 'Error loading preview. Check the asset ID or ensure it is public.';
  };
});

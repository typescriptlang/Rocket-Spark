const input = document.getElementById('assetId');
const button = document.getElementById('fetchBtn');
const preview = document.getElementById('preview');
const errorMsg = document.getElementById('errorMsg');

button.addEventListener('click', async () => {
  const assetId = input.value.trim();
  if (!assetId) {
    showError('Please enter an asset ID.');
    return;
  }

  clearError();
  preview.src = ''; // clear previous image
  preview.alt = 'Loading preview...';

  try {
    const response = await fetch(`https://tr.rbxcdn.com/${assetId}/768x432`);
    if (!response.ok) {
      throw new Error('Asset not found or is not public.');
    }
    const data = await response.json();

    if (!data || !data.imageUrl) {
      throw new Error('Invalid response from server.');
    }

    preview.src = data.imageUrl;
    preview.alt = `Preview for asset ${assetId}`;
  } catch (err) {
    showError(err.message || 'Failed to fetch preview.');
    preview.alt = 'No preview available';
  }
});

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.display = 'block';
}

function clearError() {
  errorMsg.textContent = '';
  errorMsg.style.display = 'none';
}

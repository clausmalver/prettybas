document.getElementById('copySelectedRoles').addEventListener('click', () => {
  copyFieldContent('_selectedRoles');
});

document.getElementById('copyInheritedRoles').addEventListener('click', () => {
  copyFieldContent('_inheritedRoles');
});

function copyFieldContent(fieldId) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'copyFieldContent',
      fieldId: fieldId
    }, function(response) {
      if (response && response.status === 'success') {
        showStatus('Indhold kopieret til udklipsholderen!');
      } else {
        showStatus('Kunne ikke kopiere indholdet');
      }
    });
  });
}

function showStatus(text) {
  const status = document.getElementById('copyStatus');
  status.textContent = text;
  status.style.display = 'block';
  setTimeout(() => {
    status.style.display = 'none';
  }, 3000);
} 
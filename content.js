// Function to change the size attribute of select elements and make them resizable
function changeSelectSize() {
  const selectIds = [
    '_inheritedRoles',
    '_selectedRoles',
    '_selectableRoles',
    '_existingRoles',
    '_ownerResults'
  ];
  
  selectIds.forEach(id => {
    const selectElement = document.getElementById(id);
    if (selectElement) {
      selectElement.setAttribute('size', '10');
      // Add CSS to make the select element resizable
      selectElement.style.resize = 'both';
      selectElement.style.overflow = 'auto';
      selectElement.style.minHeight = '150px'; // Set a minimum height to ensure it's always usable
    }
  });
}

// Function to check the checkbox
function checkCheckbox() {
  var checkboxElement = document.getElementById('_showInheritedRoles0'); // ID of the checkbox
  if (checkboxElement) {
    checkboxElement.checked = true;
  }
}

// Function to monitor name input field
function monitorNameInput() {
  const nameInput = document.getElementById('_name');
  if (nameInput) {
    // Add event listener for input changes
    nameInput.addEventListener('input', function() {
      if (this.value.length > 19) {
        this.style.backgroundColor = '#d80020'; // Dark red color
        this.style.borderColor = '#f44336'; // Red border
      } else {
        this.style.backgroundColor = ''; // Reset to default
        this.style.borderColor = ''; // Reset to default
      }
    });
  }
}

// Function to get text content from a select element
function getSelectElementText(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return '';
  
  // Get all options and extract just their text content
  const options = Array.from(element.options);
  return options.map(option => option.textContent.trim()).join('\n');
}

// Message listener for copying field content
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'copyFieldContent') {
    const textToCopy = getSelectElementText(message.fieldId);
    
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    
    try {
      // Select and copy the text
      textarea.select();
      document.execCommand('copy');
      sendResponse({status: 'success'});
    } catch (err) {
      console.error('Failed to copy text: ', err);
      sendResponse({status: 'error'});
    } finally {
      // Clean up
      document.body.removeChild(textarea);
    }
    
    return true; // Keep the message channel open for the async response
  }
});

// Run the functions when the page is fully loaded
window.addEventListener('load', function() {
  checkCheckbox();
  changeSelectSize();
  monitorNameInput();

  // Use MutationObserver to check for dynamic changes to the DOM
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      checkCheckbox();
      changeSelectSize();
    });
  });

  // Start observing the document for changes in the subtree where the select elements reside
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});

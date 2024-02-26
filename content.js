// Function to change the size attribute of the select element
function changeSelectSize() {
  var selectElement = document.getElementById('_inheritedRoles'); // ID of the select element
  if (selectElement) {
    selectElement.setAttribute('size', '15');
  }
}

// Function to check the checkbox
function checkCheckbox() {
  var checkboxElement = document.getElementById('_showInheritedRoles0'); // ID of the checkbox
  if (checkboxElement) {
    checkboxElement.checked = true;
  }
}

// Run the functions when the page is fully loaded
window.addEventListener('load', function() {
  checkCheckbox();
  changeSelectSize();

  // Use MutationObserver to check for dynamic changes to the DOM
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      checkCheckbox();
      changeSelectSize();
    });
  });

  // Start observing the document for changes in the subtree where the select element resides
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});

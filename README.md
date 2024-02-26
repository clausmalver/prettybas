# PrettyBAS 

### An extension for the Chromium Engine
This JavaScript code snippet provides a fix for a viewing problem in the NetIQ IAM (Identity Access Management) system. When included in the NetIQ IAM system's pages, automatically set a checkmark in 'checkCheckbox()' and change the default size of 'inheritedRoles' to 15 instead of 5.

These functions are executed when the page is fully loaded to apply the fix during NetIQ IAM system page rendering, and a MutationObserver is utilized to monitor and reapply these fixes upon dynamic changes to the DOM.

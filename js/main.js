// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const trigger = document.activeElement; // Store the element that opened the modal
    
    modal.style.display = "block";
    
    // Store the trigger element for later focus restoration
    modal.setAttribute('data-trigger', trigger.outerHTML);
    
    // Find all focusable elements in modal
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    // Focus the first focusable element (usually close button)
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
    
    // Handle tab key navigation
    function handleTabKey(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault();
                    lastFocusableElement.focus();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    }
    
    // Add event listener for tab key
    modal.addEventListener('keydown', handleTabKey);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
    
    // Restore focus to the trigger element
    const triggerHTML = modal.getAttribute('data-trigger');
    if (triggerHTML) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = triggerHTML;
        const trigger = tempDiv.firstElementChild;
        const originalTrigger = document.querySelector(`[data-modal="${modalId}"]`);
        if (originalTrigger) {
            originalTrigger.focus();
        }
    }
    
    // Remove the tab key event listener
    modal.removeEventListener('keydown', handleTabKey);
}

// Initialize modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to all brief links
    document.querySelectorAll('.brief-link').forEach(link => {
        link.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
        
        // Make brief links keyboard focusable
        link.setAttribute('tabindex', '0');
        link.setAttribute('role', 'button');
        
        // Handle keyboard enter key
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const modalId = this.getAttribute('data-modal');
                openModal(modalId);
            }
        });
    });

    // Add click listeners to all close buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
        
        // Ensure close button is keyboard focusable
        button.setAttribute('tabindex', '0');
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        
        // Restore focus when clicking outside
        const modalId = event.target.id;
        const originalTrigger = document.querySelector(`[data-modal="${modalId}"]`);
        if (originalTrigger) {
            originalTrigger.focus();
        }
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const modals = document.getElementsByClassName('modal');
        for (let modal of modals) {
            if (modal.style.display === "block") {
                closeModal(modal.id);
            }
        }
    }
});

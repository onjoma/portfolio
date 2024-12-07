// Modal functionality
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Initialize modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add click listeners to all brief links
    document.querySelectorAll('.brief-link').forEach(link => {
        link.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Add click listeners to all close buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const modals = document.getElementsByClassName('modal');
        for (let modal of modals) {
            modal.style.display = "none";
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Load the footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
            // Set the copyright year
            document.getElementById('copyright-year').textContent = new Date().getFullYear();
        })
        .catch(error => console.error('Error loading footer:', error));
});

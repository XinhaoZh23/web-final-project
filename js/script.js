document.addEventListener('DOMContentLoaded', function () {
    // Select all links with hashes
    const links = document.querySelectorAll('a[href*="#"]');

    for (const link of links) {
        link.addEventListener('click', function (e) {
            // Prevent default anchor click behavior
            e.preventDefault();

            // Store hash
            const hash = this.hash;

            // Check if the element with the hash exists
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                // Smooth scroll to the element
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});

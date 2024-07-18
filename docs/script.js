document.addEventListener("DOMContentLoaded", function() {
    const pages = [
        "python_intro", 
        "python_get_started", 
        "python_syntax", 
        "python_comments"
        // Add more page names here
    ];

    const content = document.getElementById("content");
    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");

    // Function to load content
    function loadContent(page) {
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
                updateNavigationButtons(page);
            })
            .catch(error => content.innerHTML = "<p>Page not found.</p>");
    }

    // Update the navigation buttons based on the current page
    function updateNavigationButtons(currentPage) {
        const currentIndex = pages.indexOf(currentPage);
        const prevButton = document.getElementById("prev-button");
        const nextButton = document.getElementById("next-button");

        if (currentIndex > 0) {
            prevButton.style.display = "block";
            prevButton.onclick = () => loadContent(pages[currentIndex - 1]);
        } else {
            prevButton.style.display = "none";
        }

        if (currentIndex < pages.length - 1) {
            nextButton.style.display = "block";
            nextButton.onclick = () => loadContent(pages[currentIndex + 1]);
        } else {
            nextButton.style.display = "none";
        }
    }

    // Add click event listeners to sidebar links
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const page = this.getAttribute("href").split("/").pop().replace(".html", "");
            loadContent(page);
        });
    });

    // Load the initial page if any, or default to the first page
    const initialPage = window.location.pathname.split("/").pop().replace(".html", "") || "python_intro";
    loadContent(initialPage);
});

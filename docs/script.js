document.addEventListener("DOMContentLoaded", function() {
    const pages = [
        "python_intro", 
        "python_get_started", 
        "python_syntax", 
        "python_comments"
        // Add more page names here
    ];

    const content = document.getElementById("content");
    const page = window.location.pathname.split("/").pop().replace(".html", "");

    if (page && page !== "index") {
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(html => content.innerHTML = html)
            .catch(error => content.innerHTML = "<p>Page not found.</p>");
    }

    const currentIndex = pages.indexOf(page);
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");

    if (currentIndex > 0) {
        prevButton.style.display = "block";
        prevButton.onclick = () => {
            window.location.href = `pages/${pages[currentIndex - 1]}.html`;
        };
    } else {
        prevButton.style.display = "none";
    }

    if (currentIndex < pages.length - 1) {
        nextButton.style.display = "block";
        nextButton.onclick = () => {
            window.location.href = `pages/${pages[currentIndex + 1]}.html`;
        };
    } else {
        nextButton.style.display = "none";
    }
});

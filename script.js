document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookieBanner");
    const acceptButton = document.getElementById("acceptCookies");

    // Check if cookies were already accepted
    if (localStorage.getItem("cookiesAccepted")) {
        cookieBanner.classList.add("hidden");
    }

    // Accept cookies and hide banner
    acceptButton.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.classList.add("hidden");
    });
});

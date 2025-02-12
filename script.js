document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookieBanner");
    const acceptButton = document.getElementById("acceptCookies");
    const rejectButton = document.getElementById("rejectCookies");

    // Check if cookies were accepted or rejected before
    if (localStorage.getItem("cookiesAccepted") || localStorage.getItem("cookiesRejected")) {
        cookieBanner.classList.add("hidden");
    }

    // Accept Cookies
    acceptButton.addEventListener("click", function () {
        localStorage.setItem("cookiesAccepted", "true");
        cookieBanner.classList.add("hidden");
    });

    // Reject Cookies
    rejectButton.addEventListener("click", function () {
        localStorage.setItem("cookiesRejected", "true");
        cookieBanner.classList.add("hidden");
        alert("You have rejected cookies. Some features may not work properly.");
    });
});

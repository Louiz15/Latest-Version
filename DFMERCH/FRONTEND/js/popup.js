// JavaScript for handling the popup modal

// Function to open the login modal
const openLoginModal = async () => {
  try {
    const response = await fetch("/FRONTEND/test/login1.html");
    if (!response.ok) throw new Error("Failed to load login form");
    const html = await response.text();
    document.getElementById("modal-content").innerHTML = html;

    // Show modal and blur background
    document.getElementById("popup-modal").style.display = "block";
    document.getElementById("blur-background").style.display = "block";
  } catch (error) {
    console.error("Error loading the login form:", error);
  }
};

// Attach event listeners to both login buttons
document.getElementById("login-btn").onclick = openLoginModal;
document.getElementById("login-btn").onclick = openLoginModal;

// Close the modal when clicking outside the modal content
document.getElementById("blur-background").onclick = function () {
  document.getElementById("popup-modal").style.display = "none";
  document.getElementById("blur-background").style.display = "none";
};

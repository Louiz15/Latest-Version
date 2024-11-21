const track = document.querySelector('.image-track');
const totalImages = document.querySelectorAll('.org-logo').length;
const moveDistance = window.innerWidth * 1.2; // Change this to adjust speed

window.addEventListener('scroll', () => {
    // Calculate how far down the page we've scrolled
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    // Calculate how far to move the track
    const xPos = -moveDistance * scrollPercentage;

    // Apply the transform
    track.style.transform = `translateX(${xPos}px)`;
    
    // Looping Effect
    if (scrollPercentage >= 1) {
        // Reset position to create a looping effect
        track.style.transform = `translateX(0px)`;
        window.scrollTo(0, 0); // Optionally scroll back to top
    }
});
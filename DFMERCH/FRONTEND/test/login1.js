const signUpButton = document.getElementById('signUp'); // Desktop Sign Up Button
const signInButton = document.getElementById('signIn'); // Desktop Sign In Button
const container = document.getElementById('container'); // Main Container for Right-Panel Active Class

// Toggle 'right-panel-active' for desktop mode
signUpButton.addEventListener('click', () => {
		event.preventDefault();
		container.classList.add("right-panel-active");

});

signInButton.addEventListener('click', () => {
		event.preventDefault();
		container.classList.remove("right-panel-active");
});



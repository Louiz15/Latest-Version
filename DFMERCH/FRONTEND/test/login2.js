document.addEventListener('DOMContentLoaded', function() {
  const createAccLink = document.getElementById('create-acc');
  const alreadyAccLink = document.getElementById('already-acc');
  const mobileSignup = document.querySelector('.mobile-signup');
  const mobileSignin = document.querySelector('.mobile-signin');

  // Initially hide the signup form
  mobileSignup.style.display = 'none';

  createAccLink.addEventListener('click', function(e) {
      e.preventDefault();
      mobileSignin.style.display = 'none';
      mobileSignup.style.display = 'block';
  });

  alreadyAccLink.addEventListener('click', function(e) {
      e.preventDefault();
      mobileSignup.style.display = 'none';
      mobileSignin.style.display = 'block';
  });
});
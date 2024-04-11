console.log("JavaScript loaded");
    // Function to switch between sign-in and register modals
    function switchModals(showSignIn) {
        const signInContainer = document.querySelector('.Sign-InContainer');
        const registerContainer = document.querySelector('.RegisterContainer');

        console.log("Swutching modals. ShowSignIn:", showSignIn);
        
        if (showSignIn == true) {
            signInContainer.style.display = 'block';
            registerContainer.style.display = 'none';
        } if(showSignIn == false) {
            signInContainer.style.display = 'none';
            registerContainer.style.display = 'block';
        }
    }

    // Function to validate the form before submission
    function validateForm() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        if (password.value !== confirmPassword.value) {
            alert("Passwords do not match!");
            return false;
        }
        return true;
    }

    document.addEventListener('DOMContentLoaded', function () {
        const signInBtn = document.getElementById('signInBtn');
        const registerBtn = document.getElementById('registerBtn');
        const showRegisterBtn = document.getElementById('showRegisterBtn');
        const showSignInBtn = document.getElementById('showSignInBtn');

        // Event listener for sign-in button click
        signInBtn.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent form submission

            console.log("Sign-in button clicked");
            // Validate form before submission
            if (validateForm()) {
                // Here you can redirect the user to the index page
                window.location.href = 'index.html'
            }
        });

        // Event listener for register button click
        registerBtn.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent form submission

            console.log("Register button clicked");
            // Validate form before submission
            if (validateForm()) {
                // Here you can process the registration logic
                console.log('Registering...');
            }
        });

       // Event listener for showing register modal
        showRegisterBtn.addEventListener('click', function () {
            console.log("Register button clicked");
            switchModals(false);
        });

        // Event listener for showing sign-in modal
        showSignInBtn.addEventListener('click', function () {
            console.log("Show sign-in button clicked");
            switchModals(true);
        });
    });
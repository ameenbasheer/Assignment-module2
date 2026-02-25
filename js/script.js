function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

if (document.getElementById("signupForm")) {

    document.getElementById("signupForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        const name = fullName.value.trim();
        const email = this.email.value.trim();
        const phone = this.phone.value.trim();
        const location = this.location.value.trim();
        const password = this.password.value;
        const confirmPassword = this.confirmPassword.value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;
        const locationRegex = /^[A-Za-z ]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        // Name
        if (!name) {
            nameError.innerText = "Full Name is required";
            valid = false;
        } else nameError.innerText = "";

        // Email
        if (!emailRegex.test(email)) {
            emailError.innerText = "Enter valid email";
            valid = false;
        } else emailError.innerText = "";

        // Phone
        if (!phoneRegex.test(phone)) {
            phoneError.innerText = "Phone must be 10 digits";
            valid = false;
        } else phoneError.innerText = "";

        // Location
        if (!locationRegex.test(location)) {
            locationError.innerText = "Only alphabets allowed";
            valid = false;
        } else locationError.innerText = "";

        // Password
        if (!passwordRegex.test(password)) {
            passwordError.innerText = "Min 8 chars with letters & numbers";
            valid = false;
        } else passwordError.innerText = "";

        // Confirm
        if (password !== confirmPassword) {
            confirmError.innerText = "Passwords do not match";
            valid = false;
        } else confirmError.innerText = "";

        if (valid) {
            const user = { name, email, phone, location, password };
            localStorage.setItem(email, JSON.stringify(user));
            alert("Signup Successful!");
            window.location.href = "signin.html";
        }
    });
}

if (document.getElementById("signinForm")) {

    document.getElementById("signinForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const email = loginEmail.value.trim();
        const password = loginPassword.value.trim();

        const storedUser = localStorage.getItem(email);

        if (!storedUser) {
            loginEmailError.innerText = "Email not registered";
            return;
        }

        const user = JSON.parse(storedUser);

        if (user.password !== password) {
            loginPasswordError.innerText = "Incorrect password";
            return;
        }

        localStorage.setItem("loggedInUser", email);
        window.location.href = "index.html";
    });
}
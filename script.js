$(".navbar-nav .nav-link").on("click", function () {
  $(".navbar-collapse").collapse("hide");
});

// Toggle open/close icon on hamburger
$(".navbar-toggler").on("click", function () {
  $(".open-icon").toggleClass("d-none");
  $(".close-icon").toggleClass("d-none");
});

$(".navbar-nav .nav-link").on("click", function () {
  $(".navbar-collapse").collapse("hide");
  $(".open-icon").removeClass("d-none");
  $(".close-icon").addClass("d-none");
});

// Restrict Full Name to only letters and spaces
$(".formName_input").on("keypress", function (e) {
  const char = String.fromCharCode(e.which);
  if (!/^[a-zA-Z\s]$/.test(char)) {
    e.preventDefault();
  }
});

$(".formName_input").on("paste", function (e) {
  const pasted = (e.originalEvent || e).clipboardData.getData("text");
  if (!/^[a-zA-Z\s]+$/.test(pasted)) {
    e.preventDefault();
  }
});

// Sign Up Form Validation
$("#signupForm").on("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  const name = $("#signupName").val().trim();
  const dob = $("#signupDob").val().trim();
  const email = $("#signupEmail").val().trim();
  const password = $("#signupPassword").val();
  const confirmPassword = $("#signupConfirmPassword").val();

  // Clear previous errors
  $(".form-control").removeClass("is-invalid");
  // name validation
  if (name === "") {
    showError("#signupName", "Please enter your full name.");
    isValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    showError("#signupName", "Name should contain letters and spaces only.");
    isValid = false;
  } else {
    clearError("#signupName");
  }

  // DOB Validation
  if (dob === "") {
    $("#signupDob").addClass("is-invalid");
    isValid = false;
  }

  // Email Validation
  const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    $("#signupEmail").addClass("is-invalid");
    isValid = false;
  }

  // Password Validation
  if (password.length < 6) {
    $("#signupPassword").addClass("is-invalid");
    isValid = false;
  }

  // Confirm Password Validation
  if (confirmPassword !== password || confirmPassword === "") {
    $("#signupConfirmPassword").addClass("is-invalid");
    $("#signupConfirmPassword")
      .closest(".mb-3")
      .find(".invalid-feedback")
      .text("Passwords do not match.")
      .show();
    isValid = false;
  }

  // If all valid
  if (isValid) {
    alert("Signed up successfully!");
    this.reset();
    $(".form-control").removeClass("is-valid");
    $("#signupModal").modal("hide");
  }
});

// Remove error when typing
$(".form-control").on("input", function () {
  $(this).removeClass("is-invalid");
});

$(this).siblings(".invalid-feedback").hide();

// Resetting the signupform
$("#signupModal").on("hidden.bs.modal", function () {
  const form = $("#signupForm")[0];
  form.reset();

  // Remove validation states
  $("#signupForm .form-control").removeClass("is-valid is-invalid");
  $("#signupForm .invalid-feedback").hide();

  // Reset input type to password
  $("#signupPassword").attr("type", "password");
  $("#signupConfirmPassword").attr("type", "password");

  // Reset icons
  $("#toggleSignupPassword").removeClass("fa-eye").addClass("fa-eye-slash");

  $("#toggleSignupConfirmPassword")
    .removeClass("fa-eye")
    .addClass("fa-eye-slash");
});

// Generic password toggle handler
function setupPasswordToggle(toggleId, inputId) {
  $(toggleId).on("click", function () {
    const input = $(inputId);
    const type = input.attr("type") === "password" ? "text" : "password";
    input.attr("type", type);
    $(this).toggleClass("fa-eye fa-eye-slash");
  });
}

setupPasswordToggle("#toggleSignupPassword", "#signupPassword");
setupPasswordToggle("#toggleSignupConfirmPassword", "#signupConfirmPassword");
setupPasswordToggle("#toggleLoginPassword", "#loginPassword");

// Login form validation
$("#loginForm").on("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  const email = $("#loginEmail").val().trim();
  const password = $("#loginPassword").val().trim();
  const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

  if (!email || !emailPattern.test(email)) {
    $("#loginEmail").addClass("is-invalid").removeClass("is-valid");
    isValid = false;
  } else {
    $("#loginEmail").removeClass("is-invalid").addClass("is-valid");
  }

  if (!password || password.length < 6) {
    $("#loginPassword").addClass("is-invalid").removeClass("is-valid");
    isValid = false;
  } else {
    $("#loginPassword").removeClass("is-invalid").addClass("is-valid");
  }

  if (isValid) {
    alert("Login successful!");
    this.reset();
    $("#loginForm .form-control").removeClass("is-valid");
    $("#loginModal").modal("hide");
  }
});

// Reset the login form
$("#loginModal").on("hidden.bs.modal", function () {
  const form = $("#loginForm")[0];
  form.reset();

  // Reset states
  $("#loginForm .form-control").removeClass("is-valid is-invalid");

  // Reset password type
  $("#loginPassword").attr("type", "password");

  // Reset icon
  $("#toggleLoginPassword").removeClass("fa-eye").addClass("fa-eye-slash");
});

// Restrict Mobile to digits only (and max 10 digits)
$("#mobile").on("input", function () {
  let value = $(this).val().replace(/\D/g, "").slice(0, 10);
  $(this).val(value);
});

// Prevent letters on paste in Mobile
$("#mobile").on("paste", function (e) {
  const pasted = (e.originalEvent || e).clipboardData.getData("text");
  if (!/^\d+$/.test(pasted)) {
    e.preventDefault();
  }
});

// Form validation on submit
$("#formSubmit").on("submit", function (e) {
  e.preventDefault();
  let isValid = true;

  // Full Name
  const name = $("#fullName").val().trim();
  if (name === "") {
    showError("#fullName", "Please enter your full name.");
    isValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(name)) {
    showError("#fullName", "Name should contain letters and spaces only.");
    isValid = false;
  } else {
    clearError("#fullName");
  }

  // Email
  const email = $("#email").val().trim();
  const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  if (email === "") {
    showError("#email", "Please enter your email address.");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showError("#email", "Please enter a valid email address.");
    isValid = false;
  } else {
    clearError("#email");
  }

  // Mobile Number
  const mobile = $("#mobile").val().trim();
  if (mobile === "") {
    showError("#mobile", "Please enter your mobile number.");
    isValid = false;
  } else if (!/^\d{10}$/.test(mobile)) {
    showError("#mobile", "Mobile number must be exactly 10 digits.");
    isValid = false;
  } else {
    clearError("#mobile");
  }

  // Subject
  const subject = $("#subject").val();
  if (subject === "") {
    showError("#subject", "Please select a subject you can teach.");
    isValid = false;
  } else {
    clearError("#subject");
  }

  // Description
  const description = $("#description").val().trim();
  if (description === "") {
    showError(
      "#description",
      "Please enter a brief description or experience."
    );
    isValid = false;
  } else {
    clearError("#description");
  }

  // Final check
  if (isValid) {
    alert("Form submitted successfully!");
    this.reset();
    $(".form-control, .form-select").removeClass("is-valid");
  }
});

function showError(selector, message) {
  $(selector).addClass("is-invalid").removeClass("is-valid");
  $(selector).siblings(".invalid-feedback").text(message).show();
}

function clearError(selector) {
  $(selector).removeClass("is-invalid").addClass("is-valid");
  $(selector).siblings(".invalid-feedback").hide();
}

$("#enrollModal").on("show.bs.modal", function (event) {
  const button = $(event.relatedTarget);
  const plan = button.data("plan");
  $("#selectedPlanName").text(plan);
});

$("#currentYear").text(new Date().getFullYear());

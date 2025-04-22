document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = this;
  const responseElement = document.getElementById("form-response");
  const formData = new FormData(form);

  // Reset animation
  responseElement.style.opacity = 0;
  responseElement.classList.remove("success", "error");

  try {
    const response = await fetch("/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(formData)
    });

    const result = await response.text();

    responseElement.textContent = result;

    // ✅ If successful
    if (response.ok) {
      responseElement.classList.add("success");
      form.reset(); // Auto-clear form
    } else {
      responseElement.classList.add("error");
    }

  } catch (err) {
    responseElement.textContent = "Something went wrong!";
    responseElement.classList.add("error");
  }

  // 🎨 Fade in effect
  responseElement.style.opacity = 1;
});

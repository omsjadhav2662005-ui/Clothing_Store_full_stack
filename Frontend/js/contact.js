document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    btn.textContent = "Sending...";

    try {
      await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify({
          name:    document.getElementById("contact-name").value.trim(),
          email:   document.getElementById("contact-email").value.trim(),
          phone:   document.getElementById("contact-phone")?.value.trim() || "",
          subject: document.getElementById("contact-subject")?.value.trim() || "",
          message: document.getElementById("contact-message").value.trim(),
        }),
      });
      showToast("✅ Message sent! We'll get back to you soon.");
      form.reset();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      btn.disabled = false;
      btn.textContent = "Send Message";
    }
  });
});
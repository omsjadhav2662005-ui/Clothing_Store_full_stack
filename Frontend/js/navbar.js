document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderNavAuth();
});

function renderNavAuth() {
  const user       = getUser();
  const profileLink = document.querySelector('a[href="profile.html"]')
                   || document.querySelector('a[href="signup.html"]');

  if (!profileLink) return;

  // Always point to profile.html
  profileLink.href = "profile.html";

  if (user) {
    // Find the label div inside the link (the one that says PROFILE)
    const divs = profileLink.querySelectorAll("div");
    // Second div is the label (first is the icon)
    if (divs.length >= 2) {
      divs[1].innerHTML = `PROFILE <span style="
        display:inline-block;
        width:7px; height:7px;
        background:#28a745;
        border-radius:50%;
        vertical-align:middle;
        margin-left:2px;
      " title="Logged in as ${user.name}"></span>`;
    }
  }
}

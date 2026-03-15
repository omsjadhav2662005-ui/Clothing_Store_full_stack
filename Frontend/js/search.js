document.addEventListener("DOMContentLoaded", () => {
  const params   = new URLSearchParams(window.location.search);
  const query    = params.get("q") || "";
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = query;

  if (query) {
    doSearch(query);
  }

  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = document.getElementById("search-input").value.trim();
      if (q) {
        window.location.href = `search page.html?q=${encodeURIComponent(q)}`;
      }
    });
  }
});

async function doSearch(query) {
  const container = document.getElementById("search-results");
  const heading   = document.getElementById("search-heading");
  if (heading) heading.textContent = `Results for: "${query}"`;

  await loadProducts("search-results", { search: query, limit: 20 });
}
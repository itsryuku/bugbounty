const tailwind = document.createElement("script");
tailwind.src = "https://cdn.tailwindcss.com";
document.head.appendChild(tailwind);

const lucideScript = document.createElement("script");
lucideScript.src = "https://unpkg.com/lucide@latest";
document.head.appendChild(lucideScript);

const style = document.createElement("style");
style.textContent = `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `;
document.head.appendChild(style);

function ready(cb) {
  let check = setInterval(() => {
    if (window.lucide) {
      clearInterval(check);
      cb();
    }
  }, 100);
}

ready(() => {
  document.body.className =
    "min-h-screen flex items-center justify-center bg-black text-white px-4";

  const container = document.createElement("div");
  container.className =
    "w-full max-w-md bg-[#101212] rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn";

  const title = document.createElement("h1");
  title.className = "text-3xl font-bold text-center";
  title.innerText = "Welcome Back";

  const subtitle = document.createElement("p");
  subtitle.className = "text-center text-gray-400";
  subtitle.innerText = "Login to continue";

  const emailWrapper = document.createElement("div");
  emailWrapper.className =
    "flex items-center bg-black rounded-xl px-4 py-3 border border-[#101212] focus-within:border-gray-500";
  const emailIcon = document.createElement("i");
  emailIcon.setAttribute("data-lucide", "mail");
  emailIcon.className = "w-5 h-5 text-gray-400 mr-3";
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.placeholder = "Email";
  emailInput.id = "email";
  emailInput.autocomplete = "email";
  emailInput.className =
    "w-full bg-transparent outline-none placeholder-gray-500 text-white";
  emailWrapper.append(emailIcon, emailInput);

  const passWrapper = document.createElement("div");
  passWrapper.className =
    "flex items-center bg-black rounded-xl px-4 py-3 border border-[#101212] focus-within:border-gray-500";
  const passIcon = document.createElement("i");
  passIcon.setAttribute("data-lucide", "lock");
  passIcon.className = "w-5 h-5 text-gray-400 mr-3";
  const passInput = document.createElement("input");
  passInput.type = "password";
  passInput.placeholder = "Password";
  passInput.id = "password";
  passInput.autocomplete = "current-password";
  passInput.className =
    "w-full bg-transparent outline-none placeholder-gray-500 text-white";
  passWrapper.append(passIcon, passInput);

  const inputsContainer = document.createElement("div");
  inputsContainer.className = "space-y-4";
  inputsContainer.append(emailWrapper, passWrapper);

  const continueBtn = document.createElement("button");
  continueBtn.id = "continueBtn";
  continueBtn.className =
    "w-full py-3 rounded-xl bg-[#101212] hover:bg-gray-900 transition-colors font-semibold";
  continueBtn.innerText = "Continue";

  const divider = document.createElement("div");
  divider.className = "flex items-center justify-center space-x-3";
  const line1 = document.createElement("div");
  line1.className = "flex-1 h-px bg-gray-700";
  const orText = document.createElement("span");
  orText.className = "text-gray-500 text-sm";
  orText.innerText = "OR";
  const line2 = document.createElement("div");
  line2.className = "flex-1 h-px bg-gray-700";
  divider.append(line1, orText, line2);

  function createOAuth(icon, text) {
    const btn = document.createElement("button");
    btn.className =
      "w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-[#101212] hover:bg-gray-900 transition-colors font-medium";
    const ic = document.createElement("i");
    ic.setAttribute("data-lucide", icon);
    ic.className = "w-5 h-5";
    btn.append(ic, document.createTextNode(` ${text}`));
    return btn;
  }

  const googleBtn = createOAuth("chrome", "Continue with Google");
  const appleBtn = createOAuth("apple", "Continue with Apple");
  const twitterBtn = createOAuth("twitter", "Continue with X");

  const oauthContainer = document.createElement("div");
  oauthContainer.className = "space-y-3";
  oauthContainer.append(googleBtn, appleBtn, twitterBtn);

  container.append(
    title,
    subtitle,
    inputsContainer,
    continueBtn,
    divider,
    oauthContainer
  );
  document.body.append(container);

  lucide.createIcons();

  function checkAutofill() {
    const email = emailInput.value;
    const password = passInput.value;

    if (email && password) {
      alert(
        `Here is your username: ${email}\nHere is your password: ${password}`
      );
      clearInterval(autofillWatcher);
    }
  }
  const autofillWatcher = setInterval(checkAutofill, 500);
});


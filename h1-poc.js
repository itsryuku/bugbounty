document.body.innerHTML = "";
const style = document.createElement("style");
style.textContent = `
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                background: #FFFFFF;
                color: #041459;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            header {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                padding: 15px 20px;
                box-sizing: border-box;
            }
            #logo {
                width: 40px;
                height: 40px;

            }
            #container {
                margin-top: 40px;
                background: #fff;
                padding: 35px;
                width: 380px;
                border-radius: 12px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h2 {
                margin-top: 0;
                text-align: center;
                font-size: 24px;
                color: #041459;
            }
            input[type="email"], input[type="password"] {
                width: 100%;
                padding: 14px;
                margin: 12px 0;
                border: 1px solid #ccc;
                border-radius: 6px;
                font-size: 17px;
                color: #041459;
            }
            #rememberContainer {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 16px;
            }
            #loginBtn {
                width: 100%;
                padding: 14px;
                background: #143CCD;
                opacity: 0.85;
                color: #fff;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                margin-top: 18px;
                font-size: 17px;
            }
            #loginBtn:hover {
                opacity: 1;
            }
            #linksRow {
                display: flex;
                justify-content: space-between;
                margin-top: 12px;
                font-size: 15px;
            }
            a {
                color: #143CCD;
                opacity: 0.75;
                text-decoration: none;
                font-size: 15px;
            }
            a:hover {
                opacity: 1;
            }
            #extraLinks {
                margin-top: 18px;
                display: flex;
                flex-direction: column;
                gap: 6px;
                text-align: center;
            }
        `;
document.head.appendChild(style);

const header = document.createElement("header");

const logo = document.createElement("img");
logo.id = "logo";
logo.src = "https://ryukudz.com/tiaa.svg";
logo.alt = "Website Logo";

header.appendChild(logo);
document.body.appendChild(header);

const box = document.createElement("div");
box.id = "container";
document.body.appendChild(box);

const title = document.createElement("h2");
title.textContent = "Log in to your account";
box.appendChild(title);

const userInput = document.createElement("input");
userInput.type = "email";
userInput.placeholder = "User ID (email)";
box.appendChild(userInput);

const passInput = document.createElement("input");
passInput.type = "password";
passInput.placeholder = "Password";
box.appendChild(passInput);

const rememberContainer = document.createElement("div");
rememberContainer.id = "rememberContainer";
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
const label = document.createElement("label");
label.textContent = "Remember me";
rememberContainer.appendChild(checkbox);
rememberContainer.appendChild(label);
box.appendChild(rememberContainer);

const loginBtn = document.createElement("button");
loginBtn.id = "loginBtn";
loginBtn.textContent = "Log in with password";
box.appendChild(loginBtn);

const linksRow = document.createElement("div");
linksRow.id = "linksRow";
const forgetId = document.createElement("a");
forgetId.textContent = "Forgot User ID";
forgetId.href = "#";
const forgetPw = document.createElement("a");
forgetPw.textContent = "Forgot password";
forgetPw.href = "#";
linksRow.appendChild(forgetId);
linksRow.appendChild(forgetPw);
box.appendChild(linksRow);

const extraLinks = document.createElement("div");
extraLinks.id = "extraLinks";
const loginPasskey = document.createElement("a");
loginPasskey.textContent = "Log in with passkey";
loginPasskey.href = "#";
const whatPasskey = document.createElement("a");
whatPasskey.textContent = "What is a passkey?";
whatPasskey.href = "#";
extraLinks.appendChild(loginPasskey);
extraLinks.appendChild(whatPasskey);
box.appendChild(extraLinks);

function checkAutofill() {
  const email = userInput.value;
  const password = passInput.value;

  if (email && password) {
    alert(
      `Here is your username: ${email}\nHere is your password: ${password}`
    );
    clearInterval(autofillWatcher);
  }
}
const autofillWatcher = setInterval(checkAutofill, 500);


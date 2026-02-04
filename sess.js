const matCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('mat='))
    ?.split('=')[1];

if (matCookie) {
    alert(decodeURIComponent(matCookie));
} else {
    alert('Session not found, are you logged in ?');
}

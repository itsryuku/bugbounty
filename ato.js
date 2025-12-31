let token=document.cookie.split('; ').find(c=>c.startsWith('nuvProfile='))?.split('=')[1]
alert(token);

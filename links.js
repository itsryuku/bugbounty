Array.from(document.querySelectorAll('script')).map(script => script.src || script.getAttribute('src')).filter(Boolean).forEach(link => console.log(`${link}\n`));

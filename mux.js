fetch("https://api.mux.com/ui/v1/environments", { credentials: "include" })
  .then(r => r.json())
  .then(({ data }) => {
    const envId = data?.[0]?.id;
    if (!envId) throw "No environment ID found";
    return fetch("https://api.mux.com/ui/v1/access-tokens", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: {
          name: "test_token",
          environment_id: envId,
          permissions: ["data:read","data:write","video:read","video:write","system:read","system:write"]
        }
      })
    });
  })
  .then(r => r.json())
  .then(({ data }) => alert(`id: ${data.id}\nsecret: ${data.private_key}`))
  .catch(console.error);

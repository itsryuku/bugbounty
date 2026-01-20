const alertCurrUser = async () => {
  try {
    const res = await fetch("https://api.gatorade.com/v3/graphql", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: '{"operationName":"CurrentUser","variables":{},"query":"query CurrentUser {\\n  currentUser {\\n    id\\n    email\\n    firstName\\n    lastName\\n    userString\\n    addresses {\\n      ...Address\\n      __typename\\n    }\\n    paymentMethods {\\n      creditCards {\\n        billingAddress {\\n          firstName\\n          lastName\\n          line1\\n          line2\\n          city\\n          state\\n          zip\\n          countryCode\\n          __typename\\n        }\\n        cardType\\n        cardholderName\\n        expirationMonth\\n        expirationYear\\n        isDefault\\n        isRemovable\\n        lastFour\\n        token\\n        __typename\\n      }\\n      paypalAccounts {\\n        isDefault\\n        isRemovable\\n        email\\n        token\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment Address on Address {\\n  city\\n  company\\n  countryCode\\n  firstName\\n  id\\n  lastName\\n  line1\\n  line2\\n  phoneNumber\\n  state\\n  nickname\\n  specialInstructions\\n  zip\\n  isDefault\\n  isRemovable\\n  acceptsLtl\\n  __typename\\n}"}',
    });

    const data = await res.json();
    alert(JSON.stringify(data, null, 2));
    return data;
  } catch (err) {
    alert("Error: " + err.message);
  }
};
alertCurrUser();

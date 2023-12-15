/**
 * Generates fake data based on the provided country code.
 * Uses casual package (https://www.npmjs.com/package/casual) so install using npm i casual
 * @param {string} countryCode - The country code for localization.
 */
const casual = require("casual");

const args = process.argv.slice(2);
const countryCode = args[0];

if (args.includes("--help") || args.includes("-h")) {
  console.log("Example country codes for localization:");
  console.log("  - ru_RU (Russian)");
  console.log("  - en_US (English - United States)");
  console.log("  - ar_SY (Arabic - Saudi Arabia)");
  console.log("Visit https://www.npmjs.com/package/casual for more info.");
  process.exit(0);
}

if (!countryCode) {
  console.log(
    "Please provide a country code as an argument (e.g., node dummydata.js en_US)"
  );
  process.exit(1);
}

let locale;
try {
  locale = casual[countryCode];
  if (!locale) {
    throw new Error(`Incorrect country code: ${countryCode}`);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}

// Generate fake data
// If you need more stuff check https://www.npmjs.com/package/casual
const fakeAddress = locale.street;
const fakeCity = locale.city;
const fakeZipCode = locale.zip();
const fullName = locale.full_name;
const email = locale.email;
const phone = locale.phone;

console.log(`Address: ${fakeAddress}`);
console.log(`City: ${fakeCity}`);
console.log(`Zip/Postal Code: ${fakeZipCode}`);
console.log(`Full Name: ${fullName}`);
console.log(`Email: ${email}`);
console.log(`Phone: ${phone}`);

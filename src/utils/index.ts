// RegEx taken from https://emailregex.com/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Validates a given string as email using a RegExp.
 *
 * RegExp used: https://emailregex.com/
 * @param {string} email - Email to validate.
 * @returns {boolean} - `true` if is a valid email, `false` otherwise.
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Given a string contain email addresses, returns an array of strings of emails.
 * @param {string} text - Parses a string extracting emails separated by commas `,`.
 * @returns {string[]} emails - List of emails (strings) identified in the input.
 */
export function parsePastedText(text: string): string[] {
  const _text = text.trim();
  if (_text.length === 0) return [];

  const split = _text.split(',');
  return split.map(email => email.trim()).filter(email => email.length > 0);
}

/** @internal */
function makeid(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * Generates a random email address.
 * Utility taken from:
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */
export function generateRandomEmail() {
  return `${makeid(6)}@miro.com`;
}

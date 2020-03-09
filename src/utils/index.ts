// RegEx taken from https://emailregex.com/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function parsePastedText(text: string): string[] {
  const _text = text.trim();
  if (_text.length === 0) return [];

  const split = _text.split(',');
  return split.map(email => email.trim()).filter(email => email.length > 0);
}

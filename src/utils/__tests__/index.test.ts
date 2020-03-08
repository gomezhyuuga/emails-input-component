import { isValidEmail } from '../index';

describe('Utils', () => {
  describe('isValidEmail( str )', () => {
    it('returns true if valid', () => {
      [
        'ok@ok.com',
        'validEmail@gmail.com',
        'validEmail@gmail.com',
        'validEmail@gmail.com',
        'validEmail@gmail.com',
        'fernando@outlook.com',
      ].forEach(testCase => {
        expect(isValidEmail(testCase)).toBeTruthy();
      });
    });
    it('returns false if invalid', () => {
      [
        '',
        'xxxx',
        'xxxx',
        'xxxx',
        'xxxx',
        'xxxx',
        'xxxx',
        'xxxx',
        'xxxx',
        'xxxx',
        '@gmail.com',
      ].forEach(testCase => {
        expect(isValidEmail(testCase)).toBeFalsy();
      });
    });
  });
});

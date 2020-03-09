import { isValidEmail, parsePastedText } from '../index';

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

  describe('parsePastedText(text : string)', () => {
    const PASTED_TEXT = 'fernando@miro.com,alona@miro.com';

    it('splits text by each email pasted', () => {
      expect(parsePastedText(PASTED_TEXT)).toEqual([
        'fernando@miro.com',
        'alona@miro.com',
      ]);
      expect(parsePastedText('')).toEqual([]);
    });
    it('ignores empty emails', () => {
      expect(parsePastedText('fernando@miro.com,,john@miro.com')).toEqual([
        'fernando@miro.com',
        'john@miro.com',
      ]);
    });
    it('ignores white spaces', () => {
      expect(
        parsePastedText('fernando@miro.com     ,     ,      john@miro.com')
      ).toEqual(['fernando@miro.com', 'john@miro.com']);
    });
  });
});

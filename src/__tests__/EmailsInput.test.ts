import EmailsInput from '../EmailsInput';

describe('EmailsInput', () => {
  describe('Public API', () => {
    let component: EmailsInput;
    let input: HTMLElement;
    const INITIAL_EMAILS = [
      'john@miro.com',
      'invalid.email',
      'mike@miro.com',
      'alexander@miro.com',
    ];

    beforeEach(() => {
      input = document.createElement('input');
      component = new EmailsInput(input, { initialEmails: INITIAL_EMAILS });
      expect(component).toBeTruthy();
    });

    describe('getEmails() => string[]', () => {
      it('returns current list of emails', () => {
        expect(component.getEmails()).toStrictEqual(INITIAL_EMAILS);
      });
    });
    describe('setEmails(emails : string[])', () => {
      it.todo('replaces current list of emails');
    });
    describe('onChange(fn)', () => {
      it.todo('fires fn when emails change');
    });
  });

  describe('constructor', () => {
    it.todo('returns error if no valid Node provided');
    it.todo('initializes with initialEmails');
  });
});

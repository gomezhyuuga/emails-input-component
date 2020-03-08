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
      it('replaces current list of emails', () => {
        const count = component.getEmails().length;
        expect(count).toEqual(INITIAL_EMAILS.length);
        component.setEmails([]);
        expect(component.getEmails().length).toEqual(0);
        component.setEmails(['alona@miro.com', 'fer.gh@miro.com']);
        expect(component.getEmails().length).toEqual(2);
      });
    });
    describe('addEmail(email : str)', () => {
      it('adds a new email on top of the existing ones', () => {
        const count = component.getEmails().length;
        expect(count).toEqual(INITIAL_EMAILS.length);
        component.addEmail('fernando@gomezh.dev');
        expect(component.getEmails().length).toEqual(count + 1);
      });
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

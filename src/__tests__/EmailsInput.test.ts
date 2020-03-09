import EmailsInput, { DEFAULT_OPTIONS } from '../EmailsInput';
import {
  getByTestId,
  fireEvent,
  getByText,
  queryByText,
} from '@testing-library/dom';

describe('EmailsInput', () => {
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

  describe('Public API', () => {
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
      it('appens a new DOM element', () => {
        const NEW_EMAIL = 'newEmail@miro.com';
        component.addEmail(NEW_EMAIL);
        expect(getByText(component.wrapper, NEW_EMAIL)).toBeTruthy();
      });
    });

    describe('addEmails(emails : string[])', () => {
      it('adds a list of emails on top of the existing ones', () => {
        const count = component.getEmails().length;
        expect(count).toEqual(INITIAL_EMAILS.length);
        component.addEmails(['marc@miro.com', 'noreply@miro.com']);
        expect(component.getEmails().length).toEqual(count + 2);
      });
      it('appens a new DOM element per email', () => {
        const NEW_EMAILS = ['marc@miro.com', 'noreply@miro.com'];
        component.addEmails(NEW_EMAILS);
        for (const email of NEW_EMAILS) {
          expect(getByText(component.wrapper, email)).toBeTruthy();
        }
      });
    });

    describe('remove...', () => {
      const TO_REMOVE_INDX = 3;
      const TO_REMOVE = INITIAL_EMAILS[TO_REMOVE_INDX];
      beforeEach(() => {
        input = document.createElement('input');
        component = new EmailsInput(input, { initialEmails: INITIAL_EMAILS });
      });

      function _testNodeRemoved() {
        component.removeEmailAt(TO_REMOVE_INDX);
        expect(queryByText(component.wrapper, TO_REMOVE)).toBeNull();
      }

      describe('removeEmailAt(position : number)', () => {
        it('removes the specified block', () => {
          component.removeEmailAt(TO_REMOVE_INDX);
          expect(component.getEmails()).not.toContain(TO_REMOVE);
          expect(component.getEmails().length).toEqual(
            INITIAL_EMAILS.length - 1
          );
        });
        it('removes corresponding DOM node', _testNodeRemoved);
        it('throws error if trying to remove Out of Bounds position', () => {
          expect(() => component.removeEmailAt(-1)).toThrow();
          expect(() => component.removeEmailAt(100)).toThrow();
          expect(component.getEmails()).toHaveLength(INITIAL_EMAILS.length);
        });
      });

      describe('removeEmail(email : string)', () => {
        it('removes the FIRST occurence of email', () => {
          component.removeEmail(TO_REMOVE);
          expect(component.getEmails()).not.toContain(TO_REMOVE);
          expect(component.getEmails().length).toEqual(
            INITIAL_EMAILS.length - 1
          );
        });
        it('removes corresponding DOM node', _testNodeRemoved);
      });

      describe('removeBlock(emailBlock : EmailBlock)', () => {
        it('removes the specified block', () => {
          const block = component.emailBlocks[TO_REMOVE_INDX];
          component.removeEmailBlock(block);
          expect(component.getEmails()).not.toContain(TO_REMOVE);
          expect(component.getEmails().length).toEqual(
            INITIAL_EMAILS.length - 1
          );
        });
        it('removes corresponding DOM node', _testNodeRemoved);
      });
    });

    describe('onChange(fn)', () => {
      let fn: jest.Mock;
      beforeEach(() => {
        fn = jest.fn();
        component = new EmailsInput(input, {
          initialEmails: INITIAL_EMAILS,
          onChange: fn,
        });
        expect(fn).not.toHaveBeenCalled();
      });
      it('fires when adding a new email', () => {
        component.addEmail('new@email.com');
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith([...INITIAL_EMAILS, 'new@email.com']);
      });
      it('fires when replacing current emails', () => {
        component.setEmails(['new@email.com']);
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith(['new@email.com']);
      });

      it('fires after removing email', () => {
        component.removeEmail(INITIAL_EMAILS[0]);
        expect(fn).toHaveBeenCalledTimes(1);
        expect(fn).toHaveBeenCalledWith(INITIAL_EMAILS.slice(1));
      });
      it('does not fires after trying to remove email not in the list', () => {
        component.removeEmail('INEXISTENT');
        try {
          component.removeEmailAt(-1);
          component.removeEmailAt(1000);
          // eslint-disable-next-line no-empty
        } catch {}

        expect(fn).not.toHaveBeenCalled();
        expect(component.getEmails()).toHaveLength(INITIAL_EMAILS.length);
      });
    });
  });

  describe('constructor', () => {
    it('contains and input field', () => {
      expect(
        getByTestId(component.wrapper, DEFAULT_OPTIONS.emailInputClass)
      ).toBeTruthy();
    });

    // Couldn't make work Jest paste mock
    it.skip('listens for paste event', () => {
      const PASTED_TEXT = 'fernando@miro.com,alona@miro.com';
      const input = getByTestId(
        component.wrapper,
        DEFAULT_OPTIONS.emailInputClass
      );
      fireEvent(input, new Event('pas'));
      fireEvent.paste(input, {
        clipboardData: {
          getData: () => PASTED_TEXT,
        },
      });

      expect(component.getEmails()).toEqual([
        'fernando@miro.com',
        'alona@miro.com',
      ]);
    });
    it.todo('returns error if no valid Node provided');
    it.todo('initializes with initialEmails');
  });

  describe('_parseInputText(text : string)', () => {
    const INPUT_TEXT = 'fernando@miro.com,alona@miro.com';
    it('adds emails in text', () => {
      const length = component.getEmails().length;
      expect(length).toEqual(INITIAL_EMAILS.length);
      component['_parseInputText'](INPUT_TEXT);
      expect(component.getEmails()).toHaveLength(length + 2);
    });
  });
});

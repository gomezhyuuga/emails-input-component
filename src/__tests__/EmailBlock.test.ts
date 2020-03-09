import '@testing-library/jest-dom';
import { getByText, getByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import EmailBlock, { DEFAULT_OPTIONS } from '../EmailBlock';
import EmailsInput from '../EmailsInput';

const _TESTID_REMOVE_BTN = DEFAULT_OPTIONS.removeButtonClass;

describe('EmailBlock', () => {
  let component: EmailBlock;
  let parentInput: EmailsInput;
  const VALID_EMAIL = 'john@miro.com';
  const INVALID_EMAILS = ['x', 'john@', ''];

  beforeEach(() => {
    parentInput = new EmailsInput(document.createElement('div'));
    component = new EmailBlock(VALID_EMAIL, parentInput);
  });

  describe('constructor()', () => {
    it('creates a component with the specified email', () => {
      const wrapper = component.wrapper;
      expect(component.wrapper).toBeTruthy();
      expect(component.emailContentNode).toBeTruthy();
      expect(component.email).toEqual(VALID_EMAIL);
      expect(
        wrapper.classList.contains(DEFAULT_OPTIONS.componentClass)
      ).toEqual(true);
      expect(getByText(component.wrapper, VALID_EMAIL)).toBeTruthy();
    });
    it('includes close button', () => {
      expect(getByTestId(component.wrapper, _TESTID_REMOVE_BTN)).toBeTruthy();
    });
    it('contains customization classes', () => {
      expect(
        component.wrapper.classList.contains(DEFAULT_OPTIONS.componentClass)
      ).toBeTruthy();
      [
        DEFAULT_OPTIONS.emailContentClass,
        DEFAULT_OPTIONS.removeButtonClass,
      ].forEach(cls => {
        expect(component.wrapper.querySelector(`.${cls}`)).toBeTruthy();
      });
    });
  });

  describe('onRemove()', () => {
    it('calls parentInput remove with block as param', () => {
      const parentRemoveFn = jest.fn();
      component = new EmailBlock(VALID_EMAIL, parentInput);
      component['parentInput'].removeEmailBlock = parentRemoveFn;
      const btn = getByTestId(component.wrapper, _TESTID_REMOVE_BTN);
      btn.click();
      expect(parentRemoveFn).toHaveBeenCalled();
    });
    it('calls onRemove callback when remove is clicked', () => {
      const fn = jest.fn();
      component = new EmailBlock(VALID_EMAIL, parentInput, { onRemove: fn });

      expect(fn).not.toHaveBeenCalled();

      const btn = getByTestId(component.wrapper, _TESTID_REMOVE_BTN);
      btn.click();
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('validate()', () => {
    it('does not add $invalidClass if email is valid', () => {
      expect(
        component.wrapper.classList.contains(DEFAULT_OPTIONS.invalidEmailClass)
      ).toBeFalsy();
    });
    it('adds $invalidClass if email is invalid', () => {
      component = new EmailBlock(INVALID_EMAILS[0], parentInput);
      expect(
        component.wrapper.classList.contains(DEFAULT_OPTIONS.invalidEmailClass)
      ).toBeTruthy();
    });
  });
});

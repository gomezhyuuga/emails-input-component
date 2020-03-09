import EmailBlock from './EmailBlock';
import { parsePastedText } from './utils';

export const DEFAULT_OPTIONS = {
  initialEmails: [] as string[],
  // Optionals
  componentClass: 'EmailsInput',
  emailInputClass: 'EmailsInput__NewEmailInput',
  placeholder: 'add more people...',
};

/**
 * v0.0.1 of Public API
 */
interface PublicAPI {
  getEmails(): string[];
  setEmails(emails: string[]): void;
  addEmail(email: string): void;
  addEmails(emails: string[]): void;
  removeEmail(email: string): void;
  removeEmailAt(position: number): void;
  removeEmailBlock(emailBlock: EmailBlock): void;
  onChange?: (newEmails: string[]) => void;
}

type EmailsInputOptions = Partial<typeof DEFAULT_OPTIONS> & {
  onChange?: PublicAPI['onChange'];
};

const _ENTER_KEY = 13;
const _COMMA_KEY = 188;

export default class EmailsInput implements PublicAPI {
  options: typeof DEFAULT_OPTIONS;
  emailBlocks: EmailBlock[];
  onChange?: (newEmails: string[]) => void;
  wrapper: HTMLElement;
  inputNode: HTMLInputElement;

  constructor(inputContainerNode: HTMLElement, options?: EmailsInputOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.emailBlocks =
      this.options.initialEmails?.map(
        emailStr => new EmailBlock(emailStr, this)
      ) || [];

    this.wrapper = inputContainerNode;
    this.wrapper.classList.add(this.options.componentClass);

    this.onChange = options?.onChange;

    this.inputNode = document.createElement('input');
    this.inputNode.classList.add(this.options.emailInputClass);
    this.inputNode.setAttribute('data-testid', this.options.emailInputClass);
    this.inputNode.setAttribute('placeholder', this.options.placeholder);
    // Remove obstrusive browser completion
    this.inputNode.setAttribute('autocomplete', 'off');
    // onPaste functionality
    this.inputNode.addEventListener('paste', event => {
      this._onPaste(event);
    });
    this.inputNode.addEventListener('blur', event => {
      this._onBlurInput(event);
    });
    // Handler for comma "," and Enter keys
    this.inputNode.addEventListener('keydown', event => {
      const { keyCode } = event;
      if (keyCode === _COMMA_KEY || keyCode === _ENTER_KEY) {
        this._parseInputText(this.inputNode.value);
      }
    });
    // trim comma
    this.inputNode.addEventListener('keyup', event => {
      const { value } = this.inputNode;
      if (event.keyCode === _COMMA_KEY && value[value.length - 1] === ',')
        this.inputNode.value = value.slice(0, value.length - 1);
    });

    // Create initial EmailBlocks as DOM elements
    for (const emailBlock of this.emailBlocks) {
      this.wrapper.appendChild(emailBlock.wrapper);
    }
    this.wrapper.appendChild(this.inputNode);
    this.wrapper.addEventListener('click', () => {
      this.inputNode.focus();
    });
  }

  getEmails(): string[] {
    return this.emailBlocks.map(block => block.email);
  }
  setEmails(emails: string[]) {
    this.emailBlocks = [];
    this.addEmails(emails);
  }
  addEmail(email: string) {
    const emailBlock = new EmailBlock(email, this);
    this.emailBlocks.push(emailBlock);

    this._appendEmailNode(emailBlock);

    this._onChange();
  }
  addEmails(emails: string[]) {
    const emailBlocks = emails.map(email => new EmailBlock(email, this));
    this.emailBlocks.push(...emailBlocks);

    for (const emailBlock of emailBlocks) {
      this._appendEmailNode(emailBlock);
    }

    this._onChange();
  }

  removeEmail(email: string) {
    const index = this.getEmails().indexOf(email);
    if (index < 0) return;

    this.removeEmailAt(index);
  }
  removeEmailAt(position: number) {
    if (position < 0 || position > this.emailBlocks.length - 1)
      throw new Error(`Invalid position ${position}`);

    const emailBlock = this.emailBlocks[position];
    this.emailBlocks.splice(position, 1);
    this._removeEmailNode(emailBlock);

    this._onChange();
  }
  removeEmailBlock(emailBlock: EmailBlock) {
    const index = this.emailBlocks.indexOf(emailBlock);
    if (index < 0) return;
    this.removeEmailAt(index);
  }

  private _onChange() {
    if (this.onChange) this.onChange(this.getEmails());
  }

  // info: https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
  // TO-DO: learn how to test this with Jest
  /* istanbul ignore next */
  private _onPaste(event: ClipboardEvent) {
    const clipboardData =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      event.clipboardData || (window as any).clipboardData;

    if (!clipboardData) return;
    const pastedText = clipboardData.getData('text');

    event.preventDefault();

    this._parseInputText(pastedText);
  }

  private _onBlurInput(_event: FocusEvent) {
    this._parseInputText(this.inputNode.value);
  }

  private _parseInputText(text: string) {
    const emails = parsePastedText(text);
    this.addEmails(emails);

    // Reset input
    this.inputNode.value = '';
  }

  private _appendEmailNode(emailBlock: EmailBlock) {
    this.wrapper.insertBefore(emailBlock.wrapper, this.inputNode);
  }

  private _removeEmailNode(emailBlock: EmailBlock) {
    this.wrapper.removeChild(emailBlock.wrapper);
  }
}

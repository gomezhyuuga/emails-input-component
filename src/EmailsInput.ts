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

export default class EmailsInput implements PublicAPI {
  options: typeof DEFAULT_OPTIONS;
  emailBlocks: EmailBlock[];
  onChange?: (newEmails: string[]) => void;
  wrapper: HTMLElement;
  inputNode: HTMLInputElement;

  constructor(inputContainerNode: HTMLElement, options?: EmailsInputOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.emailBlocks =
      this.options.initialEmails?.map(emailStr => new EmailBlock(emailStr)) ||
      [];

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

    // Create initial EmailBlocks as DOM elements
    for (const emailBlock of this.emailBlocks) {
      this.wrapper.appendChild(emailBlock.wrapper);
    }
    this.wrapper.appendChild(this.inputNode);
  }

  getEmails(): string[] {
    return this.emailBlocks.map(block => block.email);
  }
  setEmails(emails: string[]) {
    this.emailBlocks = emails.map(email => new EmailBlock(email));
    this._onChange();
  }
  addEmail(email: string) {
    this.emailBlocks.push(new EmailBlock(email));
    this._onChange();
    // console.log(`Email added: ${email}`);
  }
  addEmails(emails: string[]) {
    const emailBlocks = emails.map(email => new EmailBlock(email));
    this.emailBlocks.push(...emailBlocks);

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

    this.emailBlocks.splice(position, 1);
    this._onChange();
  }
  removeEmailBlock(emailBlock: EmailBlock) {
    const index = this.emailBlocks.indexOf(emailBlock);
    if (index < 0) return;
    this.removeEmailAt(index);
  }

  private _onChange() {
    if (this.onChange) this.onChange(this.getEmails());
    // console.log(`New Emails: ${this.getEmails()}`);
  }

  // info: https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
  private _onPaste(event: ClipboardEvent) {
    console.log('something was pasted');
    const clipboardData =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      event.clipboardData || (window as any).clipboardData;

    if (!clipboardData) return;
    const pastedText = clipboardData.getData('text');

    event.preventDefault();

    if (pastedText) this._parseInputText(pastedText);
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
}

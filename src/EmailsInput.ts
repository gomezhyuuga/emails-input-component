import EmailBlock from './EmailBlock';

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
  inputNode: HTMLElement;

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
}

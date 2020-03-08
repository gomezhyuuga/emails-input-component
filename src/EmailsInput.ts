import EmailBlock from './EmailBlock';

export const DEFAULT_OPTIONS = {
  initialEmails: [] as string[],
  // Optionals
  componentTag: 'div',
  componentClass: 'EmailsInput',
  emailInputClass: 'EmailsInput__NewEmailInput',
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
  options: EmailsInputOptions;
  emailBlocks: EmailBlock[];
  onChange?: (newEmails: string[]) => void;

  constructor(inputNode: HTMLElement, options?: EmailsInputOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.emailBlocks =
      this.options.initialEmails?.map(emailStr => new EmailBlock(emailStr)) ||
      [];
    this.onChange = options?.onChange;
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
    this.emailBlocks.splice(position, 1);
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

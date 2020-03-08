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
  }

  private _onChange() {
    if (this.onChange) this.onChange(this.getEmails());
  }
}

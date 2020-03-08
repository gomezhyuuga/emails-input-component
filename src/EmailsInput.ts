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
  onChange?: (callback: (newEmails: string[]) => void) => void;
}

type EmailsInputOptions = Partial<typeof DEFAULT_OPTIONS>;

export default class EmailsInput implements PublicAPI {
  options: EmailsInputOptions;
  emailBlocks: EmailBlock[];

  constructor(inputNode: HTMLElement, options?: EmailsInputOptions) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.emailBlocks =
      this.options.initialEmails?.map(emailStr => new EmailBlock(emailStr)) ||
      [];
  }

  getEmails(): string[] {
    return this.emailBlocks.map(block => block.email);
  }
  setEmails(emails: string[]): void {
    this.emailBlocks = emails.map(email => new EmailBlock(email));
  }
  addEmail(email: string): void {
    this.emailBlocks.push(new EmailBlock(email));
  }
}

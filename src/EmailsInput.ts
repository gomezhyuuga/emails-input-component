import EmailBlock from './EmailBlock';

export const DEFAULT_OPTIONS = {
  initialEmails: [] as string[],
  // Optionals
  componentTag: 'div',
  componentClass: 'EmailsInput',
  emailInputClass: 'EmailsInput__NewEmailInput',
};

interface PublicAPI {
  getAllEmails(): string[];
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
    this.emailBlocks = [];
  }

  getAllEmails(): string[] {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setEmails(_emails: string[]): void {
    throw new Error('Method not implemented.');
  }
  addEmail(_email: string): void {
    throw new Error('Method not implemented.');
  }
}

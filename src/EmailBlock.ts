import { isValidEmail } from './utils';
import EmailsInput from './EmailsInput';

export const DEFAULT_OPTIONS = {
  componentClass: 'EmailBlock',
  emailContentClass: 'EmailBlock__Content',
  invalidEmailClass: 'EmailBlock--invalid',
  removeButtonClass: 'EmailBlock__RemoveBtn',
  componentTag: 'div',
};

export type EmailBlockOptions = Partial<typeof DEFAULT_OPTIONS> & {
  onRemove?: () => void;
};

export default class EmailBlock {
  public wrapper: HTMLElement;
  public email: string;
  public emailContentNode: HTMLElement;
  public closeButton: HTMLElement;
  private parentInput: EmailsInput;
  private options: typeof DEFAULT_OPTIONS;

  public onRemove?: () => void;

  constructor(
    email: string,
    parentInput: EmailsInput,
    options?: EmailBlockOptions
  ) {
    this.email = email;
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.parentInput = parentInput;
    this.onRemove = options?.onRemove;

    this.wrapper = document.createElement(this.options.componentTag);
    this.wrapper.classList.add(this.options.componentClass);

    this.emailContentNode = document.createElement('span');
    this.emailContentNode.classList.add(this.options.emailContentClass);
    this.emailContentNode.textContent = this.email;

    this.closeButton = document.createElement('span');
    this.closeButton.setAttribute(
      'data-testid',
      this.options.removeButtonClass
    );
    this.closeButton.classList.add(this.options.removeButtonClass);
    this.closeButton.textContent = 'x';
    this.closeButton.addEventListener('click', _event => {
      this._onRemove();
    });

    this.wrapper.appendChild(this.emailContentNode);
    this.wrapper.appendChild(this.closeButton);

    this.validate();
  }

  public validate(): boolean {
    const _isValid = this.isValid();
    if (_isValid) this.wrapper.classList.remove(this.options.invalidEmailClass);
    else this.wrapper.classList.add(this.options.invalidEmailClass);

    return _isValid;
  }

  public isValid(): boolean {
    return isValidEmail(this.email);
  }

  private _onRemove() {
    if (this.onRemove) this.onRemove();

    this.parentInput.removeEmailBlock(this);
  }
}

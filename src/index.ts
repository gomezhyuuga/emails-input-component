import EmailsInput from './EmailsInput';
import EmailBlock from './EmailBlock';
import { generateRandomEmail } from './utils';

function exportGlobals() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).EmailsInput = EmailsInput;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).EmailBlock = EmailBlock;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__randomEmail = generateRandomEmail;
}

if (window) exportGlobals();

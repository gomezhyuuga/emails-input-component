import EmailBlock from './EmailBlock';

// var inputContainerNode = document.querySelector('#emails-input');
// var emailsInput = EmailsInput(inputContainerNode, { ...options });
console.log('adding emails...');
const emails: EmailBlock[] = [];
emails.push(new EmailBlock('john@miro.com'));
emails.push(new EmailBlock('invalid.email'));
emails.push(new EmailBlock('mike@miro.com'));
emails.push(new EmailBlock('alexander@miro.com'));
console.log('EMAILS', emails);
const sandbox = document.querySelector('#sandbox');
if (sandbox) emails.forEach(email => sandbox.appendChild(email.wrapper));
// Handling Add email and Get emails count buttons, etc.

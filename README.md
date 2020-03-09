Demo of an _Emails Component_ input. It supports pasting emails.
https://miro-demo.gomezh.dev/

## Highlights

- Source Code in **TypeScript**
- Includes unit testing using **Jest**
- Includes **Unit testing** with [Jest][jest]
- Includes **Integration testing** with [Capybara][capybara]
- Supports **IE 11** (tested using Browserstack)
- Supported browsers (run `npm run browserslist`)

<a href="https://github.com/gomezhyuuga/emails-input-component" target="_blank">
    <span class='icon'><i class='nf nf-fa-external_link_square'></i></span>
    Github Code
</a>

<a href="https://miro-demo.gomezh.dev/jsdocs/interfaces/_emailsinput_.publicapi.html" target="_blank">
    <span class='icon'><i class='nf nf-fa-external_link_square'></i></span>
    Dev Docs
</a>

## Shorthand Usage Documentation

```html
<!-- page.html -->
<div id="my-input" />
<div id="my-input2" />
...
```

```javascript
// script.js
const input = document.getElementById("my-input");
const instance1 = new EmailsInput(input);
instance1.getEmails(); // => []
instance1.addEmail("fer@miro.com");
instance1.getEmails(); // => ["fer@miro.com"]

const input2 = document.getElementById("my-input2");
// Options for EmailsInput can be found in API Docs
// https://miro-demo.gomezh.dev/jsdocs/interfaces/_emailsinput_.emailsinputoptions.html
const instance1 = new EmailsInput(input, {
  initialEmails: ["john@miro.com", "alona@miro.com"]
  onChange: newEmails => {
      console.log("Input changed: ", newEmails);
  }
});
instance2.getEmails(); // => ["john@miro.com", "alona@miro.com"]
instance2.setEmails(["one@miro.com"]); // will trigger the onChange callback
instance2.getEmails(); // => ["one@miro.com"]
instance2.removeEmail("one@miro.com");
instance2.getEmails(); // => []
```

### Dev Run

1. Clone repository:

```
git clone git@github.com:gomezhyuuga/emails-input-component.git
```

2. Install dependencies:

```
npm install
```

3. Run Dev Server and open [http://localhost:1234/]

```
❯ npm start
> @gh/emails-input@0.1.0 start /home/gomezhyuuga/dev/miro/assessment
> parcel index.html --open

Server running at http://localhost:1234
✨  Built in 845ms.
```

### Tasks

- **build**: run `npm run build`. That will generate a `docs/` folder with the distribution files.
- **test**: run `npm run test`. It will run **jest** unit tests.
- **lint**: run `npm run lint`. Linting for the project using **EsLint (format), Prettier (formatting)**.
- **browserslist**: run `npm run browserslist`. To see the current supported browsers (CSS).
- **Others**: see `package.json` file.

### Browserslist

```
❯ npm run browserslist 5s 86ms

> @gh/emails-input@0.1.0 browserslist /home/gomezhyuuga/dev/miro/assessment
> browserslist

and_chr 80
and_ff 68
and_qq 1.2
and_uc 12.12
android 80
baidu 7.12
bb 10
bb 7
chrome 80
chrome 79
edge 80
edge 79
edge 18
firefox 73
firefox 72
firefox 68
ie 11
ie 10
ie_mob 11
ie_mob 10
ios_saf 13.3
ios_saf 13.2
ios_saf 13.0-13.1
ios_saf 12.2-12.4
kaios 2.5
op_mini all
op_mob 46
op_mob 12.1
opera 66
opera 65
safari 13
safari 12.1
samsung 11.1
samsung 10.1
```

[jest]: https://jestjs.io/

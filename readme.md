# Image-fns

## Project Status

:bangbang: Work in progress. The API will be changed. Do not use it. Really. :bangbang:

Image-fns provides toolset for manipulating images in a browser

[![Uploadcare stack on StackShare][badge-stack-img]][badge-stack-url]

<!-- toc -->

- [Demo](#demo)
- [Requirements](#requirements)
- [Install](#install)
- [Usage](#usage)
- [Configuration](#configuration)
- [Security issues](#security-issues)
- [Feedback](#feedback)

<!-- tocstop -->

## Install

```
npm install image-fns
```

or

```
yarn add image-fns
```

## Usage

### Simple example

```js
const input = document.querySelector('#file')
const preview = document.querySelector('#result')

input.addEventListener('change', e =>
  fromFile(e.target.files[0])
    .then(canvas => shrink(canvas, 300, 300))
    .then(canvas => Promise.all([canvas, hasTransparency(canvas)]))
    .then(([canvas, isTransparent]) =>
      toImage(canvas, isTransparent ? 'png' : 'jpeg', 0.1)
    )
    .then(append)
)

const append = node => preview.appendChild(node)
```

### With async await

```js
const convertToBetterFormat = async file => {
  const [formats, canvas] = await Promise.all([
    getSupportedFormats(),
    fromFile(file),
  ])

  let format = 'jpeg'
  if (formats.includes('webp')) {
    format = 'webp'
  } else if (hasTransparency(canvas)) {
    format = 'png'
  }

  return toFile({ name: file.name, format, quality: 0.8 }, canvas)
}

input.addEventListener('change', async e => {
  const file = await convertToBetterFormat(e.target.files[0])

  sentToServer(file)
})
```

## Security issues

If you think you ran into something in Uploadcare libraries which might have
security implications, please hit us up at [bugbounty@uploadcare.com][uc-email-bounty]
or Hackerone.

We'll contact you personally in a short time to fix an issue through co-op and
prior to any public disclosure.

## Feedback

Issues and PRs are welcome. You can provide your feedback or drop us a support
request at [hello@uploadcare.com][uc-email-hello].

[badge-stack-img]: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
[badge-stack-url]: https://stackshare.io/uploadcare/stacks/
[uc-email-bounty]: mailto:bugbounty@uploadcare.com
[uc-email-hello]: mailto:hello@uploadcare.com
# interactive-snippet

![preview](./media/preview.gif)

## Install

```bash
npm i -D @capsule-corporation/interactive-snippet
```

## Config file

`interactive-snippet.config.js`

### Example

TODO 書く

## Commit hook

### husky

`prepare-commit-msg`

```bash
#!/bin/sh

exec < /dev/tty npx @capsule-corporation/interactive-snippet --hook $1 || true
```

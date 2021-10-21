# interactive-snippet

![preview](./media/preview.gif)

## install

```bash
npm i -D @capsule-corporation/interactive-snippet
```

## config file

`interactive-snippet.config.js`

### example

TODO 書く

## hook

### husky

`prepare-commit-msg`

```bash
#!/bin/sh

exec < /dev/tty npx @capsule-corporation/interactive-snippet --hook $1 || true
```

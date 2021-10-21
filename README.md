# interactive-snippet

https://github.com/baronTommy/test3/blob/main/media/preview.mov

https://github.com/baronTommy/test3/raw/main/media/preview.mov

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

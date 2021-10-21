# interactive-snippet

<!-- TODO パス変更 -->

![preview](https://github.com/baronTommy/test3/blob/main/media/preview.gif)

## nstall

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

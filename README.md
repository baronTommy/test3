# interactive-snippet

<!-- TODO パス変更 -->

![preview](https://github.com/baronTommy/test3/blob/main/media/eyeCatch.gif)

## Install

```bash
npm i -D @capsule-corporation/interactive-snippet
```

## Config file

`interactive-snippet.config.js`

### Example

<!-- TODO パス変更 -->

https://github.com/baronTommy/test3/blob/main/interactive-snippet.config.js

## Commit hook

### husky

`prepare-commit-msg`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

exec < /dev/tty npx interactive-snippet --hook $1
```

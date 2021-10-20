# interactive-snippet

## install

```bash
npm i -D @capsule-corporation/interactive-snippet
```

## config file

- `interactive-snippet.config.js`

### example

TODO

## hook

- prepare-commit-msg

```bash
#!/bin/sh

exec < /dev/tty npx @capsule-corporation/interactive-snippet --hook $1
```

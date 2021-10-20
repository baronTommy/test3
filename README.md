# interactive-commit-message

## install

```bash
npm i -D @capsule-corporation/interactive-commit-message
```

## config file

- `commitMSG.config.js`

### example

TODO

## hook

- prepare-commit-msg

```bash
#!/bin/sh

exec < /dev/tty npx @capsule-corporation/interactive-commit-message --hook $1
```

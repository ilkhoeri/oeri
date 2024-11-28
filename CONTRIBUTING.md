# ESLint

Inline Configuration Comments

[`reference`](https://eslint.org/docs/latest/use/command-line-interface#inline-configuration-comments)

--no-inline-config
This option prevents inline comments like `/*eslint-disable*/` or `/*global foo*/` from having any effect.

Argument Type: No argument.
This allows you to set an ESLint config without files modifying it. All inline config comments are ignored, such as:

- `/*eslint-disable*/`
- `/*eslint-enable*/`
- `/*global*/`
- `/*eslint*/`
- `/*eslint-env*/`
- `// eslint-disable-line`
- `// eslint-disable-next-line`

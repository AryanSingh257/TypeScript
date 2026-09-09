# TypeScript Practice

A small collection of TypeScript and JavaScript practice programs.

## 📁 Files

| TypeScript    | Compiled JavaScript |
| ------------- | ------------------- |
| `greeting.ts` | `greeting.js`       |
| `numberer.ts` | `numberer.js`       |
| `pricing.ts`  | `pricing.js`        |
| `temp.ts`     | `temp.js`           |

The `.ts` files contain the TypeScript source code, while the `.js` files are the JavaScript versions that can be executed directly with Node.js.

## Requirements

* [Node.js](https://nodejs.org/)
* TypeScript compiler (`tsc`)

Check that they are installed:

```bash
node --version
tsc --version
```

If TypeScript is not installed:

```bash
npm install -g typescript
```

## ▶️ Run JavaScript

JavaScript files can be executed directly with Node.js:

```bash
node greeting.js
node numberer.js
node pricing.js
node temp.js
```

## ▶️ Run TypeScript

TypeScript files need to be compiled before running.

### Compile a single file

```bash
tsc greeting.ts
node greeting.js
```

For example:

```bash
tsc numberer.ts
node numberer.js
```

### Compile all TypeScript files

```bash
tsc *.ts
```

This generates/updates the corresponding `.js` files.

Then run whichever program you want:

```bash
node greeting.js
node numberer.js
node pricing.js
node temp.js
```

## 🔄 TypeScript → JavaScript

The general workflow is:

```text
.ts source
   ↓
   tsc
   ↓
.js output
   ↓
  node
   ↓
Program output
```

For example:

```bash
tsc greeting.ts
node greeting.js
```

## 🧪 Quick Comparison

Run the JavaScript directly:

```bash
node greeting.js
```

Or compile and run the TypeScript source:

```bash
tsc greeting.ts
node greeting.js
```

Both should produce the same program behavior when the `.js` file was generated from that `.ts` source.

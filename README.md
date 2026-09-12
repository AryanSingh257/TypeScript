# TypeScript Practice

A small collection of TypeScript and JavaScript practice programs.

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
node fileName.js
```

## ▶️ Run TypeScript

TypeScript files need to be compiled before running.

### Compile a single file

```bash
tsc fileName.ts
node fileName.js
````

### Compile all TypeScript files

```bash
tsc *.ts
```

This generates/updates the corresponding `.js` files.

Then run whichever program you want:

```bash
node fileName.js
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

## 🧪 Quick Comparison

Run the JavaScript directly:

```bash
node fileName.js
```

Or compile and run the TypeScript source:

```bash
tsc fileName.ts
node fileName.js
```

Both should produce the same program behavior when the `.js` file was generated from that `.ts` source.

## Roadmap URL
https://roadmap.sh/projects/js-greeting-builder
https://roadmap.sh/projects/js-temperature-converter
https://roadmap.sh/projects/js-number-checker
https://roadmap.sh/projects/js-string-formatter
https://roadmap.sh/projects/js-price-calculator
https://roadmap.sh/projects/js-cart-total-calculator
https://roadmap.sh/projects/js-grade-report-generator
https://roadmap.sh/projects/js-task-list-utilities
https://roadmap.sh/projects/js-expense-summary
https://roadmap.sh/projects/js-product-search-and-filter
https://roadmap.sh/projects/js-user-profile-formatter
https://roadmap.sh/projects/js-quiz-score-calculator
https://roadmap.sh/projects/js-json-response-normalizer

## Roadmap Solutions URL
https://roadmap.sh/projects/js-greeting-builder/solutions?u=69e5fd6035198b31d65b82ba
https://roadmap.sh/projects/js-temperature-converter/solutions?u=69e5fd6035198b31d65b82ba
https://roadmap.sh/projects/js-number-checker/solutions?u=69e5fd6035198b31d65b82ba
https://roadmap.sh/projects/js-string-formatter/solutions?u=69e5fd6035198b31d65b82ba
https://roadmap.sh/projects/js-price-calculator/solutions?u=69e5fd6035198b31d65b82ba
https://roadmap.sh/projects/js-cart-total-calculator/solutions?u=69e5fd6035198b31d65b82ba
https://roadmap.sh/projects/js-grade-report-generator/solutions?u=69e5fd6035198b31d65b82ba
https://roadmap.sh/projects/js-task-list-utilities/solutions?u=69e5fd6035198b31d65b82ba
https://roadmap.sh/projects/js-expense-summary/solutions?u=69e5fd6035198b31d65b82ba
https://roadmap.sh/projects/js-product-search-and-filter/solutions?u=69e5fd6035198b31d65b82ba
https://roadmap.sh/projects/js-user-profile-formatter/solutions?u=69e5fd6035198b31d65b82ba
https://roadmap.sh/projects/js-quiz-score-calculator/solutions?u=69e5fd6035198b31d65b82ba

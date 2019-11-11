## Lionstooth Software Website

The Lionstooth Software's website is a fairly simple static website that uses
[Material Components](https://github.com/material-components).

## Prerequisites

Before you continue, ensure you meet the following requirements:

* You have installed the latest version of Node.js

# Develop

Install dependencies using `npm install`.

Run the locally by using `npm start` and opening http://localhost:8080 in your browser.

Changes to SCSS and JS files under the `src/` directory will trigger webpack to rebuild them and reload them in
your browser.

Changes to files under the `public/` directory will require you to refresh your browser. 

# Build

Run `npm run build` to build the static site in the `dist/` directory for deployment.

# Acknowledgements

This project structure was inspired by [these instructions](https://github.com/material-components/material-components-web/blob/master/docs/getting-started.md),
with some modifications to organize files under `src/` and `public/` directories.

# Contact

If you have any questions please contact eric@lionstoothsoftware.com.

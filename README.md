# Lionstooth Software Website

The Lionstooth Software's website is a fairly simple static website that uses

- Webpack for building the website
- Babel for transpiling the latest ECMAScript (javascript) into code that browsers support
- SASS for better stylesheet management
- Pug for generating HTML from templates
- [Material Components](https://github.com/material-components) for UI (User Interface) components
- Line Awesome for icons
- Animation.css for CSS animations

Webpack server is used to run locally on port 8080 during development to get hot reloading in the browser.

The website is deployed to an AWS S3 bucket and distributed to an AWS CloudFront CDN. The TLS certificate was created in the
AWS Certificate Manager.

Github Actions are used to automatically build and deploy the website to AWS whenever a push is made to the `deploy` branch.

The domain name and email address are managed through Namecheap.

## Prerequisites

Before you continue, ensure you meet the following requirements:

* You have installed the latest version of Node.js

## Developing

Install dependencies using `npm install`.

Run the locally by using `npm start` and opening http://localhost:8080 in your browser.

Changes to files under the `src/` directory will automatically trigger webpack to rebuild them and reload them in
your browser.

## Building

Run `npm run build` to build the static site in the `dist/` directory for deployment.

## Extending

Add more pages by creating new Pug files under `./src` (e.g. `./src/contact.pug`) and adding a new HtmlWebpackPlugin
to the plugins array in webpack.config.js.

If you need to support any new types of assets, you'll need to add them somewhere under `./src`, and
update the webpack configuration to be able to load them. (This may require installing additional Node.js modules).

If the new asset cannot be managed by webpack, then just add them to the `./public` directory. Webpack won't
automatically reload them when they change, but refreshing your browser will allow you to see the change.

## Contact

If you have any questions please contact eric@lionstoothsoftware.com.

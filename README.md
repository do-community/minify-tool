# Minify Tool

A web tool for the DigitalOcean Community to quickly minify JavaScript files.

---

## TODO

 - ~~Set fixed height for input & outputs (code & map)~~
    - ~~Probably use `max-height`, ensure Community auto-resizing doesn't run~~
 - Use tabs for error/warnings/code/map
    - Use watchers on error/warnings/map, default to code if active tab is now null
 - Provide quick preset buttons
    - Terser default (current settings)
    - Compress (enable compression but use defaults)
    - Safe compress (enable keep* in compress & mangle)
 - Header component (`do-vue/src/templates/header`)
    - Compress button
    - Toggle switch for live compression (remove current `.lazy` on input)
 - Move to do-community

## Development/Building

To setup the build/develop environment, you will need to run `npm ci` with Node 12+ installed. This
 will install the dependencies to allow you to build the project, following our lockfile.

To develop for this tool run `npm run dev`.
This will start a development server that will automatically reload the codebase when changes occur.

If you wish to host this tool on a service, simply run `npm run build`. This will run all the
 necessary build scripts automatically to build the tool.\
You can then take the `dist` folder and put it on your web server/bucket.

GitHub Actions is setup to do this automatically for this repository to deploy to gh-pages.

## Source Structure

### [`src/minify-tool`](src/minify-tool)

#### [`src/minify-tool/scss`](src/minify-tool/scss)

The scss directory contains the main SCSS styling file for the tool, which imports our do-bulma
 library and then adds tool-specific customisations.

#### [`src/minify-tool/templates`](src/minify-tool/templates)

This directory contains the Vue templates that are used to render the tool on the client-side.
`app.vue` is the main Vue file that other templates are referenced into.

#### [`src/minify-tool/i18n`](src/minify-tool/i18n)

All the strings for the tool are housed in this directory, with a file structure similar to the
 structure of the templates directory.

## Contributing

If you are contributing, please read the [contributing file](CONTRIBUTING.md) before submitting your pull requests.


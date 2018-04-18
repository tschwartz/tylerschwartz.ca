'use strict';

const npsUtils = require('nps-utils');
const httpServerPort = 8082;
const demoAppPort = process.env.npm_config_DEMO_APP_PORT || 4000;

module.exports = {
    scripts: {
        default: 'nps build',
        clean: npsUtils.rimraf('dist'),
        copy: 'cpx "src/**/*.html" dist',
        bower: 'bower i',
        bundle: {
            all: npsUtils.series.nps('bundle.bundler', 'bundle.minifyhtml', 'bundle.crisper', 'bundle.babel', 'bundle.minifyjs'),
            bundler: 'polymer-bundler "dist/ts-elements.html" --inline-scripts > "dist/ts-elements.dist.html"',
            minifyhtml: 'html-minifier --remove-comments --collapse-whitespace -o "dist/ts-elements.html" "dist/ts-elements.dist.html"',
            crisper: 'crisper --html "dist/ts-elements.html" --js "dist/ts-elements.js" "dist/ts-elements.html"',
            babel: 'babel "dist/ts-elements.js" --out-file "dist/ts-elements.js"',
            minifyjs: 'minify --mangle.keepFnName --out-file "dist/ts-elements.js" < "dist/ts-elements.js"'
        },
        build: npsUtils.series.nps('clean', 'bower', 'copy', 'bundle.all')
    }
};

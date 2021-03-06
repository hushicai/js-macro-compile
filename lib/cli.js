/**
 * @file cli
 * @author hushicai(bluthcy@gmail.com)
 */


function help() {
    console.log('  Usage: jmc [options] filename');
}

module.exports = {
    parse: function (argv) {
        var filename = argv.split(/\s+/)[0];

        if (!filename) {
            return help();
        }

        var fs = require('fs');
        var cwd = process.cwd();
        filename = require('path').resolve(cwd, filename);

        if (!fs.existsSync(filename)) {
            console.log('file not exists.');
            return;
        }

        var code = fs.readFileSync(filename, 'utf8');
        code = require('./compile')(code);

        console.log(code);
    }
};

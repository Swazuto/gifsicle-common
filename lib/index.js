const fs = require('fs');
const { fileURLToPath } = require('url');
const BinWrapper = require('bin-wrapper');
const path = require('path'); 
const pkg = JSON.parse(fs.readFileSync(fileURLToPath(new URL('../package.json', 'file://' + __dirname + '/index.js'))));
const url = `https://raw.githubusercontent.com/imagemin/gifsicle-bin/v${pkg.version}/vendor/`;

const binWrapper = new BinWrapper()
	.src(`${url}macos/gifsicle`, 'darwin')
	.src(`${url}linux/x86/gifsicle`, 'linux', 'x86')
	.src(`${url}linux/x64/gifsicle`, 'linux', 'x64')
	.src(`${url}freebsd/x86/gifsicle`, 'freebsd', 'x86')
	.src(`${url}freebsd/x64/gifsicle`, 'freebsd', 'x64')
	.src(`${url}win/x86/gifsicle.exe`, 'win32', 'x86')
	.src(`${url}win/x64/gifsicle.exe`, 'win32', 'x64')
	.dest(path.join(__dirname, '../vendor'))
	.use(process.platform === 'win32' ? 'gifsicle.exe' : 'gifsicle');

module.exports = binWrapper;

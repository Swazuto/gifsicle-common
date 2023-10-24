const path = require('path');
const binBuild = require('bin-build');
const bin = require('./index.js');

(async () => {
    try {
        await bin.run(['--version']);
        console.log('gifsicle pre-build test passed successfully');
    } catch (error) {
        console.warn(error.message);
        console.warn('gifsicle pre-build test failed');
        console.info('compiling from source');

        const binDest = bin.dest();
        const config = [
            './configure --disable-gifview --disable-gifdiff',
            `--prefix="${binDest}" --bindir="${binDest}"`,
        ].join(' ');

        try {
            const sourcePath = path.join(__dirname, '../vendor/source/gifsicle-1.93.tar.gz');
            await binBuild.file(sourcePath, [
                'autoreconf -ivf',
                config,
                'make install',
            ]);

            console.log('gifsicle built successfully');
        } catch (error) {
            console.error(error.stack);

            // eslint-disable-next-line unicorn/no-process-exit
            process.exit(1);
        }
    }
})();

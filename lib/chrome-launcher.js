
const execFile = require('child_process').execFile;

module.exports = (config) => {

    return {

        launch: (opts = [], url = 'about:blank') => {
            const chrome = config.chrome_path || '/usr/bin/chromium-browser';
            opts = opts.concat([
                '--disable-gpu',
                '--headless',
                '--remote-debugging-port=9222',
                url
            ]);
            // Remove duplicates
            opts = [ ...new Set(opts) ];
            this.chromeProc = execFile(chrome, opts);
            // Bind port for remote inspection if enabled
            if (config.enableRemoteInspect) {
                this.boundPortProc = execFile('ssh', [
                    '-L 0.0.0.0:9223:localhost:9222',
                    'localhost',
                    '-N',
                    '-v'
                ]);
            }
        },

        close: proc => {
            this.chromeProc.stdin.pause();
            this.chromeProc.kill();
            if (config.enableRemoteInspect) {
                this.boundPortProc.kill();
            }
        }
    };
};



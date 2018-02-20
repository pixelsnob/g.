
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
            this.proc = execFile(chrome, opts);
        },

        close: proc => {
            this.proc.stdin.pause();
            this.proc.kill();
        }
    };
};



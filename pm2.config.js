module.exports = {
    apps: [{
        name: 'overtime-work-confirm',
        script: './index.js',
        combine_logs: true,
        merge_logs: true,
        // instances: 4,
        // instances: "max",
        watch: './index.js',
        // ignore_watch: [],
        // watch_options: ['./'],
        log_date_format: "YYYY-MM-DD HH:mm:ss Z",
        out_file: "./pm2/out.log",
        error_file: "./pm2/error.log",
        pid_file: "./pm2/pids",

        output: './out.log',
        error: './error.log',
        log: './pm2/log.log',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }],
    /* deploy: {
        production: {
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/production',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
        }
    } */
};

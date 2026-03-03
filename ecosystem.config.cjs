module.exports = {
  apps: [
    {
      name: "dra-secure",
      cwd: "/var/www/dra-secure",
      script: "npm",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_file: "/var/www/dra-secure/.env.production",
      autorestart: true,
      max_memory_restart: "500M",
      out_file: "/var/log/pm2/dra-secure-out.log",
      error_file: "/var/log/pm2/dra-secure-error.log",
      time: true,
    },
  ],
};

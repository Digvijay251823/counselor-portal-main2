module.exports = {
  apps: [
    {
      name: "counselor-portal-main",
      script: "npm",
      args: "start",
      cwd: "/home/ec2-user/apps/counselor-portal-main",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

module.exports = {
  apps: [
    {
      name: "talenttracker-backend",
      script: "./server/dist/index.js",
      instances: 1,
      exec_mode: "fork",
      node_args: "--es-module-specifier-resolution=node --require dotenv/config",
      env: {
        NODE_ENV: "development",
        JWT_SECRET: "PLEASE_REPLACE_WITH_A_STRONG_RANDOM_SECRET_KEY_1",
        REFRESH_TOKEN_SECRET: "PLEASE_REPLACE_WITH_ANOTHER_STRONG_SECRET_KEY_2",
        PORT: 3001,
        DATABASE_URL: "postgresql://adrianoabreu:Tico1503!@localhost:5432/talenttracker",
        USE_DATABASE: "true"
      }
    },
    {
      name: "talenttracker-frontend",
      script: "npx",
      args: "serve -s client/dist -l 3000",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      env: {
        NODE_ENV: "production",
      }
    }
  ]
};

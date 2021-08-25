const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const mongoDbConnectionString = process.env.MONGO_CONNECTION_STRING;

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_CONNECTION_STRING:
          mongoDbConnectionString,
      },
    };
  } else {
    return {
      env: {
        MONGODB_CONNECTION_STRING:
          mongoDbConnectionString,
      },
    };
  }
};

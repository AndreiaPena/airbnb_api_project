const path = require('path');

module.exports = function createFixtureRoutes(fixtureURI) {
  const fixturePath = path.resolve(`seeds/`, fixtureURI);

  const Fixture = require(fixturePath);
  return Fixture();
};

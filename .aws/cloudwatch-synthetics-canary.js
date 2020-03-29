const https = require('https');
const synthetics = require('Synthetics');
const log = require('SyntheticsLogger');

const HOSTNAME = 'api.mtgeni.us';
const METHOD = 'GET';
const PATH = '/commander-banlists.json';
const PORT = 443;

const getResponse = request => {
  const responses = [];
  return new Promise((resolve, reject) => {
    request.on('response', response => {
      if (response.statusCode !== 200) {
        reject(`Status code: ${response.statusCode}`);
        return;
      }

      response.on('data', data => {
        responses.push(data.toString());
      });

      response.on('end', () => {
        resolve(responses.join(''));
      });
    });

    request.on('error', error => {
      reject(error);
    });

    request.end();
  });
};

exports.handler = async () => {
  const request = https.request({
    headers: {
      'User-Agent': synthetics.getCanaryUserAgentString(),
    },
    hostname: HOSTNAME,
    method: METHOD,
    path: PATH,
    port: PORT,
  });

  const text = await getResponse(request);
  const json = JSON.parse(text);
  if (!Array.isArray(json)) {
    throw new Error('Expected banlists to be an array.');
  }
  log.info(`Found ${json.length} banlists.`);

  for (const banlist of json) {
    if (typeof banlist.longName !== 'string') {
      throw new Error('Expected banlist to have a long name.');
    }
    if (!Array.isArray(banlist.cards)) {
      throw new Error(
        `Expected banlist cards to be an array for ${banlist.longName}.`,
      );
    }
    if (banlist.cards.length === 0) {
      throw new Error(`Missing banlist cards for ${banlist.longName}.`);
    }

    log.info(`${banlist.longName} has ${banlist.cards.length} banned cards.`);
  }
};

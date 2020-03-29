const { S3 } = require('aws-sdk');
const banlists = require('./banlists');
const fetch = require('./utils/fetch');

const s3 = new S3();

exports.handler = async () => {
  const fetchPromises = [];
  for (const { longName, parser, shortName, source } of banlists) {
    fetchPromises.push(
      (async resolve => {
        console.log(`Fetching ${shortName}.`);
        try {
          const response = await fetch(source);
          console.log(`Fetched ${shortName}.`);
          const html = await response.text();
          try {
            return {
              cards: parser(html),
              longName,
              shortName,
            };
          } catch (err) {
            console.error(`Error parsing ${shortName}:`);
            console.error(err.message);
          }
        } catch (err) {
          console.error(`Error fetching ${shortName}:`);
          console.error(err.message);
        }
        return {
          cards: null,
          longName,
          shortName,
        };
      })(),
    );
  }

  const responses = await Promise.all(fetchPromises);
  const putObjectRequest = s3.putObject({
    Body: JSON.stringify(responses),
    Bucket: 'api.mtgeni.us',
    Key: 'commander-banlists.json',
    Metadata: {
      'Content-Type': 'application/json',
    },
  });
  await putObjectRequest.promise();

  return {
    body: '',
    statusCode: 200,
  };
};

const express = require('express');
const app = express();

const appConfig = require('./config/app');
const { initialize } = require('./initializers/db');

const routes = require('./routes');

app.use(routes);

initialize()
  .then(() => {
    app.listen(appConfig.port, () => {
      console.log(`Application listening on port ${appConfig.port}`);
    });
  })
  .catch((err) => console.error(err));

// error handling bare minin

// process.on('uncaughtException', (err, origin) => {
//   console.log(process.stderr.fd, 'Caught exception:${err}\n' + 'Exception origin: ${origin}');
// });

// mongodb.initDb((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     app.listen(port);
//     console.log(`Connected to DB and listening on ${port}`);
//   }
// });

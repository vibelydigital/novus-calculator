require('dotenv').config({ path: '.env.local' });
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
  },
});
require('../src/lib/init-db'); 
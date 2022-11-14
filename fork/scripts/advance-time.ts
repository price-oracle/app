import { advanceTimeAndBlock } from './utils';

(async () => {
  console.log('Script Started');
  await advanceTimeAndBlock(3 * 24 * 3600);
  console.log('Advanced 3 days');
  console.log('Script Ended');
})();

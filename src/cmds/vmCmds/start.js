import { logSuccess, logError } from '../../utils/logger';
import { Virtstand } from '../../project/virtstand';
import { isEmpty } from 'lodash';
import { handler as compile } from './compile';

export const command = 'start';
export const desc = 'Starts all VMs or a single specified VM';
export const builder = yargs =>
  yargs.option('name', {
    alias: 'n',
    string: true,
    describe: 'VM name',
    requiresArg: false,
  });

export const handler = async argv => {
  await compile(argv);
  await run(argv.name);
};

async function run(name) {
  const virtstand = new Virtstand();
  await virtstand.init('./');
  if (isEmpty(name)) {
    await virtstand.start();
    logSuccess(`Started all VMs`);
  } else {
    await virtstand.start(name);
    logSuccess(`Started VM '${name}'.`);
  }
}

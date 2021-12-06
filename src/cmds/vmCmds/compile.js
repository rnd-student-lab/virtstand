import { logSuccess, logError } from '../../utils/logger';
import { Virtstand } from '../../project/virtstand';
import { isEmpty } from 'lodash';

export const command = 'compile';
export const desc = 'Compile all VMs or a single specified VM';
export const builder = yargs =>
  yargs.option('name', {
    alias: 'n',
    string: true,
    describe: 'VM name',
    requiresArg: false,
  });

export const handler = async argv => {
  await run(argv.name);
};

async function run(name) {
  const virtstand = new Virtstand();
  await virtstand.init('./');
  if (isEmpty(name)) {
    await virtstand.compile();
    logSuccess(`Compiled all VMs`);
  } else {
    await virtstand.compile(name);
    logSuccess(`Compiled VM '${name}'`);
  }
}

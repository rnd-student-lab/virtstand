import { isEmpty } from 'lodash';
import { stringify } from 'yaml';
import { logSuccess, logInfo } from '../../utils/logger';
import Virtstand from '../../project/virtstand';
import { handler as compile } from './compile';

export const command = 'status';
export const desc = 'Displays current status for all VMs or a single specified VM';
export const builder = yargs => yargs
  .option('name', {
    alias: 'n',
    string: true,
    describe: 'VM name',
    requiresArg: true,
    required: false,
  })
  .option('stage', {
    alias: 's',
    string: true,
    describe: 'Stage name',
    requiresArg: true,
    required: false,
  });

export const handler = async argv => {
  await compile(argv);
  await run(argv);
};

export async function run(argv) {
  const { name, stage } = argv;

  const virtstand = new Virtstand();
  await virtstand.init('./', stage);
  if (isEmpty(name)) {
    const statuses = await virtstand.status();
    logSuccess('VMs statuses:');
    logInfo(stringify(statuses));
  } else {
    const statuses = await virtstand.status(name);
    logSuccess(`VM '${name}' status:`);
    logInfo(stringify(statuses));
  }
}

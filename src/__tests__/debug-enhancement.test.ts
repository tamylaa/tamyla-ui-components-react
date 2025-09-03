/**
 * Debug Factory Enhancement
 */

import { factoryImporter } from '../core/factory/factory-importer';

describe('Debug Factory Enhancement', () => {
  test('Check factory names and enhancement logic', async () => {
    const buttonFactory = await factoryImporter.getFactory('ButtonFactory');
    
    console.log('ButtonFactory:', buttonFactory);
    console.log('ButtonFactory name:', buttonFactory?.name);
    console.log('ButtonFactory constructor name:', buttonFactory?.constructor?.name);
    console.log('ButtonFactory keys:', Object.keys(buttonFactory || {}));
    
    // Check what the original factory looks like before enhancement
    console.log('Available factories:', factoryImporter.getAvailableFactories());
  });
});

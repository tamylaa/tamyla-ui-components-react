/**
 * Test if the factory bridge can work with vanilla components
 */

// Test what the Button factory actually returns
const testVanillaIntegration = async () => {
  try {
    // Import vanilla components dynamically
    const { ButtonFactory } = await import('@tamyla/ui-components');
    console.log('ButtonFactory imported:', typeof ButtonFactory);
    
    if (ButtonFactory) {
      // Create an instance
      const buttonFactory = new ButtonFactory();
      console.log('ButtonFactory instance created');
      console.log('ButtonFactory methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(buttonFactory)));
      
      // Test the create method
      if (typeof buttonFactory.create === 'function') {
        console.log('Creating button...');
        
        // Create a simple DOM environment for testing
        const { JSDOM } = require('jsdom');
        const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        global.document = dom.window.document;
        global.window = dom.window;
        global.HTMLElement = dom.window.HTMLElement;
        global.navigator = dom.window.navigator;
        
        const button = buttonFactory.create({ text: 'Test Button' });
        console.log('Created button:', button);
        console.log('Button type:', button.constructor.name);
        console.log('Is HTMLElement?', button instanceof HTMLElement);
        
        return button;
      } else {
        console.error('ButtonFactory.create is not a function');
      }
    } else {
      console.error('ButtonFactory not found in exports');
    }
  } catch (error) {
    console.error('Failed to test vanilla integration:', error);
  }
};

// Run the test
testVanillaIntegration();

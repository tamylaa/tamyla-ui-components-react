/**
 * Factory Test - Check which factories are working
 */

import { 
  ButtonFactory, 
  InputFactory, 
  InputGroupFactory,
  CardFactory, 
  StatusIndicatorFactory, 
  ActionCardFactory,
  SearchBarFactory,
  ContentCardFactory,
  FileListFactory,
  NotificationFactory,
  SearchInterfaceFactory
} from '@tamyla/ui-components';

console.log('=== FACTORY TYPE ANALYSIS ===');

// Test Button Factory
try {
  const buttonFactory = new ButtonFactory();
  console.log('✅ ButtonFactory: Class instance');
} catch (e) {
  console.log('❌ ButtonFactory error:', e.message);
}

// Test Input Factory  
try {
  const inputFactory = new InputFactory();
  console.log('✅ InputFactory: Class instance');
} catch (e) {
  console.log('❌ InputFactory error:', e.message);
}

// Test InputGroup Factory
try {
  const result = InputGroupFactory({ placeholder: 'test' });
  console.log('✅ InputGroupFactory: Function factory');
} catch (e) {
  try {
    const inputGroupFactory = new InputGroupFactory();
    console.log('✅ InputGroupFactory: Class instance');
  } catch (e2) {
    console.log('❌ InputGroupFactory error:', e.message, e2.message);
  }
}

// Test Card Factory
try {
  const cardFactory = new CardFactory();
  console.log('✅ CardFactory: Class instance');
} catch (e) {
  console.log('❌ CardFactory error:', e.message);
}

// Test StatusIndicator Factory
try {
  const statusFactory = new StatusIndicatorFactory();
  console.log('✅ StatusIndicatorFactory: Class instance');
} catch (e) {
  console.log('❌ StatusIndicatorFactory error:', e.message);
}

// Test ActionCard Factory
try {
  const actionCardFactory = new ActionCardFactory();
  console.log('✅ ActionCardFactory: Class instance');
} catch (e) {
  console.log('❌ ActionCardFactory error:', e.message);
}

// Test SearchBar Factory  
try {
  const searchBarFactory = new SearchBarFactory();
  console.log('✅ SearchBarFactory: Class instance');
} catch (e) {
  console.log('❌ SearchBarFactory error:', e.message);
}

// Test ContentCard Factory
try {
  const contentCardFactory = new ContentCardFactory();
  console.log('✅ ContentCardFactory: Class instance');
} catch (e) {
  try {
    const result = ContentCardFactory({ title: 'test' });
    console.log('✅ ContentCardFactory: Function factory');
  } catch (e2) {
    console.log('❌ ContentCardFactory error:', e.message, e2.message);
  }
}

// Test FileList Factory
try {
  const fileListFactory = new FileListFactory();
  console.log('✅ FileListFactory: Class instance');
} catch (e) {
  try {
    const result = FileListFactory({ files: [] });
    console.log('✅ FileListFactory: Function factory');
  } catch (e2) {
    console.log('❌ FileListFactory error:', e.message, e2.message);
  }
}

// Test Notification Factory
try {
  const notificationFactory = new NotificationFactory();
  console.log('✅ NotificationFactory: Class instance');
} catch (e) {
  try {
    const result = NotificationFactory({ message: 'test' });
    console.log('✅ NotificationFactory: Function factory');
  } catch (e2) {
    console.log('❌ NotificationFactory error:', e.message, e2.message);
  }
}

// Test SearchInterface Factory
try {
  const searchInterfaceFactory = new SearchInterfaceFactory();
  console.log('✅ SearchInterfaceFactory: Class instance');
} catch (e) {
  try {
    const result = SearchInterfaceFactory({ placeholder: 'test' });
    console.log('✅ SearchInterfaceFactory: Function factory');
  } catch (e2) {
    console.log('❌ SearchInterfaceFactory error:', e.message, e2.message);
  }
}

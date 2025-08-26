// Factory Type Test - Validates factory types and instantiation patterns
import fs from 'fs';
import path from 'path';

console.log('Factory Type Validation Test');
console.log('==========================\n');

// Read the built file and analyze factory exports
const distPath = '../ui-components/dist/tamyla-ui.esm.js';
const buildPath = path.resolve(distPath);

try {
  const buildContent = fs.readFileSync(buildPath, 'utf8');
  
  console.log('✅ Successfully loaded ui-components build file');
  console.log(`📊 File size: ${Math.round(buildContent.length / 1024)}KB\n`);
  
  // Look for factory exports and patterns
  console.log('🔍 Factory Export Analysis:');
  console.log('---------------------------');
  
  const factoryPattern = /(\w+Factory):\s*([^,}]+)/g;
  let match;
  const foundFactories = [];
  
  while ((match = factoryPattern.exec(buildContent)) !== null) {
    foundFactories.push({
      name: match[1],
      definition: match[2].trim()
    });
  }
  
  foundFactories.forEach(factory => {
    console.log(`📦 ${factory.name}: ${factory.definition}`);
  });
  
  console.log(`\n✅ Found ${foundFactories.length} factory exports`);
  
  // Check for class vs function patterns
  console.log('\n🔍 Factory Pattern Analysis:');
  console.log('----------------------------');
  
  const classPattern = /class\s+(\w*Factory)\s*{/g;
  const functionPattern = /const\s+(\w*Factory)\s*=/g;
  const newInstancePattern = /new\s+(\w*Factory)/g;
  
  const classFactories = [];
  const functionFactories = [];
  const newInstances = [];
  
  let classMatch;
  while ((classMatch = classPattern.exec(buildContent)) !== null) {
    classFactories.push(classMatch[1]);
  }
  
  let functionMatch;
  while ((functionMatch = functionPattern.exec(buildContent)) !== null) {
    functionFactories.push(functionMatch[1]);
  }
  
  let newMatch;
  while ((newMatch = newInstancePattern.exec(buildContent)) !== null) {
    newInstances.push(newMatch[1]);
  }
  
  console.log(`🏗️  Class Factories: ${classFactories.join(', ')}`);
  console.log(`⚡ Function Factories: ${functionFactories.join(', ')}`);
  console.log(`🆕 New Instances: ${newInstances.join(', ')}`);
  
  // Analysis for bridge patterns
  console.log('\n📋 Bridge Pattern Recommendations:');
  console.log('-----------------------------------');
  
  // Categorize by atomic design
  const atoms = ['ButtonFactory', 'InputFactory', 'CardFactory', 'StatusIndicatorFactory', 'InputGroupFactory'];
  const molecules = ['ActionCardFactory', 'SearchBarFactory', 'ContentCardFactory', 'FileListFactory', 'NotificationFactory'];
  const organisms = ['SearchInterfaceFactory'];
  const applications = ['EnhancedSearchApplicationFactory', 'ContentManagerApplicationFactory', 'CampaignSelectorSystem'];
  
  console.log('🔬 Atom Factories (direct instantiation):');
  atoms.forEach(factory => {
    const isClass = classFactories.includes(factory);
    const isFunction = functionFactories.includes(factory);
    const hasNewInstance = newInstances.includes(factory);
    
    if (isClass && hasNewInstance) {
      console.log(`  ✅ ${factory}: Class with new instances (use new ${factory}())`);
    } else if (isFunction) {
      console.log(`  ✅ ${factory}: Function/const (use ${factory} directly)`);
    } else {
      console.log(`  ❓ ${factory}: Pattern unclear`);
    }
  });
  
  console.log('\n🧬 Molecule Factories:');
  molecules.forEach(factory => {
    const isClass = classFactories.includes(factory);
    const isFunction = functionFactories.includes(factory);
    const hasNewInstance = newInstances.includes(factory);
    
    if (isClass && hasNewInstance) {
      console.log(`  ✅ ${factory}: Class with new instances (use new ${factory}())`);
    } else if (isFunction) {
      console.log(`  ✅ ${factory}: Function/const (use ${factory} directly)`);
    } else {
      console.log(`  ❓ ${factory}: Pattern unclear`);
    }
  });
  
  console.log('\n🦠 Organism Factories:');
  organisms.forEach(factory => {
    const isClass = classFactories.includes(factory);
    const isFunction = functionFactories.includes(factory);
    const hasNewInstance = newInstances.includes(factory);
    
    if (isClass && hasNewInstance) {
      console.log(`  ✅ ${factory}: Class with new instances (use new ${factory}())`);
    } else if (isFunction) {
      console.log(`  ✅ ${factory}: Function/const (use ${factory} directly)`);
    } else {
      console.log(`  ❓ ${factory}: Pattern unclear`);
    }
  });
  
  console.log('\n🏢 Application Factories:');
  applications.forEach(factory => {
    const isClass = classFactories.includes(factory);
    const isFunction = functionFactories.includes(factory);
    const hasNewInstance = newInstances.includes(factory);
    
    if (isClass && hasNewInstance) {
      console.log(`  ✅ ${factory}: Class with new instances (use new ${factory}())`);
    } else if (isFunction) {
      console.log(`  ✅ ${factory}: Function/const (use ${factory} directly)`);
    } else {
      console.log(`  ❓ ${factory}: Pattern unclear`);
    }
  });
  
  console.log('\n🎯 Summary:');
  console.log('-----------');
  console.log(`Total Factories Found: ${foundFactories.length}`);
  console.log(`Class Factories: ${classFactories.length}`);
  console.log(`Function/Const Factories: ${functionFactories.length}`);
  console.log(`Factories with new instances: ${newInstances.length}`);
  
} catch (error) {
  console.error('❌ Error reading build file:', error.message);
  process.exit(1);
}

// Simple test to show current status
console.log('Testing the built package...');

console.log('Current working directory:', process.cwd());
console.log('Node version:', process.version);
console.log('Platform:', process.platform);

try {
  const module = await import('./dist/index.esm.js');
  console.log('✅ Module loaded successfully');
  console.log('Exports count:', Object.keys(module).length);
  console.log('Key exports:', ['Button', 'FactoryBridge', 'designTokens'].filter(key => module[key]).join(', '));
} catch (error) {
  console.log('❌ Module failed to load');
  console.log('Error:', error.message);
  console.log('Stack:', error.stack?.split('\n')[0]);
}

// Quick test to check Modal export
import('./dist/index.esm.js').then(module => {
  console.log('Modal exported?', !!module.Modal);
  console.log('Modal type:', typeof module.Modal);
  console.log('Modal:', module.Modal);
  
  // List all exports that contain 'modal' (case insensitive)
  const modalExports = Object.keys(module).filter(key => 
    key.toLowerCase().includes('modal')
  );
  console.log('Modal-related exports:', modalExports);
}).catch(err => {
  console.error('Import failed:', err);
});

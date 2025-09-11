// Comprehensive test for all exports in the built package
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the built file content
const builtFilePath = path.join(__dirname, 'dist', 'index.esm.js');
const builtContent = fs.readFileSync(builtFilePath, 'utf8');

console.log('🔍 COMPREHENSIVE EXPORT ANALYSIS\n');

// Define all expected exports from the source
const expectedExports = {
  // Core Components
  components: [
    'Button', 'Input', 'Card', 'CardHeader', 'CardTitle', 'CardContent',
    'StatusIndicator', 'ErrorBoundary', 'ButtonPrimary', 'ButtonSecondary',
    'ButtonGhost', 'ButtonDanger', 'ButtonSuccess', 'ButtonWithIcon',
    'ButtonIconOnly', 'InputGroup'
  ],

  // Form Components
  forms: [
    'FormItem', 'FormLabel', 'FormControl', 'FormDescription', 'FormMessage',
    'FormField', 'FormInput', 'FormTextarea', 'Select', 'Checkbox',
    'RadioGroup', 'RadioGroupItem', 'Switch', 'Slider'
  ],

  // Feedback Components
  feedback: [
    'Alert', 'AlertTitle', 'AlertDescription', 'Progress', 'Badge', 'Avatar'
  ],

  // Data Display
  dataDisplay: [
    'Table', 'TableHeader', 'TableBody', 'TableFooter', 'TableHead',
    'TableRow', 'TableCell', 'TableCaption', 'Calendar'
  ],

  // Loading/Interaction
  loading: [
    'Skeleton', 'HoverCard', 'HoverCardTrigger', 'HoverCardContent',
    'Popover', 'PopoverTrigger', 'PopoverContent'
  ],

  // Molecules (Factory)
  molecules: [
    'ActionCard', 'ContentCard', 'FileList', 'Notification',
    'SearchBar', 'SearchBarNew'
  ],

  // Organisms
  organisms: [
    'Dialog', 'DialogTrigger', 'DialogContent', 'DialogHeader', 'DialogTitle',
    'DialogDescription', 'DialogFooter', 'DialogClose', 'Navigation',
    'NavigationMenu', 'NavigationMenuItem', 'NavigationMenuTrigger',
    'NavigationMenuContent'
  ],

  // Organisms (Factory)
  organismsFactory: [
    'Dashboard', 'DashboardSearch', 'DashboardContent', 'DashboardKnowledge',
    'DashboardMedia', 'SearchInterface', 'Reward', 'Modal', 'MobileSidebar'
  ],

  // Applications
  applications: [
    'CampaignSelector', 'ContentManager', 'EnhancedSearch'
  ],

  // Redux Store
  redux: [
    'store', 'persistor', 'authActions', 'uiActions', 'themeActions', 'componentActions',
    'reduxStore', 'reduxPersistor', 'reduxAuthActions', 'reduxUiActions',
    'reduxThemeActions', 'reduxComponentActions'
  ],

  // Hooks
  hooks: [
    'useAppDispatch', 'useAppSelector', 'useAuth', 'useUI', 'useTheme',
    'useComponent', 'useResponsive', 'useSearch', 'useLoading', 'useNotifications'
  ],

  // Redux Optional
  reduxOptional: [
    'useAppDispatchOptional', 'useAppSelectorOptional', 'useThemeOptional',
    'useUIOptional', 'useAnalyticsOptional', 'ThemeProvider', 'UIProvider', 'hasRedux'
  ],

  // Performance Utils
  performance: [
    'smartMemo', 'autoMemo', 'heavyMemo', 'createLazyComponent', 'batchLazy',
    'MEMOIZATION_CONFIG', 'LAZY_LOADING_CONFIG', 'MONITORING_CONFIG'
  ],

  // Loading Components
  loadingComponents: [
    'LoadingSpinner', 'LoadingDashboard', 'LoadingSearch', 'LoadingManager'
  ],

  // Infrastructure
  infrastructure: [
    'designTokens', 'TamylaThemeProvider', 'GlobalStyles', 'useTamylaTheme',
    'VERSION', 'BUILD_DATE', 'FEATURES'
  ]
};

let totalFound = 0;
let totalExpected = 0;

// Check each category
Object.entries(expectedExports).forEach(([category, exports]) => {
  console.log(`📁 ${category.toUpperCase()}:`);
  let foundInCategory = 0;

  exports.forEach(exportName => {
    totalExpected++;
    if (builtContent.includes(`export {`) &&
        (builtContent.includes(`, ${exportName},`) ||
         builtContent.includes(`${exportName},`) ||
         builtContent.includes(`, ${exportName} `))) {
      console.log(`  ✓ ${exportName}`);
      foundInCategory++;
      totalFound++;
    } else {
      console.log(`  ✗ ${exportName}`);
    }
  });

  console.log(`  📊 ${category}: ${foundInCategory}/${exports.length} found\n`);
});

console.log('📈 SUMMARY:');
console.log(`Total exports found: ${totalFound}/${totalExpected}`);
console.log(`Success rate: ${Math.round((totalFound/totalExpected) * 100)}%`);

if (totalFound === totalExpected) {
  console.log('\n🎉 SUCCESS: All exports are present!');
} else {
  console.log('\n⚠️  WARNING: Some exports may be missing');
}

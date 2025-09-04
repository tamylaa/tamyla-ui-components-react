/**
 * Tamyla UI React Components v1.1.1
 *
 * ARCHITECTURE: Dual-mode component library
 * - Native React: Pure React implementations for simple components
 * - Wrapper React: Factory-based wrappers for complex components
 *
 * This provides the best of both worlds: performance + feature completeness
 */

// ============================================
// NATIVE REACT COMPONENTS (Pure React, High Performance)
// ============================================
export * from './components';

// Enhanced shadcn/ui inspired components with Redux integration
export { Button } from './components/atoms/Button';
export { Input } from './components/atoms/Input';
export { Card } from './components/atoms/Card';
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from './components/organisms/Dialog';
export {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormInput,
  FormTextarea
} from './components/molecules/Form';
export {
  Navigation,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent
} from './components/organisms/Navigation';

// ============================================
// WRAPPER REACT COMPONENTS (Factory-based, Feature Complete)
// ============================================

// ATOMS - Factory Wrappers (12 components - COMPLETE parity)
export { default as ButtonPrimary } from './components/atoms/ButtonPrimary';
export { default as ButtonSecondary } from './components/atoms/ButtonSecondary';
export { default as ButtonGhost } from './components/atoms/ButtonGhost';
export { default as ButtonDanger } from './components/atoms/ButtonDanger';
export { default as ButtonSuccess } from './components/atoms/ButtonSuccess';
export { default as ButtonWithIcon } from './components/atoms/ButtonWithIcon';
export { default as ButtonIconOnly } from './components/atoms/ButtonIconOnly';
export { default as InputGroup } from './components/atoms/InputGroup';

// MOLECULES - Factory Wrappers (6 components - COMPLETE parity)
export { default as SearchBar } from './components/molecules/SearchBar';
export { default as SearchBarNew } from './components/molecules/SearchBarNew';
export { default as ActionCard } from './components/molecules/ActionCard';
export { default as ContentCard } from './components/molecules/ContentCard';
export { default as FileList } from './components/molecules/FileList';
export { default as Notification } from './components/molecules/Notification';

// ORGANISMS - Factory Wrappers (5 components + Dashboard variants)
export { default as Dashboard, DashboardSearch, DashboardContent, DashboardKnowledge, DashboardMedia } from './components/organisms/Dashboard';
export { default as SearchInterface } from './components/organisms/SearchInterface';
export { default as Reward } from './components/organisms/Reward';
export { default as Modal } from './components/organisms/Modal';
export { default as MobileSidebar } from './components/organisms/MobileSidebar';

// APPLICATIONS - Factory Wrappers (3 components - COMPLETE parity)
export { default as EnhancedSearch } from './components/applications/EnhancedSearch';
export { default as ContentManager } from './components/applications/ContentManager';
export { default as CampaignSelector } from './components/applications/CampaignSelector';

// ============================================
// SHARED INFRASTRUCTURE
// ============================================

// Core design tokens
export { designTokens } from './core/design-tokens';

// Store exports
export { store, persistor } from './store/store';
export { authActions, uiActions, themeActions, componentActions } from './store/store';

// Hooks exports
export {
  useAppDispatch,
  useAppSelector,
  useAuth,
  useUI,
  useTheme,
  useComponent,
  useResponsive,
  useSearch,
  useLoading,
  useNotifications
} from './store/hooks';

// Package metadata
export const VERSION = '1.0.0';
export const BUILD_DATE = new Date().toISOString();
export const FEATURES = [
  'React 18 with TypeScript',
  'Redux Toolkit state management',
  'Styled-components theming',
  'Framer Motion animations',
  'Design token system',
  'Accessibility (WCAG 2.1 AA)',
  'Responsive design',
  'Tree-shaking support',
  'Storybook documentation',
  'Jest testing suite',
  'Dual-mode architecture: Native + Wrapper components'
];

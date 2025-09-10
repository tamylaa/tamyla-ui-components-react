/**
 * React Components Library - Organized by Atomic Design Pattern
 * Enhanced shadcn/ui inspired components with Redux integration
 */

// ===== ATOMS =====
// Basic building blocks
export { Button } from './atoms/Button';
export { Input } from './atoms/Input';
export { default as Card } from './atoms/Card';
export { CardHeader, CardTitle, CardContent } from './atoms/Card';
export { StatusIndicator } from './atoms/StatusIndicator';
export { default as ErrorBoundary } from './atoms/ErrorBoundary';

// Button Variants (Factory-based)
export { default as ButtonPrimary } from './atoms/ButtonPrimary';
export { default as ButtonSecondary } from './atoms/ButtonSecondary';
export { default as ButtonGhost } from './atoms/ButtonGhost';
export { default as ButtonDanger } from './atoms/ButtonDanger';
export { default as ButtonSuccess } from './atoms/ButtonSuccess';
export { default as ButtonWithIcon } from './atoms/ButtonWithIcon';
export { default as ButtonIconOnly } from './atoms/ButtonIconOnly';
export { default as InputGroup } from './atoms/InputGroup';

// ===== MOLECULES =====
// Combinations of atoms
export {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,  // 🆕 ADDED
  FormMessage,
  FormField,        // 🆕 ADDED
  FormInput,        // 🆕 ADDED
  FormTextarea
} from './molecules/Form';

export {
  Select,
  Checkbox,
  RadioGroup,
  RadioGroupItem,
  Switch,
  Slider
} from './molecules/FormAdvanced';

export {
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  Badge,
  Avatar
} from './molecules/Feedback';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  Calendar
} from './molecules/DataDisplay';

export {
  Skeleton,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Popover,
  PopoverTrigger,
  PopoverContent
} from './molecules/Loading';

// Additional Molecules (Factory-based)
export { default as ActionCard } from './molecules/ActionCard';
export { default as ContentCard } from './molecules/ContentCard';
export { default as FileList } from './molecules/FileList';
export { default as Notification } from './molecules/Notification';
export { default as SearchBar } from './molecules/SearchBar';
export { default as SearchBarNew } from './molecules/SearchBarNew';

// ===== ORGANISMS =====
// Complex components made of molecules and atoms
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter      // 🆕 ADDED
} from './organisms/Dialog';

export {
  Navigation,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent
} from './organisms/Navigation';

// Additional Organisms (Factory-based)
export { default as Dashboard, DashboardSearch, DashboardContent, DashboardKnowledge, DashboardMedia } from './organisms/Dashboard';
export { default as SearchInterface } from './organisms/SearchInterface';
export { default as Reward } from './organisms/Reward';
export { default as Modal } from './organisms/Modal';
export { default as MobileSidebar } from './organisms/MobileSidebar';

// ===== APPLICATIONS =====
// Full application features
export { default as CampaignSelector } from './applications/CampaignSelector';
export { default as ContentManager } from './applications/ContentManager';
export { default as EnhancedSearch } from './applications/EnhancedSearch';

// ===== DEMOS =====
// Demo and example components (temporarily disabled due to build issues)
// export { default as ComponentDemo } from '../demos/ComponentDemo';
// export { default as SimpleDemo } from '../demos/SimpleDemo';

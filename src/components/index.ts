/**
 * React Components Library - Organized by Atomic Design Pattern
 * Enhanced shadcn/ui inspired components with Redux integration
 */

// ===== ATOMS =====
// Basic building blocks
export { Button } from './atoms/Button';
export { Input } from './atoms/Input';
export { Card } from './atoms/Card';
export { StatusIndicator } from './atoms/StatusIndicator';

// ===== MOLECULES =====
// Combinations of atoms
export {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
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

// ===== ORGANISMS =====
// Complex components made of molecules and atoms
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from './organisms/Dialog';

export {
  Navigation,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent
} from './organisms/Navigation';

// ===== APPLICATIONS =====
// Full application features
export { default as CampaignSelector } from './applications/CampaignSelector';
export { default as ContentManager } from './applications/ContentManager';
export { default as EnhancedSearch } from './applications/EnhancedSearch';

// ===== DEMOS =====
// Demo and example components (temporarily disabled due to build issues)
// export { default as ComponentDemo } from '../demos/ComponentDemo';
// export { default as SimpleDemo } from '../demos/SimpleDemo';

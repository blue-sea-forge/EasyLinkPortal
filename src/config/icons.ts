import {
  BookOpen,
  Calendar,
  ChartColumn,
  Cloud,
  Code,
  CreditCard,
  Database,
  FileText,
  Folder,
  GitBranch,
  GraduationCap,
  Globe,
  House,
  Image as ImageIcon,
  Link,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Music,
  Newspaper,
  Phone,
  Server,
  Settings,
  Shield,
  ShoppingCart,
  Terminal,
  Users,
  Video,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons a tile can use. The config file refers to them by name, because JSON
 * cannot hold a component. Only these are bundled: importing every lucide icon
 * would add hundreds of kB to the page.
 */
export const ICONS = {
  "book-open": BookOpen,
  calendar: Calendar,
  chart: ChartColumn,
  cloud: Cloud,
  code: Code,
  "credit-card": CreditCard,
  database: Database,
  "file-text": FileText,
  folder: Folder,
  "git-branch": GitBranch,
  globe: Globe,
  "graduation-cap": GraduationCap,
  home: House,
  image: ImageIcon,
  link: Link,
  lock: Lock,
  mail: Mail,
  "map-pin": MapPin,
  "message-square": MessageSquare,
  music: Music,
  newspaper: Newspaper,
  phone: Phone,
  server: Server,
  settings: Settings,
  shield: Shield,
  "shopping-cart": ShoppingCart,
  terminal: Terminal,
  users: Users,
  video: Video,
  wrench: Wrench,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export const ICON_NAMES = Object.keys(ICONS) as IconName[];

export function isIconName(value: unknown): value is IconName {
  return typeof value === "string" && value in ICONS;
}

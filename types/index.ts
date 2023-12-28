export type NavItem = {
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}
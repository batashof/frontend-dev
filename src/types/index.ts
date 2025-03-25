export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any, row: any) => React.ReactNode | string;
  filter?: { label: string; value: string }[] | string;
}

export interface SidebarItemProps {
  icon?: React.ReactNode;
  text: string;
  path: string;
  subItems?: SidebarItemProps[];
}
export interface FilterItem {
  value?: string;
  label?: string;
  startDate?: string | null;
  endDate?: string | null;
  columnLabel: string;
}

export type FiltersState = { [key: string]: FilterItem[] };

export type CheckedStatuses = {
  [key: string]: boolean;
};

export type DropDownMenuTypes = {
  options: string[];
  checkedStatuses: CheckedStatuses;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  menuName: string;
};

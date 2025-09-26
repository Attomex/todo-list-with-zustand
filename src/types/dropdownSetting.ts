export type DropdownItem = {
    id: number;
    label: string | React.ReactNode;
    extra?: React.ReactNode;
    onClick?: () => void;
}
import React, { useEffect, useRef, useState } from "react";
import styles from "./DropdownSettings.module.css";
import type { DropdownItem } from "../../types";

interface DropdownSettingsProps {
    btnStyle: string;
    svg: React.ReactNode;
    items: DropdownItem[];
}

export const DropdownSettings: React.FC<DropdownSettingsProps> = ({ btnStyle, svg, items }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [open]);

    const handleItemClick = (item: DropdownItem) => {
        if (item.onClick) item.onClick();
        setOpen(false);
    };

    return (
        <div ref={dropdownRef}>
            <div className={btnStyle} onClick={() => setOpen((prev) => !prev)}>
                {svg}
            </div>
            {open && (
                <ul className={styles["dropdown-menu"]}>
                    {items.map((item, index) => (
                        <li key={index} className={styles["dropdown-item"]} onClick={() => handleItemClick(item)}>
                            {item.extra ? 
                                <span><span className={styles["extra"]}>{item.extra}</span>{item.label}</span>
                                
                            :
                                <span>{item.label}</span>
                            }
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

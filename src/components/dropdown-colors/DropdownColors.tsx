import React, { useEffect, useRef, useState } from "react";
import styles from "./DropdownColors.module.css";
import { Colors } from "../../types";

interface DropdownColorsProps {
    id: string;
    items: string[];
    selected: Colors;
    setSelected: (color: Colors) => void;
}

export const DropdownColors: React.FC<DropdownColorsProps> = ({ id, items, selected, setSelected }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <div className={styles["dropdown"]} ref={dropdownRef}>
            <button id={id} type="button" className={styles["dropdown-btn"]} onClick={() => setOpen((prev) => !prev)}>
                <span className={styles["color-circle"]} style={{ backgroundColor: selected }}></span>
            </button>

            {open && (
                <ul className={styles["dropdown-menu"]}>
                    {items.map((color, index) => (
                        <li
                            key={index}
                            className={styles["dropdown-item"]}
                            onClick={() => {
                                setSelected(color as Colors);
                                setOpen(false);
                            }}
                            style={(color === selected ? { backgroundColor: "lightgray" } : {}) }
                            title={color}
                        >
                            <span className={styles["color-circle"]} style={{ backgroundColor: color }}></span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

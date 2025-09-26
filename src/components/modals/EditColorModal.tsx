import styles from "./EditColorModal.module.css";
import { Modal } from "../modal/Modal";
import { ALL_COLORS, Item } from "../../types";
import { DropdownColors } from "../dropdown-colors";
import { useState } from "react";
import { useTask } from "../../store/store-zustand";

interface EditColorModalProps {
    item: Item;
    number: string;
    close: (bool: boolean) => void;
}

export const EditColorModal: React.FC<EditColorModalProps> = ({ item, number, close }) => {
    const mutAllColors: string[] = [...ALL_COLORS];
    const [currColor, setCurrColor] = useState(item.color);

    const editTask = useTask((state) => state.editTodo);

    const handleChangeColor = () => {
        const formatedTask = {
            ...item,
            color: currColor,
        }

        try {
            editTask(number, formatedTask);
        } catch (error) {
            alert(error);
        }
        close(false);
    };

    return (
        <Modal
            title={"Редактирование цвета"}
            footer={
                <button className={styles["button-submit"]} onClick={handleChangeColor}>
                    Готово
                </button>
            }
            close={() => close(false)}
        >
            <div className={styles["systematize"]}>
                <p>Выберите цвет</p>
                <DropdownColors
                    id={"color"}
                    items={mutAllColors}
                    selected={currColor}
                    setSelected={(color) => setCurrColor( color )}
                />
            </div>
        </Modal>
    );
};

import { useState } from "react";
import { Item } from "../../types";
import { Modal } from "../modal";
import styles from "./EditModal.module.css";
import { MAX_TITLE_SIZE } from "../create-task/CreateTask";
import { useTask } from "../../store/store-zustand";

interface EditModalProps {
    item: Item;
    number: string;
    close: (bool: boolean) => void;
}

export const EditModal: React.FC<EditModalProps> = ({ item, number, close }) => {
    const [mutItem, setMutItem] = useState<Item>(item);

    const editTask = useTask((state) => state.editTodo);

    const handleClose = () => {
        close(false);
        setMutItem({
            title: "",
            desc: "",
            createdAt: "",
            deadline: "",
            status: "not-done",
            color: "red",
            uid: "",
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            editTask(number, mutItem);
        } catch (error) {
            alert(error);
        }
        alert("Задача изменена");
        handleClose();
    };

    return (
        <Modal title={"Редактирование задачи"} footer={null} close={handleClose}>
            <form action="" onSubmit={handleSubmit} className={styles["create-form"]}>
                <label htmlFor="title">Название задачи</label>
                <div className={styles["input-title__wrapper"]}>
                    <input
                        type="text"
                        id="title"
                        placeholder="Название задачи"
                        required
                        value={mutItem.title}
                        maxLength={MAX_TITLE_SIZE}
                        onChange={(e) => {
                            setMutItem({ ...mutItem, title: e.target.value });
                        }}
                    />
                    <div className={styles["char-counter"]} title="Максимальная длина названия">
                        {mutItem.title.length} / {MAX_TITLE_SIZE}
                    </div>
                </div>

                <label htmlFor="desc">Описание задачи</label>
                <textarea
                    id="desc"
                    placeholder="Описание задачи"
                    required
                    value={mutItem.desc}
                    onChange={(e) => setMutItem({ ...mutItem, desc: e.target.value })}
                />
                <div className={styles["create-form__button-submit"]}>
                    <button className={styles["create-form__submit"]} type="submit">
                        Готово
                    </button>
                </div>
            </form>
        </Modal>
    );
};

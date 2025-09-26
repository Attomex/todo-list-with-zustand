import React, { useState } from "react";
import { ALL_COLORS, Item } from "../../types";
import styles from "./CreateTask.module.css";
import { DropdownColors } from "../dropdown-colors";
import { useTask } from "../../store/store-zustand";
import { LeftArrowIcon } from "../../icons";

export const MAX_TITLE_SIZE: number = 35;

interface CreateTaskProps {
    hidden: boolean;
    close: () => void;
}

function getCurrentDate() {
    return new Date().toLocaleDateString("ru-RU");
}

export default function formatDeadline(deadline: string): string {
    const date = new Date(deadline);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}



export const CreateTask: React.FC<CreateTaskProps> = ({ hidden, close }) => {
    const mutAllColors: string[] = [...ALL_COLORS];
    const addTodo = useTask((state) => state.addTodo);
    const [dataTask, setDataTask] = useState<Item>({
        title: "",
        desc: "",
        createdAt: getCurrentDate(),
        deadline: "",
        status: "not-done",
        color: "red",
        uid: "",
    });

    const handleClose = () => {
        close();
        setDataTask({
            title: "",
            desc: "",
            createdAt: getCurrentDate(),
            deadline: "",
            status: "not-done",
            color: "red",
            uid: "",
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formatedTask = {
            ...dataTask,
            deadline: formatDeadline(dataTask.deadline),
            uid: "id" + Math.random().toString(16).slice(2),
        };

        addTodo(formatedTask);
        alert("Задача создана");
        handleClose();

        setDataTask({
            title: "",
            desc: "",
            createdAt: getCurrentDate(),
            deadline: "",
            status: "not-done",
            color: "red",
            uid: "",
        });
    };

    return (
        <div style={{ display: hidden ? "" : "none" }}>
            <button className={styles["close"]} type="button" onClick={handleClose}>
                <LeftArrowIcon />
                Вернуться
            </button>
            <h2 className={styles["title"]}>Создание задачи</h2>

            <form onSubmit={handleSubmit} className={styles["create-form"]}>
                <label htmlFor="title">Название задачи</label>
                <div className={styles["input-title__wrapper"]}>
                    <input
                        type="text"
                        id="title"
                        placeholder="Название задачи"
                        required
                        value={dataTask.title}
                        maxLength={MAX_TITLE_SIZE}
                        onChange={(e) => {
                            setDataTask({ ...dataTask, title: e.target.value });
                        }}
                    />
                    <div className={styles["char-counter"]} title="Максимальная длина названия">
                        {dataTask.title.length} / {MAX_TITLE_SIZE}
                    </div>
                </div>

                <label htmlFor="desc">Описание задачи</label>
                <textarea
                    id="desc"
                    placeholder="Описание задачи"
                    required
                    value={dataTask.desc}
                    onChange={(e) => setDataTask({ ...dataTask, desc: e.target.value })}
                />

                <label htmlFor="deadline">Дата выполнения</label>
                <input
                    type="datetime-local"
                    id="deadline"
                    value={dataTask.deadline}
                    required
                    min={new Date().toISOString().slice(0, 10) + "T00:00"}
                    onChange={(e) => setDataTask({ ...dataTask, deadline: e.target.value })}
                />
                <div className={styles["create-form__color"]}>
                    <label htmlFor="colors">Систематизация</label>
                    <DropdownColors
                        id="colors"
                        items={mutAllColors}
                        selected={dataTask.color}
                        setSelected={(value) => setDataTask({ ...dataTask, color: value })}
                    />
                </div>
                <div className={styles["create-form__button-submit"]}>
                    <button className={styles["create-form__submit"]} type="submit">
                        Создать задачу
                    </button>
                </div>
            </form>
        </div>
    );
};

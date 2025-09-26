import { useEffect } from "react";
import { useTask } from "../../store/store-zustand";
import { TodoList } from "../todo-list";
import styles from "./MyTask.module.css";

const MonthToText = new Map([
    [1, "января"],
    [2, "февраля"],
    [3, "марта"],
    [4, "апреля"],
    [5, "мая"],
    [6, "июня"],
    [7, "июля"],
    [8, "августа"],
    [9, "сентября"],
    [10, "октября"],
    [11, "ноября"],
    [12, "декабря"],
]);

const NumberDayToText = new Map([
    [0, "Воскресенье"],
    [1, "Понедельник"],
    [2, "Вторник"],
    [3, "Среда"],
    [4, "Четверг"],
    [5, "Пятница"],
    [6, "Суббота"],
]);

function getCurrDate() {
    const date = new Date();
    const currDate = date.toLocaleDateString("ru-RU").split(".");
    const currDay = date.getDay().toLocaleString("ru-RU");

    const month = MonthToText.get(Number(currDate[1]));

    const currDateText = `${currDate[0]} ${month} ${currDate[2]}`;
    const currDayText = NumberDayToText.get(Number(currDay))?.toLowerCase();
    return [currDateText, currDayText];
}

interface MyTaskProps {
    hidden: boolean;
    createTask: (e: React.MouseEvent) => void;
}

export const MyTask: React.FC<MyTaskProps> = ({ hidden, createTask }) => {
    const [currDate, currDay] = getCurrDate();

    const todoItems = useTask((state) => state.todoItems);
    const {saveToLocaleStorage, loadFromLocalStorage} = useTask();

    useEffect(() => {
        loadFromLocalStorage();
    }, [loadFromLocalStorage]);

    return (
        <div className={styles["my-task"] + " " + (hidden ? styles["hidden"] : "")}>
            <div className={styles["header"]}>
                <h2>Мои задачи</h2>
                
                <button type="button" className={styles["create__button"]} onClick={createTask}>
                    Создать
                </button>
            </div>
            <span onClick={saveToLocaleStorage} style={{ cursor: "pointer" }}>Сохранить в браузере</span>
            <p className={styles["my-task__date"]}>
                {currDate}, {currDay}
            </p>
            <TodoList todoItems={todoItems}/>
        </div>
    );
};


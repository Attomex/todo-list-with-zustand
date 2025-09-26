import { useMemo, useState } from "react";
import { Item } from "../../types";
import { TodoItem } from "../todo-item";
import styles from "./TodoList.module.css";

interface TodoItemProps {
    todoItems: Item[];
}

type FilterCases = "all" | "processing" | "done" | "not-done";

export const TodoList: React.FC<TodoItemProps> = ({ todoItems }) => {
    const [sortered, setSortered] = useState(false);
    const [filter, setFilter] = useState<FilterCases>("all");

    const processedItems = useMemo(() => {
        let itemsToProcess = [...todoItems];

        if (filter !== "all") {
            itemsToProcess = itemsToProcess.filter((item) => item.status === filter);
        }

        if (sortered) {
            itemsToProcess.sort((a, b) => a.status.localeCompare(b.status)).reverse();
        }

        return itemsToProcess;
    }, [todoItems, sortered, filter]);

    if (todoItems.length === 0) return <p>Нет задач</p>;

    return (
        <div className={styles["todo-list"]}>
            <div className={styles["sort-container"]}>
                <label className={styles["sortLabel"]}>
                    <input type="checkbox" className={styles["sortCheckbox"]} checked={sortered} onChange={() => setSortered(!sortered)} />
                    <span className={styles["customCheckbox"]}></span>
                    Сортировка по статусу
                </label>
                <label className={styles["filterLabel"]}>
                    <select name="filter" className={styles["filter"]} value={filter} onChange={(e) => setFilter(e.target.value as FilterCases)}>
                        <option className={styles["filterOption"]} value="all">
                            Все
                        </option>
                        <option className={styles["filterOption"]} value="done">
                            Выполненные
                        </option>
                        <option className={styles["filterOption"]} value="proccessing">
                            В процессе
                        </option>
                        <option className={styles["filterOption"]} value="not-done">
                            Не выполненные
                        </option>
                    </select>
                </label>
            </div>
            <div className={styles["todo-container"]}>
                <ul>
                    {processedItems.map((item) => (
                        <TodoItem key={item.uid} item={item} number={item.uid} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

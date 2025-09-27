import { useState } from "react";
import { useTask } from "../../store/store-zustand";
import { DropdownItem, Item, Statuses } from "../../types";
import { Modal } from "../modal";
import styles from "./TodoItem.module.css";
import { DropdownSettings } from "../dropdown-settings";
import { ColorBucketIcon, DoneIcon, EditIcon, EyeIcon, NotDoneIcon, ProccessingIcon, SettingsIcon, TrashBucketIcon } from "../../icons";
import { EditColorModal, EditModal } from "../modals";

interface TodoItemProps {
    item: Item;
    number: string;
}

function StatusToIcon(status: string, iconWH: string = "24px", color: string) {
    switch (status) {
        case "done":
            return <DoneIcon size={iconWH} />;
        case "proccessing":
            return <ProccessingIcon size={iconWH} />;
        case "not-done":
            return <NotDoneIcon size={iconWH} color={color} />;
        default:
            return "don't break";
    }
}

function statusToText(status: string): string {
    switch (status) {
        case "done":
            return "Выполнено";
        case "proccessing":
            return "В процессе";
        case "not-done":
            return "Не выполнено";
        default:
            return "don't break";
    }
}

function getNextStep(status: string): string {
    switch (status) {
        case "not-done":
            return "proccessing";
        case "proccessing":
            return "done";
        case "done":
            return "";
        default:
            return "don't break";
    }
}

const statusMap: { [key: string]: string } = {
    done: "Выполнено",
    proccessing: "В процессе",
    "not-done": "Не выполнено",
};

export const TodoItem: React.FC<TodoItemProps> = ({ item, number }) => {
    const icon = StatusToIcon(item.status, "24px", item.color);

    const deleteTask = useTask((state) => state.deleteTodo);
    const editTask = useTask((state) => state.editTodo);

    const [seeDetails, setSeeDetails] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    // Dropdown elements on click
    const [editModal, setEditModal] = useState(false);
    const [systematizeModal, setSystematizeModal] = useState(false);

    const nextStep: string = getNextStep(item.status);

    const handleChangeStatus = () => {
        try {
            editTask(number, { ...item, status: nextStep as Statuses});
        } catch (error) {
            alert(error);
        }
    };

    const items: DropdownItem[] = [
        {
            id: 1,
            label: "Редактировать",
            extra: <EditIcon />,
            onClick: () => setEditModal(true),
        },
        {
            id: 2,
            label: "Систематизировать",
            extra: <ColorBucketIcon />,
            onClick: () => setSystematizeModal(true),
        },
    ];

    const changeStatus: DropdownItem = {
        id: 3,
        label: statusMap[nextStep],
        onClick: () => handleChangeStatus(),
    };

    const itemsSettings: DropdownItem[] = nextStep === "" ? items : [...items, changeStatus];

    return (
        <li className={styles["todo-item"]}>
            <div
                className={styles["filing"]}
                title={statusToText(item.status)}
                style={{ backgroundColor: item.color, border: `1px solid ${item.color}` }}
            >
                <span className={styles["todo-icon"]}>{icon}</span>
            </div>
            <div className={styles["todo-item__info"]}>
                <span className={styles["todo-item__title"]} title={item.title}>
                    {item.title}
                </span>
                <div className={styles["todo-item__deadline"]}>
                    <span title={`Задача создана ${item.createdAt}`}>{item.createdAt}</span> ➝{" "}
                    <span title={`Задача должна быть выполнена до ${item.deadline}`}>{item.deadline}</span>
                </div>
            </div>

            <div className={styles["todo-item__button-group"]}>
                <div className={styles["button"] + " " + styles["todo-item__look"]} title="Посмотреть информацию" onClick={() => setSeeDetails(true)}>
                    <EyeIcon />
                </div>

                <DropdownSettings btnStyle={styles["button"]} svg={<SettingsIcon />} items={itemsSettings} />

                <div className={styles["button"] + " " + styles["todo-item__delete"]} title="Удалить задачу" onClick={() => setDeleteModal(true)}>
                    <TrashBucketIcon />
                </div>
            </div>
            {seeDetails && (
                <Modal title={"Информация о задаче"} close={() => setSeeDetails(false)}>
                    <table>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <th>Название задачи</th>
                                <td>{item.title}</td>
                            </tr>
                            <tr>
                                <th>Описание задачи</th>
                                <td>{item.desc}</td>
                            </tr>
                            <tr>
                                <th>Дата создания</th>
                                <td>{item.createdAt}</td>
                            </tr>
                            <tr>
                                <th>Дата выполнения</th>
                                <td>{item.deadline}</td>
                            </tr>
                            <tr>
                                <th>Статус задачи</th>
                                <td>{statusToText(item.status)}</td>
                            </tr>
                        </tbody>
                    </table>
                </Modal>
            )}

            {deleteModal && (
                <Modal
                    title={"Удаление задачи"}
                    footer={
                        <button
                            style={{
                                color: "white",
                                border: "none",
                                backgroundColor: "#000",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                fontSize: "16px",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                deleteTask(number);
                                setDeleteModal(false);
                            }}
                        >
                            Удалить
                        </button>
                    }
                    close={() => setDeleteModal(false)}
                >
                    <p>Это действие безвозвратно удалит задачу!</p>
                </Modal>
            )}

            {editModal && <EditModal item={item} number={number} close={setEditModal} />}

            {systematizeModal && <EditColorModal item={item} number={number} close={setSystematizeModal} />}
        </li>
    );
};

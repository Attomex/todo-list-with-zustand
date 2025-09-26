import { create } from "zustand";
import type { Item } from "../types";

type TaskState = {
    todoItems: Item[];
};

type TaskActions = {
    addTodo: (item: Item) => void;
    saveToLocaleStorage: () => void;
    loadFromLocalStorage: () => void;
    editTodo: (id: string, item: Item) => void;
    deleteTodo: (uid: string) => void;
};

export const useTask = create<TaskState & TaskActions>((set, get) => ({
    todoItems: [],

    addTodo: (item: Item) => {
        set((state) => ({
            todoItems: [...state.todoItems, item],
        }));

        get().saveToLocaleStorage();
    },

    saveToLocaleStorage: () => {
        const state = get();
        localStorage.setItem("todoItems", JSON.stringify(state.todoItems));
    },

    loadFromLocalStorage: () => {
        const itemsFromLocaleStorage = localStorage.getItem("todoItems");
        if (itemsFromLocaleStorage) {
            const parsedItems = JSON.parse(itemsFromLocaleStorage) as Item[];
            set((state) => ({
                todoItems: parsedItems,
            }));
        }
    },

    editTodo: (uid: string, item: Item) => {
        set((state) => ({
            todoItems: state.todoItems.map((todoItem, index) => (todoItem.uid === uid ? item : todoItem)),
        }));

        get().saveToLocaleStorage();
    },

    deleteTodo: (uid: string) => {
        set((state) => ({
            todoItems: state.todoItems.filter((item, index) => item.uid !== uid),
        }))

        get().saveToLocaleStorage();
    }
}));

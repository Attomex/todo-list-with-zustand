import React from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    title: string | React.ReactNode;
    footer?: string | React.ReactNode;
    close: () => void;
    children: React.ReactNode;
}

/**
 * Модальное окно
 * @param {string | React.ReactNode} title - Заголовок модального окна
 * @param {string | React.ReactNode} [footer] - Опциональный футер модального окна
 * @param {() => void} close - Функция закрытия модального окна
 * @param {React.ReactNode} children - Содержимое модального окна
 */
export const Modal: React.FC<ModalProps> = ({ title, footer, close, children }) => {
    return (
        <div className={styles["modal"]} onClick={close}>
            <div className={styles["modal-container"]} onClick={(e) => e.stopPropagation()}>
                <div className={styles["modal-title"]}>{title}</div>
                <div className={styles["modal-content"]}>{children}</div>
                {footer || footer === null ? (
                    <footer className={styles["modal-footer"]}>{footer}</footer>
                ) : (
                    <footer className={styles["modal-footer"]}>
                        <button className={styles["btn-close"]} onClick={close}>
                            Закрыть
                        </button>
                    </footer>
                )}
            </div>
        </div>
    );
};

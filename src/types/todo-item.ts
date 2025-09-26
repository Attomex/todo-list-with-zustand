import { Colors } from "./color";
import { Statuses } from "./status";

export interface Item {
    title: string;
    desc: string;
    createdAt: string;
    deadline: string;
    status: Statuses;
    color: Colors;
    uid: string;
}
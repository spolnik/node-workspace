export interface Card {
    id: number;
    title: string;
    description: string;
    color: string;
    status: string;
    tasks: Task[]
}

export interface Task {
    id: number;
    name: string;
    done: boolean;
}

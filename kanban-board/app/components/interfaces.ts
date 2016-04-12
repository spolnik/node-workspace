export interface TaskModel {
    id: number;
    done: boolean;
    name: string;
}

export interface CardModel {
    id: number;
    title: string;
    description: string;
    color: string;
    status: string;
    tasks: TaskModel[];
}

export interface TaskCallbacks {
    addTask: (cardId: number, taskName: string) => void;
    deleteTask: (cardId: number, taskId: number, taskIndex: number) => void;
    toggleTask: (cardId: number, taskId: number, taskIndex: number) => void;
}

export interface CardCallbacks {
    updateStatus?: (cardId: number, listId: string) => void;
    updatePosition?: (cardId: number, afterId: number) => void;
    persistCardDrag?: (cardId: number, status: string) => void;
    addCard?: (card: CardModel) => void;
    updateCard?: (card: CardModel) => void;
}

export interface KanbanBoardTaskCallbacks {
    addTask: (cardId: number, taskName: string) => void;
    deleteTask: (cardId: number, taskId: number, taskIndex: number) => void;
    toggleTask: (cardId: number, taskId: number, taskIndex: number) => void;
}

export interface KanbanBoardCardCallbacks {
    updateStatus: (cardId: number, listId: string) => void;
    updatePosition: (cardId: number, afterId: number) => void;
}

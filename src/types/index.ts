export interface Task {
    id: number;
    text: string;
    completed: boolean;
    date: string;
}

export interface DateItem {
    date: string;
    dayName: string;
    dayNumber: string;
    isSelected: boolean;
}
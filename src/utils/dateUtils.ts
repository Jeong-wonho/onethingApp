import { addDays, format, startOfToday } from "date-fns";
import { ko } from "date-fns/locale";
import { DateItem } from "../types";

export const generateDateList = (baseDate: Date, count: number = 7) => {
    const dates = Array.from({length: count}, (_, i ) => {
        const date = addDays(baseDate, i);
        
        return {
            date: format(date, 'yyyy-MM-dd'),
            dayName: format(date, 'E', {locale: ko}),
            dayNumber: format(date, 'd'),
            isSelected: false //선택상태는 외부에서 처리
        };
    });
    return dates;
}

//초기 날짜 생성 함수
export const generateInitialDates = (selectedDate: string): DateItem[] => {
    
    const currentDate = new Date(selectedDate);
    const startDate = addDays(currentDate, -3);
    const dates = generateDateList(startDate, 6);

    console.log('startDate', startDate);
    
    //선택된 날짜 표시
    return dates.map(date => ({
        ...date,
        isSelected: date.date === selectedDate
    }))
};

//이전 날짜들 생성
export const generatePreviousDates = (firstDate: string, count: number = 7 ): DateItem[] => {
    const startDate = addDays(new Date(firstDate), -count);
    return generateDateList(startDate, count);
}

//다음 날짜를 생성
export const generateNextDates = (lastDate: string, count: number = 7 ): DateItem[] => {
    const startDate = addDays(new Date(lastDate), count);
    return generateDateList(startDate, count);
}
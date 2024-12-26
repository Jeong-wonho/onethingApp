import { View, Text, ScrollView, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { DateItem } from "../../types";
import { styles } from "./styles";
import { useEffect, useRef, useState } from 'react';
import { generateInitialDates, generateNextDates, generatePreviousDates } from '../../utils/dateUtils';

interface DateSelectorProps {
    selectedDate: string;
    onSelectDate: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({selectedDate, onSelectDate}) => {
    // 초기 선택 값만 추가하다 보니 데이터가 변경되어도 초기 값이 변경되지 않는 문제를 확인 할 수 있었음.
    const [dateList, setDateList] = useState<DateItem[]>([]);
    
    const scrollViewRef = useRef<ScrollView>(null);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        setDateList(generateInitialDates(selectedDate));
    }, [selectedDate]);
    

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isScrolling) return;

        const {layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToEdge = 20;

        //오른쪽 끝네 도달했을때
        if (contentOffset.x + layoutMeasurement.width >= contentSize.width - paddingToEdge) {
            setIsScrolling(true);
            const lastDate = dateList[dateList.length - 1].date;
            const newDates = generateNextDates(lastDate);
            setDateList((prev) => [...prev, ...newDates]);
            setIsScrolling(false);
        }

        //왼쪽 끝에 도달했을 때.
        if (contentOffset.x <= paddingToEdge) {
            setIsScrolling(true);
            const firstDate = dateList[0].date;
            const newDates = generatePreviousDates(firstDate);
            
            setDateList(prev => [...newDates, ...prev]);

            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                    x: 70* 7,
                    animated: false
                });
            }
            setIsScrolling(false);
        }
    }

    // 날짜 선택 시 isSelected 상태 업데이트
    const handleDateSelect = (date: string) => {
        setDateList(prev => 
            prev.map(item => ({
                ...item,
                isSelected: item.date === date
            }))
        );
        onSelectDate(date);
    };

    
    return (
        <ScrollView horizontal style={styles.container} onScroll={handleScroll} ref={scrollViewRef} showsHorizontalScrollIndicator={false} scrollEventThrottle={16}>
            {dateList.map((item, index) => (
                <TouchableOpacity key={`${item.date}-${index}`} style={[styles.dateItem, item.isSelected && styles.selectedDateItem]} onPress={() => handleDateSelect(item.date)}>
                    <Text style={[styles.dayName, item.isSelected && styles.selectedText]}>{item.dayName}</Text>
                    <Text style={[styles.dayNumber, item.isSelected && styles.selectedText]}>{item.dayNumber}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default DateSelector;
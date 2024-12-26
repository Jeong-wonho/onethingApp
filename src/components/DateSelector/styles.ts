import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    dateItem: {
        width: 60,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      selectedDateItem: {
        borderColor: 'black', 
        borderWidth: 2,
      },
      dayName: {fontSize: 14, color: '#666', marginBottom: 4},
      dayNumber: {fontSize: 20, fontWeight: '600', color: '#1A1A1A'},
      selectedText: {color: '#000'}
});
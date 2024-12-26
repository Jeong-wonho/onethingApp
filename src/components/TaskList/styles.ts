import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FAFAFA', // 매우 연한 그레이
      },
      title: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 24,
        marginTop: 40,
        color: '#1A1A1A',
        letterSpacing: 0.5,
      },
      sectionContainer: {
        marginBottom: 24,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: 1,
      },
      inputContainer: {
        flexDirection: 'row',
        marginBottom: 24,
        alignItems: 'center',
      },
      input: {
        flex: 1,
        borderWidth: 0,
        padding: 16,
        fontSize: 16,
        borderRadius: 12,
        backgroundColor: '#fff',
        color: '#1A1A1A',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      addButton: {
        backgroundColor: '#1A1A1A',
        padding: 16,
        borderRadius: 12,
        marginLeft: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      taskContainer: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
      },
      task: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
      taskContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      checkboxContainer: {
        marginRight: 12,
      },
      completedTaskBg: {
        backgroundColor: '#F5F5F5',
      },
      taskText: {
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '400',
      },
      completedTask: {
        textDecorationLine: 'line-through',
        color: '#999',
      },
      deleteButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
      },
})


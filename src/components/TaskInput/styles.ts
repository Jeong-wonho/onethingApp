import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        paddingBottom: 20,
        // borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    input: {
        flex: 1,
        borderWidth: 0,
        padding: 16,
        fontSize: 16,
        borderRadius: 12,
        backgroundColor: "#fff",
        color: "#1A1A1A",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    addButton: {
        backgroundColor: '#1A1A1A',
        padding: 16,
        borderRadius: 12,
        marginLeft: 12,
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    }
})
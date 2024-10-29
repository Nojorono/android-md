import React, { useState } from "react";
import { Text, StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { FontFamily, Color, Border, FontSize } from "../GlobalStyles";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";

// Get screen width and height for dynamic styling
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface OrderItem {
    id: string;
    item: string;
    quantity: number;
    price: number;
}

const initialOrders: OrderItem[] = [
    { id: '1', item: 'IN Product A', quantity: 2, price: 20.0 },
    { id: '2', item: 'IN Product B', quantity: 1, price: 15.0 },
    { id: '3', item: 'IN Product C', quantity: 5, price: 30.0 },
    { id: '4', item: 'IN Product D', quantity: 3, price: 25.0 },
];

const ActivityScreen = () => {
    const [orders, setOrders] = useState(initialOrders);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        // Simulate a data fetch or an API call
        setTimeout(() => {
            // Update the orders array or fetch new data
            setOrders([
                ...initialOrders,
                { id: `${orders.length + 1}`, item: 'IN Product E', quantity: 4, price: 22.0 },
            ]);

            setRefreshing(false); // End the refreshing animation
        }, 2000); // Simulated fetch delay
    };

    const renderOrderItem = ({ item }: { item: OrderItem }) => (
        <TouchableOpacity
            style={styles.orderItem}
            onPress={() => handlePress(item)} // Handle press event
        >
            <View style={styles.gridContainer}>
                <Text>#{item.id}</Text>
                <View style={styles.grid1}>
                    <Image
                        style={styles.logo}
                        contentFit="cover"
                        source={require("../assets/icon-box.svg")}
                    />
                </View>
                <View style={styles.grid2}>
                    <Text style={styles.itemText}>{item.item}</Text>
                    <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
                    <Text style={styles.itemText}>Price: ${item.price.toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const handlePress = (item: OrderItem) => {
        console.log("Pressed item:", item);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerFluid}>
                <FlatList
                    data={orders}
                    renderItem={renderOrderItem}
                    keyExtractor={item => item.id}
                    style={styles.orderList}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#0c4ca3"]} // Android: set refresh color
                            tintColor="#0c4ca3" // iOS: set refresh color
                        />
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerFluid: {
        flex: 1, backgroundColor: "#fff", paddingHorizontal: SCREEN_WIDTH * 0.01,
        paddingBottom: SCREEN_HEIGHT * 0.07,
    },
    container: {
        flex: 1, backgroundColor: "#fff", paddingHorizontal: SCREEN_WIDTH * 0.01,
        paddingVertical: SCREEN_HEIGHT * 0.01,
    },
    logo: {
        width: SCREEN_WIDTH * 0.2,
        height: SCREEN_WIDTH * 0.2,
        marginBottom: SCREEN_HEIGHT * 0.05,
    },
    orderList: {
        marginTop: 10,
    },
    orderItem: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
        marginVertical: 8,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    gridContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    grid1: {
        flex: 1,
        alignItems: 'center',
    },
    grid2: {
        flex: 2,
        paddingLeft: 16,
    },
    itemText: {
        fontSize: 14,
        color: "#333",
    },
});

export default ActivityScreen;

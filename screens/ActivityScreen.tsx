import React, {useState, useEffect, useCallback} from "react";
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Linking, Button
} from "react-native";
import { Image } from "expo-image";
import Toast from "react-native-toast-message";
import { getListCallPlanSchedule } from "../utils/api/callplan/callPlanService";
import authStore from "../stores/authStore";
import {useFocusEffect} from "@react-navigation/core"; // Import the API call

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Define the structure of the fetched data for the item
interface OrderItem {
    id: string;
    code_call_plan: string;
    notes: string;
    status: string;
    callPlanOutlet: {
        name: string;
        address_line: string;
        outlet_type: string;
        longitude: string;
        latitude: string;
        photos: string[];
    };
}

const ActivityScreen = () => {
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const user = authStore.user.user
    // Function to fetch data from the API
    const fetchOrders = async () => {
        try {
            const response = await getListCallPlanSchedule(user.id);
            if (response.statusCode === 200) {
                setOrders(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    };

    // Refetch orders every time the screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchOrders();
        }, [])
    );

    const onRefresh = () => {
        setRefreshing(true);
        fetchOrders().finally(() => setRefreshing(false));
    };

    // Function to open the map app with the provided latitude and longitude
    const openMaps = (latitude: string, longitude: string) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
        Linking.openURL(url).catch((err) => {
            console.error("Failed to open map", err);
            Toast.show({type: "error", text1: "Failed to open map"});
        });
    };

    const renderOrderItem = ({item}: { item: OrderItem }) => (
        <>
            <TouchableOpacity style={styles.orderItem} onPress={() => handlePress(item)}>
                <View style={styles.gridContainer}>
                    <View style={styles.grid1}>
                        <Image
                            style={styles.logo}
                            contentFit="cover"
                            source={{uri: "https://cdn.vuetifyjs.com/images/lists/1.jpg"}}
                        />
                    </View>
                    <View style={styles.grid2}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Plan Code:</Text>
                            <Text style={styles.value}>{item.code_call_plan}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Notes:</Text>
                            <Text style={styles.value}>{item.notes}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Outlet:</Text>
                            <Text style={styles.value}>{item.callPlanOutlet.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Type:</Text>
                            <Text style={styles.value}>{item.callPlanOutlet.outlet_type}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Address:</Text>
                            <Text style={styles.value}>{item.callPlanOutlet.address_line}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            {/* "View on Map" Button */}
            <TouchableOpacity
                onPress={() => openMaps('-6.198453', '106.802473')}
                style={styles.button}
            >
                <Text style={styles.buttonText}>View on Map</Text>
            </TouchableOpacity>
        </>
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
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.orderList}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#0c4ca3"]}
                            tintColor="#0c4ca3"
                        />
                    }
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerFluid: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: SCREEN_WIDTH * 0.01,
        paddingBottom: SCREEN_HEIGHT * 0.07,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: SCREEN_WIDTH * 0.01,
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
        shadowOffset: { width: 0, height: 1 },
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
    button: {
        backgroundColor: '#0c4ca3',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        width: '30%',
    },
    value: {
        fontSize: 12,
        color: '#555',
        width: '65%',
        textAlign: 'right',
    },
});

export default ActivityScreen;

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProgressBar = ({ progress, status }) => {
    let barColor;
    let barText;

    switch (status) {
        case "stop":
            barColor = "red";
            barText = "0%";
            break;
        case "loading":
            barColor = "orange";
            barText = `${progress}%`;
            break;
        case "start":
            barColor = "red";
            barText = `${progress}%`;
            break;
        default:
            barColor = "gray";
            barText = "Unknown";
            break;
    }

    return (
        <View style={[styles.progressBar, { borderColor: barColor }]}>
            <View
                style={[
                    styles.progressFill,
                    { width: `${progress}%`, backgroundColor: barColor },
                ]}
            />
            <Text style={styles.barText}>{barText}</Text>
        </View>
    );
};

export default function HomeScreen() {
    const [status, setStatus] = useState("stop");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval;
        if (status === "loading") {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setStatus("start"); // автоматически переходит на "start", когда загрузка завершена
                        return 100;
                    }
                    return prev + 5;
                });
            }, 200); // Увеличивает прогресс на 5% каждые 200 мс
        } else if (status === "stop") {
            setProgress(0); // Сбрасывает прогресс при остановке
        }

        return () => clearInterval(interval);
    }, [status]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Progress Bar */}
                <ProgressBar progress={progress} status={status} />

                {/* Control Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setStatus("loading")}
                    >
                        <Text style={styles.buttonText}>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setStatus("start")}
                    >
                        <Text style={styles.buttonText}>Stop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setStatus("stop")}
                    >
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    progressBar: {
        width: "80%",
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        position: "relative",
    },
    progressFill: {
        position: "absolute",
        left: 0,
        height: "100%",
        borderRadius: 10,
    },
    barText: {
        color: "black",
        fontSize: 18,
        fontWeight: "bold",
        zIndex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
    },
    button: {
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});

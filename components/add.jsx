import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Text } from "react-native";
import { TextInput, List } from 'react-native-paper';
import { useState } from "react";

const Add = ({ crops, setCrops, setVisible }) => {

    const [crop, setCrop] = useState("");
    const [stage, setStage] = useState("");
    const [area, setArea] = useState("");


    const handleSubmit = () => {
        if (crop && area && stage) {
            setCrops([...crops, { crop: crop, stage: stage, area: area }])
        }
        setCrop('')
        setArea('')
        setStage('')
        
    }

    return (
        <View style={styles.container}>
            <TextInput style={{ height: 65 }}
                label="Crop Name"
                value={crop}
                onChangeText={text => setCrop(text)} />
            <List.Section >
                <List.Accordion
                    title={"Crop Stage                       " + stage}
                    left={props => <List.Icon {...props} icon="folder" />} expanded={expanded}
                    onPress={handlePress}>
                    <List.Item title="stage 1" onPress={() => { setStage('stage 1'); setExpanded(!expanded); }} />
                    <List.Item title="stage 2" onPress={() => { setStage('stage 2'); setExpanded(!expanded); }} />
                    <List.Item title="stage 3" onPress={() => { setStage('stage 3'); setExpanded(!expanded); }} />
                    <List.Item title="stage 4" onPress={() => { setStage('stage 4'); setExpanded(!expanded); }} />

                </List.Accordion>
            </List.Section>

            <List.Section >
                <List.Accordion
                    title={'Pick an area                      ' + area}
                    left={props => <List.Icon {...props} icon="folder" />} expanded={expanded1}
                    onPress={handlePress1}>
                    <List.Item title="Balcony" onPress={() => { setArea('balcony'); setExpanded1(!expanded1); }} />
                    <List.Item title="Pot" onPress={() => { setArea('pot'); setExpanded1(!expanded1); }} />
                    <List.Item title="Field" onPress={() => { setArea('field'); setExpanded1(!expanded1); }} />
                    <List.Item title="Grow Bag" onPress={() => { setArea('grow bag'); setExpanded1(!expanded1); }} />

                </List.Accordion>
            </List.Section>

            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>

        </View>
    );
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        gap: 20,
        overflow: 'scroll'
    },
    submit: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#8156C7",
        
    }, text: {
        color: "black"
    }
})

export default Add




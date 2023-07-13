import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { selectTravelTimeInformation } from "../../slices/navSlice";
import { useSelector } from "react-redux";

const data = [
  {
    id: "Move-x-123",
    title: "ABC",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Move-x-456",
    title: "DEF",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
 
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw` absolute top-3 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Selecciona un coche - {travelTimeInformation?.distance?.text}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
          onPress={()=> setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              id === selected?.id && "bg-gray-200" }`}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml -6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-xl`}>

              {new Intl.NumberFormat(`ar-gb`,{
                style: 'currency',
                currency: 'ARS'
              }).format(

                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier / 100)

              )}

            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mtauto border-t border-gray-200`}>
        <TouchableOpacity disable={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
          <Text style={tw ` text-center text-white text-xl`}>Elegir {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});

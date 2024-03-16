import { useSelector } from "react-redux";
import { GlobalStoreProps } from "../store/globalStore";
import Car from "../models/Car";
import { View, Text, StyleSheet, FlatList } from "react-native";
import ListItemCar from "../components/ListItemCar";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/RootStack";


type Props =  StackScreenProps<RootStackParamList>;

function FavorisScreen({ navigation }: Props) {
   const favoris = useSelector<GlobalStoreProps, Array<Car>>((state) => state.favori);

   const navigateCarDetails = (id: number) => {
      navigation.navigate("Car", {carId: id});
    };


   if (favoris.length === 0) {
      return (
         <View style={styles.container}>
            <Text>Vous ne possédez aucun favoris</Text>
         </View>
      );
   }
   return (
      <View style={styles.container}>
         <FlatList
            data={favoris}
            renderItem={({ item }) => (
              <ListItemCar
                car={item}
                onClick={() => navigateCarDetails(item.id)}
              />
            )}
          />
      </View>
   );
}

export default FavorisScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 10
   },
   rowOne: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
   },
   rowTwo: {
      flex: 4,
   },
   rowThree: {
      flex: 4,
      justifyContent: "center",
      alignItems: "center",
   }
});

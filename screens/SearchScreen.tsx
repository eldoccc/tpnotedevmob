import {View, StyleSheet, Text} from "react-native";
import ListOfCar from "../components/ListOfCar";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/RootStack";
import MyButton from "../components/Atoms/MyButton";
import { useSelector } from "react-redux";
import { GlobalStoreProps } from "../store/globalStore";
import Car from "../models/Car";
import { Searchbar } from 'react-native-paper';
import {useState} from "react";

type Props =  StackScreenProps<RootStackParamList>;

function SearchScreen({ navigation }: Props) {

   const favoris = useSelector<GlobalStoreProps, Array<Car>>((state) => state.favori);
    const [searchQuery, setSearchQuery] = useState('');
    const carCount = useSelector<GlobalStoreProps, number>(state => state.carCount);
    //const carCount = 0;
   const navigateCarDetails = (id: number) => {
      navigation.navigate("Car", {carId: id});
    };

   return (
      <View style={styles.container}>
         <View style={styles.rowOne}>
            <MyButton title={`Mes favoris : ${favoris.length}`} pressed={() => {navigation.navigate('Favoris')}} color={'#43A047'} colorPress={'#2E7D32'} />
         </View>
          <View>
              <View style={{marginVertical: 15, marginHorizontal: 10}}>
          <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
          />
                  </View>
        </View>
         <View style={styles.rowTwo}>
             <Text style={{marginBottom: 5}}> Nombre  d'annonces : {carCount}</Text>
            <ListOfCar navigateCarDetails={navigateCarDetails} searchQuery={searchQuery} />
         </View>
      </View>
   );
}

export default SearchScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: 8
   },
   rowOne: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   rowTwo: {
      flex: 10,
       marginLeft: 10
   },
});

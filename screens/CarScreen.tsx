import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/RootStack";
import Car from "../models/Car";
import { useEffect, useState } from "react";
import {getCarById} from "../services/CarService";
import { View, Text, StyleSheet } from "react-native";
import MyButton from "../components/Atoms/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStoreProps } from "../store/globalStore";
import { addFavori, removeFavori } from "../reducers/favoriReducer";
import DisplayError from "../components/DisplayError";
import { Avatar } from "react-native-paper";
import { Image } from 'react-native';

type CarScreenParams = {}

type CarScreenProps = CarScreenParams & StackScreenProps<RootStackParamList, 'Car'>

function CarScreen({ navigation, route }: CarScreenProps) {
   const favoris = useSelector<GlobalStoreProps, Array<Car>>((state) => state.favori);
   const [car, setCar] = useState<Car>();
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [onError, setOnError] = useState<boolean>(false);

   const dispatch = useDispatch();

   useEffect(() => {
      async function getCar(): Promise<void> {
         try {
            const car = await getCarById(route.params.carId);
            if (car == null) {
               throw new Error("404 not found")
            }
            setCar(car);
         } catch (e) {
            setOnError(true);
         }
         setIsLoading(false);
      }
      void getCar();
   }, []);

   if(car == null) {
      return <DisplayError message={"Erreur dans le chargement de la voiture"}></DisplayError>
   }

   return (
      <View style={styles.container}>
         <View style={styles.rowOne}>
            <Text style={{ fontSize: 24, fontWeight: "600" }}>{car?.carMake} {car?.carModel}</Text>
         </View>
         <View style={styles.rowTwo}>
            <Text style={{ fontSize: 20, fontWeight:"600" }}>Information :</Text>
            <View style={{ gap: 10, marginTop:10}} >
               <Text>Prix : {car?.price}€</Text>
               <Text>Année de fabrication : {car?.carModelYear}</Text>
            </View>
         </View>
         <View style={styles.rowThree}>
            <Text style={{ fontSize: 20, fontWeight:"600" }}>Vendeur :</Text>
            <View style={{flexDirection: "row", alignItems:"center"}}>
            <Avatar.Image source={{ uri: car?.avatar }} size={60} theme={
                { colors: { primary: '#FFF',accent: '#43A047'  }}
            } style={{ borderWidth: 2, borderColor: '#43A047' }}/>
               <View style={{flexDirection: "column", justifyContent: "center", marginLeft:5}}>
            <Text style={{ fontSize: 16}}>{car?.saler}</Text>
                  <View style={{flexDirection: "row", gap: 12}}>
            <Text style={{ fontSize: 12}}>Pays: {car?.country}</Text>
            <Text style={{ fontSize: 12}}>Ville: {car?.city}</Text>
            <Text style={{ fontSize: 12}}>Tel: {car?.phone}</Text>
                  </View>
               </View>
            </View>
            </View>
            <View style={styles.rowFour}>
               <Text style={{ fontSize: 20, fontWeight:"600" }}>Description :</Text>
                <Text style={{marginTop: 10}}>{car?.description}</Text>
            </View>
         <View style={styles.rowFive}>
            {favoris.find(m => m.id === car?.id) == null ?
               (
                  <MyButton title={"Ajouter au favoris"} pressed={() => dispatch(addFavori(car))} color={'#43A047'} colorPress={'#2E7D32'} />
               ) : (
                  <MyButton title={"Supprimer des favoris"} pressed={() => dispatch(removeFavori(car))} color={'#43A047'} colorPress={'#2E7D32'} />
               )}
         </View>
      </View>
   );
}

export default CarScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   rowOne: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row"
   },
   rowTwo: {
      flex: 1,
       marginBottom: 10
   },
    rowThree: {
        flex: 1,
        marginVertical: 10,
        gap: 10
    },
    rowFour: {
        flex:1,
        justifyContent: "center",
    },
   rowFive: {
      flex: 4,
      justifyContent: "center",
      alignItems: "center",
   }
});

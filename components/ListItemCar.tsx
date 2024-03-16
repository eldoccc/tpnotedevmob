import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Car from "../models/Car";
import Colors from "../constants/Colors";
import {IconButton, MD3Colors} from "react-native-paper";
import {addFavori, removeFavori} from "../reducers/favoriReducer";
import {useDispatch, useSelector} from "react-redux";
import {GlobalStoreProps} from "../store/globalStore";

type ListItemCarParams = {
  car: Car
  onClick : () => void
}

const ListItemCar = ({ car, onClick }: ListItemCarParams) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  const favoris = useSelector<GlobalStoreProps, Array<Car>>((state) => state.favori);

  useEffect(() => {
    if (favoris.find(favoriteCar => favoriteCar.id === car.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favoris, car]);

  const addFavorites = (car: Car) => {
    if(isFavorite){
        dispatch(removeFavori(car))
    }
    else
        dispatch(addFavori(car))
    setIsFavorite(!isFavorite);

  }
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {car.carMake} {car.carModel}
          </Text>
          <IconButton
              icon={isFavorite ? "heart" : "heart-outline"}
              iconColor={"#43A047"}
              size={20}
              onPress={() => addFavorites(car)}
          />
        </View>
        <View>
          <Text style={styles.cuisine}>{car.carModelYear} - {car.price}</Text>
        </View>
        <View>
          <Text>{car.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ListItemCar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10
  },
  titleContainer: {
    flexDirection: 'row',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  statContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  noThumbnailContainer: {
    width: 128,
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 12,
    backgroundColor: Colors.mainGreen,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  data: {
    fontSize: 16,
  },
  cuisine: {
    fontStyle: 'italic',
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  stat: {
    marginLeft: 4,
  },
});
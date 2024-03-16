import { ReactNode, useEffect, useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import ListItemCar from "./ListItemCar";
import Car from "../models/Car";
import DisplayError from "./DisplayError";
import { getCars } from "../services/CarService";
import {useDispatch} from "react-redux";
import {setCarCount} from "../reducers/carCountReducer";

interface ListOfCarProps {
  navigateCarDetails: (id: number) => void
  searchQuery: string
}

function ListOfCar({navigateCarDetails,searchQuery}: ListOfCarProps): ReactNode {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [cars, setCars] = useState<Array<Car>>([]);
  const dispatch = useDispatch();

  async function fetchCar(): Promise<void> {
    try {
      const cars = await getCars();
      setCars(cars);
      setIsLoading(false);
    } catch (error) {
      // TODO error handling
      setIsError(true)
    }
  }
  
  useEffect(() => {
    void fetchCar()
  }, [])

  const filteredCars = cars.filter(car => {
    const searchWords = searchQuery.toLowerCase().split(" ");
    return searchWords.every(word =>
        car.carMake.toLowerCase().includes(word) ||
        car.carModel.toLowerCase().includes(word)
    );
  });
  if(filteredCars.length > 0)
  dispatch(setCarCount(filteredCars.length));
  else
    dispatch(setCarCount(0));

  if(isLoading)
    return <Text>Chargement en cours ...</Text>

  return (
    <View style={styles.container}>
      {
        isError ?
          (<DisplayError message='Impossible de récupérer les voitures' />) :
          (<FlatList
            data={filteredCars}
            renderItem={({ item }) => (
              <ListItemCar
                car={item}
                onClick={() => navigateCarDetails(item.id)}
              />
            )}
          />)
      }
    </View>
  );
}

export default ListOfCar;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

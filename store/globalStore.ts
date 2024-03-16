import { configureStore } from "@reduxjs/toolkit";
import favoriReducer from "../reducers/favoriReducer";
import Car from "../models/Car";
import carCountReducer from "../reducers/carCountReducer";

const globalStore = configureStore({
   reducer: {
      favori: favoriReducer,
      carCount: carCountReducer,
   }
});

export interface GlobalStoreProps {
   favori: Array<Car>;
    carCount: number;
}

export default globalStore;

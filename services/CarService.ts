import Car from "../models/Car";

export async function getCars(): Promise<Array<Car>> {
  try {
    const res: Array<Car> = [];
      const response =  require('../helpers/data.json');
    response.map((value: any) => {
      res.push(
        {
          id: value.id,
            carMake: value.carMake,
            carModel: value.carModel,
            carModelYear: value.carModelYear,
            price: value.price,
            avatar: value.avatar,
            saler: value.saler,
            phone: value.phone,
            country: value.country,
            city: value.city,
            description: value.description
        }
      )
    });
    return res;
  } catch (error: any) {
    console.log(`Error with function getCars ${error.message}`);
    throw error;
  }
};

export async function getCarById(id: number): Promise<Car | undefined> {
  try {
    const list: Array<Car> = [];
    const response =  require('../helpers/data.json');

    response.map((value: any) => {
      list.push(
        {
          id: value.id,
            carMake: value.carMake,
            carModel: value.carModel,
            carModelYear: value.carModelYear,
            price: value.price,
            avatar: value.avatar,
            saler: value.saler,
            phone: value.phone,
            country: value.country,
            city: value.city,
            description: value.description
        }
      )
    });
    return list.find((m) => m.id === id);
  } catch (error: any) {
    console.log(`Error with function getCarById ${error.message}`);
    throw error;
  }
};

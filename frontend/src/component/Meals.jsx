import { useState, useEffect } from "react"
import React from "react"

function Meal({ title, image, id }) {
  return (
    <>
      <div style={{ display: "block" }}>
        <div>
          <div>{title}</div>
          <div>
            <img src={image} alt={title} width="60px" height="60px" />
          </div>
        </div>
      </div>
    </>
  )
}

export default function Meals() {
  const [meals, setMeals] = useState([])
  const [dataIsLoaded, setDataIsLoaded] = useState(false)

  useEffect(() => {
    /**/
    /* code to test data without network: */
    /**/
    // async function pullData() {
    //   return new Promise((resolve) => {
    //     const api =
    //       '{"meals":[{"strMeal":"Chilli prawn linguine","strMealThumb":"https://www.themealdb.com/images/media/meals/usywpp1511189717.jpg","idMeal":"52839"},{"strMeal":"Fettuccine Alfredo","strMealThumb":"https://www.themealdb.com/images/media/meals/0jv5gx1661040802.jpg","idMeal":"53064"},{"strMeal":"Fettucine alfredo","strMealThumb":"https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg","idMeal":"52835"},{"strMeal":"Grilled Mac and Cheese Sandwich","strMealThumb":"https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg","idMeal":"52829"},{"strMeal":"Lasagna Sandwiches","strMealThumb":"https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg","idMeal":"52987"},{"strMeal":"Lasagne","strMealThumb":"https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg","idMeal":"52844"},{"strMeal":"Pilchard puttanesca","strMealThumb":"https://www.themealdb.com/images/media/meals/vvtvtr1511180578.jpg","idMeal":"52837"},{"strMeal":"Spaghetti alla Carbonara","strMealThumb":"https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg","idMeal":"52982"},{"strMeal":"Venetian Duck Ragu","strMealThumb":"https://www.themealdb.com/images/media/meals/qvrwpt1511181864.jpg","idMeal":"52838"}]}';
    //     const json = JSON.parse(api);
    //     resolve(json.meals);
    //   });
    // }
    //pullData()
    fetch("http://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta")
      .then(response => response.json())
      .then(meals => {
        setMeals(meals.meals)
        setDataIsLoaded(true)
      })
  }, [])

  if (!dataIsLoaded) {
    return (
      <div>
        <h1>Please wait while meals are loading....</h1>
      </div>
    )
  }
  return (
    <>
      <main>
        <section className="Meals">
          <ul style={{ listStyleType: "none" }}>
            {meals.map(meal => (
              <li className="item" key={meal.idMeal}>
                <Meal
                  title={meal.strMeal}
                  image={meal.strMealThumb}
                  id={meal.idMeal}
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

import { useContext, useState, useEffect } from "react"
import { CartContext } from "../store/shopping-cart-context"
import { fetchMeals } from "../http";

export default function Products() {
    const { addItemCart } = useContext(CartContext);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [productMeals, setProductMeals] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const meals = await fetchMeals();
                setProductMeals(meals);
            } catch (error) {
                setError({ message: error.message } || 'Could not fetch meals, please try again later.');
            } finally {
                setIsFetching(false);
            }
        }

        fetchData();
    }, []);


    return (
        <ul id="meals">
            {productMeals.map((meal) =>
                <li className="meal-item" key={meal.id}>
                    <article >
                        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                        <div>
                            <h3>{meal.name}</h3>
                            <p className='meal-item-price'>${meal.price}</p>
                            <p className='meal-item-description'>{meal.description}</p>
                        </div>
                        <p className='meal-item-actions'>
                            <button className="button" onClick={() => addItemCart(meal)}>Add to Cart</button>
                        </p>
                    </article>
                </li>
            )}
        </ul>
    )
}
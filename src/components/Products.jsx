import { useContext } from "react"
import useHttp from "../hooks/useHttp";
import { CartContext } from "../store/shopping-cart-context"

const requestConfig = {};

export default function Products() {
    const { addItemCart } = useContext(CartContext);
    const {
        data: productMeals,
        isLoading,
        error } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center"> Fetching meals.... </ p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }

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
import { useState, useEffect } from 'react';

export default function Products() {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [productMeals, setProductMeals] = useState([]);

    async function fetchMeals() {
        const response = await fetch('http://localhost:3000/meals');
        const resData = await response.json();

        if (!response.ok) {
            throw new Error('Failed to fetch Meals!');
        }

        return resData;
    }


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

    return (<ul id="meals">
        {productMeals.map((meal) =>
            <li className="meal-item" key={meal.id}>
                <article >
                    <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
                    <div>
                        <h3>{meal.name}</h3>
                        <p className='meal-item-price'>{meal.price}</p>
                        <p className='meal-item-description'>{meal.description}</p>
                    </div>
                    <p className='meal-item-actions'>
                        <button>Add to Cart</button>
                    </p>
                </article>
            </li>
        )}
    </ul>)
}
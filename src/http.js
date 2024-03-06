export async function fetchMeals() {
    const response = await fetch('http://localhost:3000/meals');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch Meals!');
    }

    return resData;
}

export async function fetchCartMeals() {
    const response = await fetch('http://localhost:3000/orders');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch Meals!');
    }

    return resData;
}

export function updateUserItem(items, customer) {
    fetch('http://localhost:3000/orders', {
        method: 'POST',
        body: JSON.stringify({
            order: {
                items,
                customer
            }
        }),
        headers: {
            'Content-type': 'application/json'
        }
    });

    // const resData = await response.json();

    // if (!response.ok) {
    //     throw new Error('Failed to update user data.');
    // }

    // return resData.message;
}
import React, {useEffect, useState} from 'react';
import MealCard from './Meals.Card';

export default function Meals() {

    const [usersList, setUsersList] = useState([]);
    const [currentUserId, setCurrentUserId] = useState();
    const [foodsList, setFoodsList] = useState([]);

    useEffect(function getUsers() {
        fetch('http://localhost:5000/user/')
            .then(res => res.json(res))
            .then(res => setUsersList(res))
            .catch(err => console.log(err));
    },[]);

    useEffect(function getFoodsForUser() {

        let foodList = [];

        usersList.forEach((cur) => {
            if(cur._id === currentUserId) {
                foodList = [...cur.food];
            }
        });

        const data = {
            food: foodList
        }

        fetch('http://localhost:5000/food/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json(res))
            .then(res => setFoodsList(res))
            .catch(err => console.log(err));

    }, [currentUserId, usersList])

    const getCurrentUser = (e) => {

        e.preventDefault();

        const id = e.target.value;

        setCurrentUserId(id);

    }

    console.log(foodsList);

    return (
        <div id="meals">
            <main className="content">
                <section className="card">
                    <div>
                        <p>Choose User</p>
                    </div>
                    <div>
                        <select value={currentUserId} className="btn"
                        name="Enter Username" onChange={getCurrentUser}>
                            {usersList.length > 0 ?
                            usersList.map((cur, i) => (
                            <option key={cur._id} value={cur._id}>{cur.user}</option>
                            )) : 
                            ''
                            }
                        </select>
                    </div>
                </section>
                <section className="meal-table card">
                   <header className="header-table">
                       <div>Food</div>
                       <div className="remove-cell">Meal</div>
                       <div className="remove-cell">Servings</div>
                       <div>Fat (g)</div>
                       <div>Carbs (g)</div>
                       <div>Protein (g)</div>
                       <div className="remove-cell">Calories</div>
                       <div>Edit</div>
                   </header>
                   <MealCard />
                   <MealCard />
                   <MealCard />
                   <MealCard />
                   <MealCard />
                   <MealCard />
                   <MealCard />
                   <MealCard />
                   <MealCard />
                   <MealCard />
                   <footer className="footer-table">
                        <div>Totals</div>
                        <div className="remove-cell"></div>
                        <div className="remove-cell"></div>
                        <div>23</div>
                        <div>45</div>
                        <div>10</div>
                        <div className="remove-cell">1000</div>
                        <div></div>
                    </footer>
                </section>
            </main>
        </div>
    )
}

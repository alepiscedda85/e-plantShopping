import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addItem } from "./CartSlice"; 
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {
    
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    const dispatch = useDispatch();

    // Convertiamo i prezzi "$15" → 15
    const cleanCost = (price) => Number(price.replace("$", ""));

    const handleAddToCart = (product) => {
        const formattedProduct = {
            ...product,
            cost: cleanCost(product.cost),
        };

        dispatch(addItem(formattedProduct));

        setAddedToCart((prev) => ({
            ...prev,
            [product.name]: true,
        }));
    };

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies the air.", cost: "$18" },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air and removes toxins.", cost: "$20" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for and effective at removing toxins.", cost: "$17" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air and has healing properties for skin.", cost: "$14" }
            ]
        },
        // … (il resto del tuo array rimane identico)
    ];

    return (
        <div>
            {/* NAVBAR */}
            <div className="navbar">
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="nav-links">
                    <a onClick={() => setShowPlants(true)} style={{ fontSize: "30px" }}>Plants</a>

                    <a onClick={() => setShowCart(true)} style={{ fontSize: "30px" }}>
                        🛒
                    </a>
                </div>
            </div>

            {/* LISTA PRODOTTI */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, i) => (
                        <div key={i}>
                            <h1>{category.category}</h1>

                            <div className="product-list">
                                {category.plants.map((plant, idx) => (
                                    <div className="product-card" key={idx}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">{plant.cost}</div>

                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? "✓ Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;
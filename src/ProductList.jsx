import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice"; 
import CartItem from './CartItem';
import './ProductList.css';

function ProductList({ onHomeClick }) {

    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    const dispatch = useDispatch();

    // 🔹 Legge lo stato globale del carrello
    const cartItems = useSelector((state) => state.cart.items);

    // 🔹 Calcola il totale articoli nel carrello
    const calculateTotalQuantity = () => {
        return cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
    };

    // 🔹 Rimuove simbolo $ → numero
    const cleanCost = (price) => Number(price.replace("$", ""));

    // 🔹 Aggiunge un prodotto al carrello
    const handleAddToCart = (product) => {
        const productFormatted = {
            ...product,
            cost: cleanCost(product.cost),
        };

        dispatch(addItem(productFormatted));

        setAddedToCart((prev) => ({
            ...prev,
            [product.name]: true,
        }));
    };

    // 🔹 Lista prodotti (tagliata)
    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters air toxins.", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Purifies the air.", cost: "$18" }
            ]
        }
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
                    <a onClick={() => setShowPlants(true)} style={{ fontSize: "30px" }}>
                        Plants
                    </a>

                    {/* 🔥 ICONA CARRELLO CON BADGE QUANTITÀ */}
                    <a onClick={() => setShowCart(true)} style={{ fontSize: "30px", position: "relative" }}>
                        🛒
                        {calculateTotalQuantity() > 0 && (
                            <span className="cart-badge">
                                {calculateTotalQuantity()}
                            </span>
                        )}
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
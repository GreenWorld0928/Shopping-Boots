import React, { useState, useEffect } from "react";
import Product from "./Product";

const Category = ({type, products}) => {
     
    useEffect(() => {
        console.log("Category")
    }, [])
    return (
        <React.Fragment>
            <h4 className="px-2 pt-2">{type}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {
                    products.map((item, idx) => <Product key={idx} name={item.name} price={item.price} />)
                }
            </div>
        </React.Fragment>
    );
}
export default Category;
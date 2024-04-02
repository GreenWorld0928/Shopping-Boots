import React, { useState, useEffect } from "react";

const Product = ({name, url = "https://cdn.flightclub.com/TEMPLATE/391190/2.jpg?w=300", price}) => {
    useEffect(()=>{
        console.log("product")
    },[])
    return (
        <React.Fragment>
            <div className="text-center p-2 border m-2" style={{width: 350}}>
                <h5>Name: {name}</h5>
                <img src={url} alt="Whole Cut"></img>
                <h5>Price: ${price}</h5>
            </div>
        </React.Fragment>
    );
}
export default Product;
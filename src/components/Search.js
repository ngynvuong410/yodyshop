import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductsBySearchName } from '../assets/fake-data/products'
export const Search = () => {
    const [val, setval] = useState('')
    const [productsSearch, setproductsSearch] = useState([])
    const handelGetProductByKey = (name) => {
        setval(name)
        if (name == '') setproductsSearch([])
        else setproductsSearch(getProductsBySearchName(name))
    }
    return (
        <>
            <div className="menu__search">
                <input
                    type='search'
                    value={val}
                    onChange={(e) => handelGetProductByKey(e.target.value)}
                ></input>
                <div><box-icon class="search" name='search'></box-icon></div>
                <div className='search__product'>
                    {
                        productsSearch.map((item, idx) => (
                            <div className='search__product__item' key={idx}>
                                <img src={item.image} />
                                <Link to={'/san-pham/' + item.slug} 
                                 onClick = {()=>setproductsSearch([])}
                                >
                                    <div className='search__content'>
                                        <h3>{item.title}</h3>
                                        <p>{item.price}</p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }

                </div>
            </div>

        </>
    )
}

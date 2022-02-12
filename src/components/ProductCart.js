import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useStateValue } from '../store/StateProvider'

const ProductCart = props => {
    const [{ favorites }, dispatch] = useStateValue()
    const { items } = props

    //This func just apply for product details page
    const handelRedirectChange = () => {
        if (props.setproductdetails && typeof props.setproductdetails == 'function') {
            props.setproductdetails(items)
        }
    }
    const handelToggelFavorite = () => {
        const handelMessageAfterSuccess = ()=>{
            
        }
        dispatch({
            type: "ADD_FAVORITE",
            data: { items }
        })

    }
    const Favorite = ({id}) => {
         const temp = favorites.find(item=>item.id ==id)
         if(temp){
             return <i class={`bx bx-heart favorite active`}
             onClick={() => handelToggelFavorite()}
         ></i>
         }
        return <i class={`bx bx-heart favorite `}
            onClick={() => handelToggelFavorite()}
        ></i>
    }
    return (
        <div className="product__cart ">
            <div className="product__cart__thumb">
                <Link to={'/san-pham/' + items.slug}
                    onClick={() => handelRedirectChange()}
                ><img src={items.image} /></Link>
                <span className='product__cart__promotion'>-{items.promotion > 0 ? items.promotion : null}%</span>
                <span className={items.hot ? 'product__cart__hot' : null}>{items.hot ? 'hot' : null}</span>
                <Favorite id={items.id}/>
            </div>
            <div className="product__cart__info">
                <h3>{items.title}</h3>
                <p className="product__cart__price"><span>{(Number.parseInt(items.price * (items.promotion * 0.01))).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' vnd'}</span><del>{(Number.parseInt(items.price)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' vnd'}</del></p>
                <Button>{items.invertory > 0 ? 'invertory: ' + items.invertory : 'out of stock'}</Button>
            </div>
        </div>
    )
}

// ProductCart.propTypes = {
//     title:PropTypes.string,
//     price:PropTypes.string.isRequired,
//     image:PropTypes.string.isRequired,
//     categorySlug:PropTypes.string.isRequired,
//     slug:PropTypes.string.isRequired,
//     color:PropTypes.array.isRequired,
//     size:PropTypes.array.isRequired


// }

export default ProductCart

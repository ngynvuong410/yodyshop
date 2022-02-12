import React from 'react'
import { useStateValue } from '../store/StateProvider'
export const HeadShoppingCart = ({length})=>{
    return (
        <div className='head__shopping__cart'>
              <div className='head__shopping__cart__order'>your order <span>{length}</span> products</div>
              <button>continue to buy</button>
        </div>
    )
}
export const CartItem = ({ item }) => {
    const [{ favorites }, dispatch] = useStateValue()
    const handelDeleteItemCart = () => {
        dispatch({
            type: 'DELETE_CART',
            data: item.id
        })
    }
    const handelIncrease = (id)=>{
        dispatch({
            type:'INCREASE_CART_QTY',
            id
        })
    }
    const handelDescrease = (id)=>{
        dispatch({
            type:'DESCREASE_CART_QTY',
            id
        })
    }
 
  
    return (
        <div className="cart__item">
            <div className="cart__item__wapper">
                <img src={item.image} />

            </div>
            <div className="cart__item__wapper">
                <div className='cart_head_info'>
                <h3>{item.title}</h3>
                <p>{item.size}/{item.color}</p>
                </div>

                <div className='cart__item__price'>{(Number.parseInt(item.price)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' vnd'}</div>
                <div className='cart__item__qty'>
                    <span
                     onClick={()=>handelDescrease(item.id)}
                    >-</span>
                    {item.qty}
                    <span
                    onClick={()=>handelIncrease(item.id)}
                    >+</span>
                    <i class='bx bxs-box'
                        onClick={() => handelDeleteItemCart()}
                    ></i>
                </div>
                <div className='cart__item__intomoney'>Tổng cộng: {(Number.parseInt(item.price * (item.qty))).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' vnd'}</div>
            </div>
        </div>
    )
}

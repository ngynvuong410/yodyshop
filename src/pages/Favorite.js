import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useStateValue } from '../store/StateProvider'
import ProductCart from '../components/ProductCart'
export const Favorite = () => {
    const [{ favorites,userLogin }, dispatch] = useStateValue()

    const FavoriteEmpty = () => {
        return (
            <div className='favorite__empty'>
                <i class='bx bx-donate-heart' ></i>
                <p>Danh sách yêu thích của bạn trống</p>
                <Button>Buy NOW!</Button>
            </div>
        )
    }
    const FavoriteProducts = () => {
        return (
            favorites.map((item, idx) => {
                return (
                    <div className="favorite__cart">
                        <ProductCart
                            key={idx}
                            items={item}
                        />
                        <div className='favorite__cart__tools'>
                               <Button onclick={()=>handelDeleteItem(item.id)}>DELETE</Button>
                               <Button 
                                    onclick={()=>handelAddToCart(item)}
                                    >ADD TO CART</Button>
                        </div>
                    </div>
                )
            })
        )
    }
    const handelDeleteItem = (id)=>{

        dispatch({
            type:'DELETE_ITEM_FAVORITE',
            data:id
        })
    }
    const handelAddToCart = (item)=>{
        dispatch({
            type:'ADD_TO_CART',
            data:{...item,size:'m',qty:1,color:'black'}
        })
    }
    return (
        <div className="favorite">
            <Container>
                <Row>
                    <Col md={3}>
                        <div className='favorite__user'>
                            <div className='favorite__user__head'>
                                <i className='bx bxs-user-circle'></i>
                                <div >
                                    <Link to={'/register'}>Register</Link>
                                    <Link to={'/login'}>Login</Link>
                                </div>
                                <Button>experience it now!</Button>
                            </div>
                            <div className='favorite__user__info'>
                                <div className='favorite__wpp'>
                                    <i class='bx bx-user-circle' ></i>
                                    <p><Link to={userLogin.displayName?'/my-account':'/login'}>My account</Link></p>
                                </div>
                                <div className='favorite__wpp'>
                                    <i class='bx bx-store-alt' ></i>
                                    <p><Link to={userLogin.displayName?'/my-order':'/login'}>My order</Link></p>
                                </div>
                                <div className='favorite__wpp'>
                                    <i class='bx bx-lock-open-alt'></i>
                                    <p><Link to={userLogin.displayName?'/change-password':'/login'}>Change Password</Link></p>
                                </div>
                                <div className='favorite__wpp'>
                                    <i class='bx bx-target-lock'></i>
                                    <p>Recently viewed</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className="favorite__products">
                            <div className='favorite__products__head'>
                                <p>Favorite product</p>
                                <p><span>{favorites.length}</span>Product</p>
                            </div>
                            <div className="favorite__products__body">
                                {
                                    favorites.length > 0 ? <FavoriteProducts /> : <FavoriteEmpty />
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

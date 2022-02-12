import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CartItem, HeadShoppingCart } from '../components/CartItem'
import { useStateValue } from '../store/StateProvider'
import {Link} from 'react-router-dom'
export const ShoppingCart = () => {
    const [{ carts }, dispatch] = useStateValue()

     const total = carts.reduce((prev,curr)=>prev+(curr.qty*curr.price),0)
     
    return (
        <Container>
            <Row>
                <Col md={9}>
                    <div className='shopping__cart'>
                        <HeadShoppingCart length={carts.length}></HeadShoppingCart>
                        <div className='shopping__cart__bar'>
                            <div>sản phẩm</div>
                            <div>đơn giá</div>
                            <div>số lượng</div>
                            <div>thành tiền</div>
                        </div>
                        {
                            carts.length == 0 ? <h3 >your carts is empty!</h3> :
                                carts.map(item => <CartItem key={item.id} item={item} />)
                        }
                    </div>
                </Col>
                <Col md={3}>
                    <div className='payment_cart'>
                        <h4>Payments</h4>
                        <div className='cart__total'><b>Total :</b>{(Number.parseInt(total)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ' vnd'}</div>
                        <button><Link to={carts.length>0?'/shipping':''}>Payments</Link></button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

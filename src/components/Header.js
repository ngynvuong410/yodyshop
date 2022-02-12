import React, { useState, useEffect,useRef ,useLayoutEffect} from 'react'
import { Link } from 'react-router-dom'
import 'boxicons'
import { Search } from './Search'
import { useStateValue } from '../store/StateProvider'
import { firebase } from '../store/FireBase'
import { CartItem } from './CartItem'
import { Container } from 'react-bootstrap'
import { Message } from './Message'
function Header() {
    const listMenu = [
        { id: 1, name: 'Mua sắm', path: '/shopping', childMenus: {} },
        {
            id: 2, name: 'Nam', path: '/boy', childMenus: {
                poster1: 'https://bizweb.dktcdn.net/100/438/408/themes/839420/assets/link_image_2_1.jpg?1637476696414',
                contents: [
                    {
                        key: 'type1',
                        listcategory: [
                            { category: 'áo', content: 'áo polo nam - áo thun nam -áo sơ mi nam - áo khoác nam - áo len nam' },
                            { category: 'quần', content: 'quần jean - quần tây - quần kaki' },
                            { category: 'đồ mặc nhà', content: 'đồ bộ nam' },
                            { category: 'đồ mặc trong', content: 'đồ lót - áo giữ nhiệt' },
                        ]
                    }
                ],
                poster2: 'https://bizweb.dktcdn.net/100/438/408/themes/839420/assets/link_image_2_2.jpg?1637476696414'
            }
        },
        {
            id: 3, name: 'Nữ', path: '/girl', childMenus: {
                poster1: 'https://bizweb.dktcdn.net/100/438/408/themes/839420/assets/link_image_2_1.jpg?1637476696414',
                contents: [
                    {
                        key: 'type1',
                        listcategory: [
                            { category: 'áo', content: 'áo polo nam - áo thun nam -áo sơ mi nam - áo khoác nam - áo len nam' },
                            { category: 'quần', content: 'quần jean - quần tây - quần kaki' },
                            { category: 'đồ mặc nhà', content: 'đồ bộ nam' },
                            { category: 'đồ mặc trong', content: 'đồ lót - áo giữ nhiệt' },
                        ]
                    }
                ],
                poster2: 'https://bizweb.dktcdn.net/100/438/408/themes/839420/assets/link_image_2_2.jpg?1637476696414'
            }
        },
        {
            id: 4, name: 'Trẻ em', path: '/children', childMenus: {
                poster1: 'https://bizweb.dktcdn.net/100/438/408/themes/839420/assets/link_image_2_1.jpg?1637476696414',
                contents: [
                    {
                        key: 'type1',
                        listcategory: [
                            { category: 'áo', content: 'áo polo nam - áo thun nam -áo sơ mi nam - áo khoác nam - áo len nam' },
                            { category: 'quần', content: 'quần jean - quần tây - quần kaki' },
                            { category: 'đồ mặc nhà', content: 'đồ bộ nam' },
                            { category: 'đồ mặc trong', content: 'đồ lót - áo giữ nhiệt' },
                        ]
                    }
                ],
                poster2: 'https://bizweb.dktcdn.net/100/438/408/themes/839420/assets/link_image_2_2.jpg?1637476696414'
            }
        },
        {
            id: 5, name: 'Bộ sưu tập', path: '/collections', childMenus: {
                poster1: null,
                contents: [
                    {
                        key: 'type2',
                        listcategory: [
                            { category: 'áo', content: 'https://bizweb.dktcdn.net/100/438/408/themes/839420/assets/link_image_5_1.jpg?1637476696414' },
                            { category: 'quần', content: 'https://bizweb.dktcdn.net/100/438/408/themes/839420/assets/link_image_5_2.jpg?1637476696414' },
                            { category: 'đồ mặc nhà', content: 'https://bizweb.dktcdn.net/100/438/408/themes/839420/assets/link_image_5_3.jpg?1637476696414' }

                        ]
                    }
                ],
                poster2: null
            }
        },
        {
            id: 6, name: 'Yody Love', path: '/yody-love', childMenus: {
                poster1: null,
                contents: [
                    {
                        key: 'type1',
                        listcategory: [
                            { category: 'áo', content: 'áo polo nam - áo thun nam -áo sơ mi nam - áo khoác nam - áo len nam' },
                            { category: 'quần', content: 'quần jean - quần tây - quần kaki' },
                            { category: 'đồ mặc nhà', content: 'đồ bộ nam' }
                        ]
                    }
                ],
                poster2: 'https://bizweb.dktcdn.net/100/438/408/themes/839420/assets/link_image_2_2.jpg?1637476696414'
            }
        },
        {
            id: 7, name: 'Ưu đãi', path: '/endow', childMenus: {
                poster1: null,
                contents: [
                    {
                        key: 'type1',
                        listcategory: [
                            { category: 'áo', content: 'áo polo nam - áo thun nam -áo sơ mi nam - áo khoác nam - áo len nam' },
                            { category: 'quần', content: 'quần jean - quần tây - quần kaki' }
                        ]
                    }
                ],
                poster2: 'https://bizweb.dktcdn.net/100/438/408/themes/839420/assets/link_image_2_2.jpg?1637476696414'
            }
        },
        { id: 8, name: 'Đồng phục', path: '/uniform', childMenus: {} },
    ]
    const [{ userLogin, favorites, carts, isShowHeaderCart, notifications }, dispatch] = useStateValue()
    const { displayName } = userLogin
    //variable of func
    const [activeMobile, setactiveMobile] = useState(false)
    const [activeHoverItem, setactiveHoverItem] = useState(false)
    const [activeShirk, setactiveShirk] = useState(false)
    // const ref = useRef(notifications)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) setactiveShirk(true)
            else setactiveShirk(false)
        })
     
        return () => {
            window.removeEventListener('scroll',()=>{})
        }
    }, [])
    
    //   useLayoutEffect(() => {
    //     ref.current = notifications
    //       return () => {
          
    //       };
    //   })

    const handelSignout = () => {
        firebase.auth().signOut().then(() => {
            alert('Sign-out successfully!')
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });

    }
    const EmptyCart = () => {
        return <div className="cart__empty">your cart is empty!</div>
    }
    const HasCarts = () => {
        return (
            <div className={`header_cart ${isShowHeaderCart ? 'active' : ''}`}>
                <div className='header_cart__head'>
                    <div>
                        <Link to='/login'>Đăng nhập</Link>
                    </div>
                    <p>
                        Đăng nhập và đồng bộ hóa đến sản phẩm của bạn
                    </p>
                    <i className='bx bxs-x-square'
                        onClick={() => dispatch({ type: 'SET_SHOW_HEADER_CART', data: false })}
                    ></i>
                </div>
                <div className="shopping_cart">
                    {
                        carts.map((item, idx) => <CartItem
                            key={idx}
                            item={item}
                        />)
                    }
                </div>
                <button
                onClick={() => dispatch({ type: 'SET_SHOW_HEADER_CART', data: false })}
                ><Link to='/shopping-cart'>xem giỏ hàng</Link></button>
            </div>
        )
    }

    return (
        <Container>
            {/* NOTIFICATION MESSGASE  */}
            {
            !( notifications
                && Object.keys(notifications).length === 0
                && Object.getPrototypeOf(notifications) === Object.prototype)
                &&<Message background={notifications.type} message={notifications.message}></Message>
            }
         
            {/* HEADER MENU  */}
            <div className={`menu  ${activeMobile ? 'active-mobile' : ''} ${activeHoverItem ? 'menu__hover' : ''} ${activeShirk ? 'menu__shirk' : ''}`}>
                <div className="menu__logo">
                    <Link to='/'>  <img src='https://bizweb.dktcdn.net/100/438/408/themes/839420/assets/logo.svg?1637380863990'></img></Link>
                </div>
                <div className="menu__catalog">
                    {
                        listMenu.map(item => {
                            const typeOfMenuItem = item.childMenus.contents ? item.childMenus.contents[0].key : null
                            const handelOnMouse = typeOfMenuItem ? () => setactiveHoverItem(true) : null
                            const handelOnLeave = typeOfMenuItem ? () => setactiveHoverItem(false) : null

                            return (
                                <div className="menu__catalog__item" key={item.name}
                                    onMouseEnter={handelOnMouse}
                                    onMouseLeave={handelOnLeave}

                                >
                                    <Link to={item.path}>{item.name}</Link>
                                    {
                                        //if item.childmenus is emty retunr null else return elementdom
                                        !(item.childMenus // 👈 null and undefined check
                                            && Object.keys(item.childMenus).length === 0
                                            && Object.getPrototypeOf(item.childMenus) === Object.prototype)
                                        && <div className={`menu__catalog__child menu__catalog__child--${typeOfMenuItem} `}>
                                            <div className='menu__catalog_poster'><img src={item.childMenus.poster1}></img></div>
                                            <div className='menu__catalog__parent'>
                                                {
                                                    item.childMenus.contents[0].listcategory?.map((obj, idx) => {
                                                        const arrName = obj.content.split('-')

                                                        return (
                                                            <div className='menu__catalog__cat' key={idx}>
                                                                <h3>{obj.category}</h3>
                                                                <ul>
                                                                    {
                                                                        arrName.map(cotent => item.childMenus.contents[0].key == 'type1' ? <li key={cotent}>{cotent}</li> : <img key={cotent} src={cotent} />)
                                                                    }
                                                                </ul>
                                                            </div>
                                                        )
                                                    }

                                                    )
                                                }

                                            </div>
                                            <div className='menu__catalog_poster'><img src={item.childMenus.poster2}></img></div>
                                        </div>
                                    }

                                </div>
                            )
                        }
                        )
                    }
                </div>
                <Search />
                <div className="menu__tools">
                    <div className="menu__tools__item">
                        <box-icon name='user'></box-icon>
                        {
                            displayName ? (
                                <div className='menu__tools__user'>
                                    <h4>{displayName}</h4>
                                    <p><Link to={'/myaccount'}>Tài khoản</Link></p>
                                    <p><Link to={'/re-password'}>Đổi mật khẩu</Link></p>
                                    <p><Link to={'/re-password'}>Yêu thích</Link></p>
                                    <p onClick={() => handelSignout()}><Link to={''}>Đăng xuất</Link></p>

                                </div>
                            ) :
                                (
                                    <div className='menu__tools__user'>
                                        <p><Link to={'/register'}>Đăng ký</Link></p>
                                        <p><Link to={'/login'}>Đăng nhập</Link></p>

                                    </div>
                                )
                        }
                    </div>
                    <div className="menu__tools__item"><Link to='/favorite'><box-icon name='heart' ></box-icon></Link>{favorites.length}</div>
                    <div className="menu__tools__item cart"

                    >
                        <Link to='/shopping-cart'>
                            <i className='bx bx-cart-alt' onClick={() => dispatch({ type: 'SET_SHOW_HEADER_CART', data: true })}></i>

                        </Link>
                        {carts.length}
                        {carts.length > 0 ? <HasCarts /> : <EmptyCart />}

                    </div>
                </div>
                <div className="menu-mobile">
                    <box-icon name='menu-alt-right'
                        onClick={() => setactiveMobile(pre => !pre)}
                    ></box-icon>
                </div>
            </div>
        </Container>
    )
}

export default Header

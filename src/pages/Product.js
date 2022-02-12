import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router'
import { getProduct, getProducts } from '../assets/fake-data/products'
import Helmet from '../components/Helmet'
import { Container, Row, Col } from 'react-bootstrap'
import Button from '../components/Button'
import Policy from '../components/Policy'
import { policyData } from '../assets/fake-data/policy'
import ReactImageZoom from 'react-image-zoom';
import Section ,{SectionBody,SectionTitle}from '../components/Section'
import ProductCart from '../components/ProductCart'
import { getProductsOfCatergory } from '../assets/fake-data/products'
import { useStateValue } from '../store/StateProvider'

export const Product = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(getProduct(id))
    const [activeColor, setactiveColor] = useState()
    const [activeSize, setactiveSize] = useState()
    const [qty, setqty] = useState(0)
    const [showImage, setshowImage] = useState(product.listimage[0])
    const [{},dispatch] =  useStateValue()
    //Framword zoomeffect lib
    const props = {width: 480, img: showImage,zoomPosition:'original'};
    const handelAddToCart = ()=>{
    
    if(activeSize&&activeColor&&qty>0){
        dispatch({
            type:'ADD_TO_CART',
            data :{...product,color:activeColor,qty:qty,size:activeSize}
        })
    }
        
    }
    return (
        <Helmet title={id}>
   
            {/* Product infomation  */}
            <Container>
                <Row>
                    <Col xs={12} sm={12} lg={6} >
                        <div className='product__thumb'>
                            <div className='product__thumb__list'>
                               {
                                   product.listimage.map((item,idx)=>(
                                    <div className='product__thumb__item-image' 
                                    key={idx}
                                    onClick={()=>setshowImage(item)}
                                    >
                                         <img src={item} />
                                </div>
                                   ))
                               }
                             
                            </div>
                          
                            <div  className="product__thumb__image-show">
                            <ReactImageZoom {...props} />
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} lg={6}>
                        <div className="product__info">
                            <div className="product__info__head">
                                <h3>{product.title}</h3>
                                <div className="rating">
                                 {
                                     Array(5).fill().map((_,idx)=><i class='bx bx-star' key={idx}></i>)
                                 }
                                </div>
                                <h4>{
                                   product.promotion> 0 ?
                                   (<><span>{(Number.parseInt(product.price*(product.promotion*0.01))).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') +' vnd'}</span> <del>{(Number.parseInt(product.price)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') +' vnd'}</del></>)
                                   : (<><span>{(Number.parseInt(product.price)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') +' vnd'}</span> </>)
                                }</h4>
                            </div>
                        </div>
                        <div className="product__info__body">
                            <div className="product__info__body__item">
                                <p>Màu sắc:<span>{activeColor}</span></p>
                                <div className="product__info__gruop ">
                                   {
                                       product.color.map((item,idx)=>
                                            <p 
                                                className={item==activeColor?'active':''} 
                                                key={item}
                                              onClick={(e)=>setactiveColor(e.target.textContent)}
                                            >{item}</p>
                                       )
                                   }
                                </div>
                            </div>
                            <div className="product__info__body__item size">
                                <p>size:<span>{activeSize}</span></p>
                                <div className="product__info__gruop">
                                {
                                    product.size.map((item,idx)=>
                                            <p 
                                                className={item==activeSize?'active':''} 
                                                key={item}
                                              onClick={(e)=>setactiveSize(e.target.textContent)}
                                            >{item}</p>
                                       )
                                   }
                                </div>
                            </div>
                            <div className='product__info__body__item'>
                                <div className="product__info__gruop">
                                    <span
                                    onClick={()=>qty<=0?'': setqty(pre=>pre-1)}
                                    >-</span>
                                    <b>{qty}</b>
                                    <span
                                     onClick={()=>setqty(pre=>pre+1)}
                                    >+</span>


                                </div>
                            </div>
                            <div className="product__info__body__item">
                                <Button
                                    animate
                                    type
                                    background="active"
                                    onclick  ={()=>handelAddToCart()}
                                    >Thêm giỏ</Button>
                                <Button
                                    animate
                                    type
                                    background="active">Mua ngay</Button>
                            </div>

                        </div>
                        <div className="support__customer">
                        {
                        policyData.map((item, idx) =>
                            <Policy key={idx}
                                description={item.description}
                                discount={item.discount}
                                nameIcon={item.icon}
                                title={item.title}
                                typeIcon={item.typeIcon}
                               
                                 
                            />)
                    }
                        </div>
                    </Col>
                </Row>
            </Container>
            <Section container>
                <SectionTitle>CÓ THỂ BẠN MUỐN MUA</SectionTitle>
                <SectionBody>
                    {
                        getProductsOfCatergory(product.categoryid).map((item, idx) => <ProductCart
                            key={idx}
                            items = {item}
                            setproductdetails = {setProduct}  //custom of dev
                        />)
                    }
                </SectionBody>
            </Section>
        </Helmet>
    )
}

import React, { useState } from 'react'
import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Policy from '../components/Policy'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import { policyData } from '../assets/fake-data/policy'
import { getAllProducts, getProducts, getFlashSale, getProductsOfCatergory } from '../assets/fake-data/products'
import ProductCart from '../components/ProductCart';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Button from '../components/Button'
import { Tabs } from '../components/Tabs'
import { Footer } from '../components/Footer'
function Home() {
    const [productsPropose, setproductsPropose] = useState(getProductsOfCatergory(1))  

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: false,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots:false
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
    };
    //propose
    const propose = ["selling", "Men's Fashion", "Women's Fashion", "child fashion"]
    const handelGetIndexPropose = (index) => setproductsPropose(getProductsOfCatergory(index))
    const EmptyProducts = () => <h3>Your products is empty!</h3>
    return (
        <Helmet title="Home Page">

            <HeroSlider control />
            <Section container >
                <SectionBody>
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
                </SectionBody>
            </Section>
            <Section container>
                <SectionTitle>Falsh sale</SectionTitle>
                <SectionBody>
                    {
                        getFlashSale().map((item, idx) => <ProductCart
                            items={item}
                            key={idx}
                        />)
                    }
                </SectionBody>
            </Section>
            <Section container>
                <SectionTitle>
                    coat
                </SectionTitle>
                <div className='Slider__products'>

                    <Slider {...settings}>
                        {
                            getAllProducts().map((item, idx) =>

                                <ProductCart
                                    key={idx}
                                    items={item}
                                />)
                        }
                    </Slider>
                </div>
                <Button
                    animate
                    type
                    background="active"
                >Xem thêm</Button>
            </Section>
            <Section container>
                <SectionTitle>
                    ĐỀ XUẤT CHO BẠN
                    <Tabs items={propose}
                        onclick={handelGetIndexPropose}
                    />
                </SectionTitle>
                <SectionBody>
                    {
                        productsPropose.length > 0 ? productsPropose.map((item, idx) =>

                            <ProductCart
                                key={idx}
                              items={item}
                            />) : <EmptyProducts />
                    }
                  
                </SectionBody>
                <Button
                    animate
                    type
                    background="active"
                >Xem thêm</Button>
            </Section>
          <Footer/>
        </Helmet>
    )
}

export default Home

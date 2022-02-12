import React from 'react'
import { useParams } from 'react-router'

import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Section from '../components/Section'
import { SectionBody, SectionTitle } from '../components/Section'
import Policy from '../components/Policy'
import { policyData } from '../assets/fake-data/policy'
import { Swiper } from '../components/Swiper'
import { categorys as categoryData } from '../assets/fake-data/category'
import { Tabs } from '../components/Tabs'
import {getProductsOfCatergory} from '../assets/fake-data/products'
import ProductCart from '../components/ProductCart'
function Category() {
    const { id } = useParams()
    const dataSwiper = categoryData.find(item => item.slug == id)
    const handelGetIndexPropose = index =>index
    return (
        <Helmet title={id}>
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
                <SectionTitle>MUA THEO THỂ LOẠI</SectionTitle>
                <SectionBody>
                    <Swiper
                        items={dataSwiper.type}
                    />
                </SectionBody>
            </Section>
            <Section container>
                <SectionTitle>
                    ĐỀ XUẤT CHO BẠN
                    <Tabs items={dataSwiper.propose}
                  onclick={handelGetIndexPropose}
                    />
                </SectionTitle>
                <SectionBody>
                    {
                        getProductsOfCatergory(dataSwiper.id).map((item, idx) =>

                            <ProductCart
                                key={idx}
                                 items={item}
                            />)
                    }
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Category

import React, { useState, useEffect } from 'react'

import Helmet from '../components/Helmet/Helmet'
import Grid from '../components/Grid/Grid'
import Section, { SectionTitle, SectionBody } from '../components/Section/Section'
import SlickSlider from '../components/Slider/SlickSlider'
import BannerCoundonw from '../components/Banner/BannerCoundown'
import ProductList from '../components/Products/ProductList'

import slickSlider from '../assets/data/slick-slider'
import products from '../assets/data/product'

const Home = () => {
   const [trendingProducts, setTrendingProducts] = useState(products)
   const [bestSalesProducts, setBestSalesProducts] = useState(products)
   const [earphonesProducts, setEarphonesProducts] = useState(products)

   useEffect(() => {
      const filteredTrendingProducts = products.filter(
         (item) => {
            return item.category === 'speaker'
         })

      const filteredBestSalesProducts = products.filter(
         (item) => {
            return item.category === 'watch'
         })

      const filteredEarphonesProducts = products.filter(
         (item) => {
            return item.category === 'earphones'
         })


      setTrendingProducts(filteredTrendingProducts)
      setBestSalesProducts(filteredBestSalesProducts)
      setEarphonesProducts(filteredEarphonesProducts)

   }, [])

   return (
      <Helmet title={'Home'}>
         {/* Slider */}
         <SlickSlider
            data={slickSlider}
            control={true}
            auto={true}
         />
         {/* Slider */}

         {/* Trending products */}
         <Section>
            <SectionTitle>Space Speaker</SectionTitle>
            <SectionBody>
               <Grid
                  col={4}
                  mdCol={2}
                  smCol={1}
                  gap={20}
               >
                  {
                        <ProductList data={trendingProducts}/>
                  }
               </Grid>
            </SectionBody>
         </Section>

         {/* Banner Countdown product */}
         <Section>
            <SectionTitle>CountDown Products</SectionTitle>
            <SectionBody>
               <Grid
                  col={1}
                  mdCol={1}
                  smCol={1}
                  gap={20}>
                  <BannerCoundonw />
               </Grid>
            </SectionBody>
         </Section>

         {/* New Arrive */}
         <Section>
            <SectionTitle>Watch Smart</SectionTitle>
            <SectionBody>
               <Grid
                  col={4}
                  mdCol={2}
                  smCol={1}
                  gap={20}
               >
                  {
                     <ProductList data={bestSalesProducts}/>
                  }
               </Grid>
            </SectionBody>
         </Section>

         <Section>
            <SectionTitle>Earphones Variously</SectionTitle>
            <SectionBody>
               <Grid col={4} mdCol={2} smCol={1} gap={20}>
                  {
                     <ProductList data={earphonesProducts}/>
                  }
               </Grid>
            </SectionBody>
         </Section>
      </Helmet>
   )
}

export default Home
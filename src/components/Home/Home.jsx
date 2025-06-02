import React,{useState} from 'react'
import ProductPage from '../Product/ProductPage'
import Category from '../Category/Category'

const Home = () => {

   const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <>
    <h3 className="text-center my-4">Home Page</h3>
    <Category onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory}/>
    <ProductPage/>
    </>
  )
}

export default Home
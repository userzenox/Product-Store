import React , { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'
import { PlusCircleIcon, RefreshCwIcon } from 'lucide-react'
import ProductCard from '../components/ProductCard'

function HomePage() {

  const {products, loading , error ,fetchProducts} = useProductStore()

  useEffect(() => {
      fetchProducts()
  }, [fetchProducts])

    console.log("products", products);
    
  return (
    <main className='max-w-6xl mx-auto px-4 py-8 '>

      <div className='flex justify-between items-center mb-8'>
        <button className='btn btn-primary'>

             <PlusCircleIcon className='size-5 mr-2'/>
            Add Product
        </button>

        <button className='btn btn-ghost  btn-circle' onClick={fetchProducts}>
           <RefreshCwIcon className='size-5'/>
        </button>
      </div>

     {/* if error is present  */}
      {error && <div className='alert alert-error mb-8'> {error}</div>}

      {/* handle loading   {loading ? (): ()}*/}
        {loading ? (
           <div className='flex justify-center items-center h-64'>
              <div className='loading loading-spinner loading-lg' />
           </div>
        ): (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {/*fetching products*/}
           {  products.map((product) => {
               return <ProductCard key={product.id} product={product} />
           })}

          </div>
        )}

    
    
       
    </main>
  )
}

export default HomePage
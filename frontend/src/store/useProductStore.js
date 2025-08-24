import {create} from 'zustand';
import axios from 'axios'
import toast from 'react-hot-toast';
const BASE_URL = "http://localhost:3000"

export const useProductStore = create((set,get) => ({
     products:[],
     loading: false,
     error: null,

     fetchProducts: async () => {
        set({loading: true});

        try {
            const response =  await axios.get(`${BASE_URL}/api/products`)
          // axios will fetch the data and return in response.data and the other data is what we return    
            
         set({products:response.data.data , error:null});
        } 
        catch (error) {
            // error 429 means rate limiting
            if(error.status == 429){
                 set({error:"Rate limit exceeded" , products:[]} );
            }
            else{
                set({error:"something went wrong" , products:[]})
            }
        }
        finally{
            set({loading: false})
        }
     },

     deleteProduct: async (id) => {
         set({loading: true});

         try {
            await axios.delete(`${BASE_URL}/api/products/${id}`);

         set(state => ({
         products: state.products.filter(product => product.id !== id)  

     }));

     toast.success("product deleted successfully");
     
         } catch (error) {
             console.log("Error in deleteProduct function" , error);
              toast.error("Something went wrong");
         }

         finally{
            set({loading : false});
         }
     }


}))
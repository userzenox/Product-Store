import {create} from 'zustand';
import axios from 'axios'

const BASE_URL = "http://localhost:3000"
export const useProductStore = create((set,get) => ({
     products:[],
     loading: false,
     error: null,

     fetchProducts: async () => {
        set({loading: true});

        try {
            await axios.get(`${BASE_URL}/api/products`)
          // axios will fetch the data and return in response.data and the other data is what we return 
            console.log("working");
            
            set({products:response.data.data , error:null});
        } catch (error) {
            // error 429 means rate limiting
            if(error.status == 429){
                 set({error:"Rate limit exceeded"});
            }
            else{
                set({error:"something went wrong"})
            }
        }
        finally{
            set({loading: false})
        }
     }
}))
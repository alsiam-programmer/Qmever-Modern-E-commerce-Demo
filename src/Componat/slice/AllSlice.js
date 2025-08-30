import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    user: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) :[],
    BuyItem: localStorage.getItem("BuyItem")? JSON.parse(localStorage.getItem("BuyItem")) :[],
    cartItem: localStorage.getItem("cartItem")? JSON.parse(localStorage.getItem("cartItem")) :[],
  },
  reducers: {
    userUidLogin:(state , action) => {
        state.user = [action.payload]
        localStorage.setItem("user" , JSON.stringify(state.user))
    },
    userLogout:(state , action)=>{
      state.user.splice(action.payload)
      localStorage.setItem("user" , JSON.stringify(state.user))
    },
    userBuyItem:(state , action) => {
      state.BuyItem = [action.payload]
      localStorage.setItem("BuyItem" , JSON.stringify(state.BuyItem))
    },
    BuyItemDelete:(state , action)=>{
      state.BuyItem.splice(action.payload)
      localStorage.setItem("BuyItem" , JSON.stringify(state.BuyItem))
    },
    
    AddToCart:(state , action) => {      
      let FindProduct = state.cartItem.findIndex((item)=> item.ProdectId === action.payload.ProdectId)
      let FindProductModel = state.cartItem.findIndex((item)=> item.size === action.payload.size)
      let FindProductmodleColor = state.cartItem.findIndex((item)=> item.modleColor.Color === action.payload.modleColor.Color)

      if (FindProduct !== -1 && FindProductModel !== -1  && FindProductmodleColor !== -1 ) {
        
        
        if (action.payload.modleColor.Color !== undefined) {
          state.cartItem[FindProductmodleColor].ProdectQun += 1
          localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
          return          
        }
        

        if (action.payload.size !== undefined) {
          state.cartItem[FindProductModel].ProdectQun += 1
          localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
          return          
        } 

        state.cartItem[FindProduct].ProdectQun += 1
        localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
      } else {
        state.cartItem = [ ...state.cartItem , action.payload ]
        localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
      }
    },
    removeCartPro:(state , action) => {
      state.cartItem.splice(action.payload , 1)
      localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
    },
    qunIncrement:(state , action) =>{
      state.cartItem[action.payload].ProdectQun += 1
      localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
    },
    qunDecrement:(state , action) =>{
      if (state.cartItem[action.payload ].ProdectQun > 1) {
        state.cartItem[action.payload ].ProdectQun -= 1
        localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
      }
    },
    removeAllcartPro:(state , action) => {
      state.cartItem.splice(action.payload)
      localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
    },

  },
})

// Action creators are generated for each case reducer function
export const { userUidLogin , userLogout , userBuyItem , BuyItemDelete , AddToCart , removeCartPro , qunIncrement , qunDecrement , removeAllcartPro } = counterSlice.actions

export default counterSlice.reducer
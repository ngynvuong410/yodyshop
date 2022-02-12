import { Message } from "../components/Message"

export const initialState = {
    productDetails: null,
    userLogin: {},
    favorites: [],
    carts: [],
    isShowHeaderCart:true,
    notifications:{}
}
export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER': {

            return { ...state, userLogin: action.data }
        }
        case 'ADD_FAVORITE': {

            const findIndex = state.favorites.findIndex(item => item.id == action.data.items.id)
            if (findIndex > -1) {
                const arr = state.favorites.filter(item => item.id !== action.data.items.id)


                return { ...state, favorites: arr }
            }
         
            return { ...state, favorites: [...state.favorites, action.data.items],notifications:{type:'success',message:'Congratulations! Add Favorite successfully!!'}}

        }
        case 'DELETE_ITEM_FAVORITE':

            const arr = state.favorites.filter(item => item.id != action.data)

            return { ...state, favorites: arr,notifications:{type:'success',message:'Congratulations! Delete cart successfully!!'} }
        case 'ADD_TO_CART':
            const existItem = state.carts.findIndex(item => item.id == action.data.id)
         
            if (existItem > -1) {
           
                return { ...state ,notifications:{type:'warning',message:'This product is exist in your cart !'}}
            }
            return { ...state, carts: [...state.carts, action.data] ,notifications:{type:'success',message:'Congratulations! Add to cart successfully!!'}}
        case 'SET_SHOW_HEADER_CART':
            return {...state,isShowHeaderCart:action.data}
        case 'DELETE_CART':
            const arrr = state.carts.filter(item => item.id != action.data)
            return { ...state, carts: arrr}
        case 'INCREASE_CART_QTY':
              const itemFoundIn = state.carts.find(item=>item.id==action.id)
              if(itemFoundIn)itemFoundIn.qty+=1
            return {...state}
        case 'DESCREASE_CART_QTY':
              const itemFoundDe = state.carts.find(item=>item.id==action.id)
              if(itemFoundDe&&itemFoundDe.qty>0)itemFoundDe.qty-=1
            return {...state}
        default:
            return state
    }
}
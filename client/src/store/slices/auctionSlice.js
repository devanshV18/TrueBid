import { createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "axios";
import { toast } from "react-toastify";

const auctionSlice = createSlice({
    
    name: "auction",

    initialState: {
        loading: false,
        itemDetail: {},
        auctionDetail: {},
        auctionBidders: {},
        myAuctions: [],
        allAuctions: []
    },

    reducers: {
        createAuctionRequest(state,action){
            state.loading = true
        },

        createAuctionSuccess(state,action){
            state.loading = false
        },

        createAuctionFailed(state,action){
            state.loading = false
        },
        
        getAllAuctionItemRequest(state,action){
            state.loading = true
        },

        getAllAuctionItemSuccess(state,action){
            state.loading = false
            state.allAuctions = action.payload
        },

        getAllAuctionItemFailed(state,action){
            state.loading = false
        },

        getAuctionDetailRequest(state, action){
            state.loading = true 
        },

        getAuctionDetailSuccess(state, action){
            state.loading = false
            state.auctionDetail = action.payload.auctionItem
            state.auctionBidders = action.payload.bidders
        },

        getAuctionDetailFailed(state, action){
            state.laodinf = false
            state.auctionDetail = state.auctionDetail
            state.auctionBidders = state.auctionBidders
        },


        resetSlice(state, action){
            state.loading = false
            state.auctionDetail = state.auctionDetail
            state.itemDetail = state.itemDetail
            state.myAuctions = state.myAuctions
            state.allAuctions = state.allAuctions
        }

    }

})



export const getAllAuctionItems = () => async(dispatch) => {

    dispatch(auctionSlice.actions.getAllAuctionItemRequest())

    try {

        const response = await axios.get(
            "http://localhost:5000/api/auctionitem/allitems",
            {
                withCredentials: true
            }
        )

        dispatch(auctionSlice.actions.getAllAuctionItemSuccess(response.data.items))
        dispatch(auctionSlice.actions.resetSlice()
    )
    } catch (error) {
        
        dispatch(auctionSlice.actions.getAllAuctionItemFailed())

        console.log(error);

        dispatch(auctionSlice.actions.resetSlice())

    }
}




export const getAuctionDetail = (id) => async (dispatch) => {
    dispatch(auctionSlice.actions.getAuctionDetailRequest());
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auctionitem/auction/${id}`,
        { withCredentials: true }
      );
      dispatch(auctionSlice.actions.getAuctionDetailSuccess(response.data));
      dispatch(auctionSlice.actions.resetSlice());
    } catch (error) {
      dispatch(auctionSlice.actions.getAuctionDetailFailed());
      console.error(error);
      dispatch(auctionSlice.actions.resetSlice());
    }
  };



  export const createAuction = (data) => async (dispatch) => {
    dispatch(auctionSlice.actions.createAuctionRequest())

    try {
        const response = await axios.post(
            "http://localhost:5000/api/auctionitem/create",
            data, 
            {
                withCredentials: true,
                headers: {"Content-Type": "multipart/form-data"},
            }
        )

        dispatch(auctionSlice.actions.createAuctionSuccess())
        toast.success(response.data.message)
        dispatch(auctionSlice.actions.resetSlice())
    } catch (error) {
        dispatch(auctionSlice.actions.createAuctionFailed())
        toast.error(error.response.data.message)
        
    }
  }

export default auctionSlice.reducer
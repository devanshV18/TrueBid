import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


const adminSlice = createSlice({

    name: "admin",

    initialState: {
        loading: false,
        monthlyRevenue: [],
        totalAuctioneers: [],
        totalBidders: [],
        paymentProofs: [],
        singlePaymentProof: {}
    },

    reducers: {
        requestForMonthlyRevenue(state, action){
            state.loading = true,
            state.monthlyRevenue = []
        },

        successForMonthlyRevenue(state, action){
            state.loading = false,
            state.monthlyRevenue = action.payload
        },
        
        failedForMonthlyRevenue(state, action){
            state.loading = false,
            state.monthlyRevenue = []
        },

        requestForAllUsers(state, action) {
            state.loading = true;
            state.totalAuctioneers = [];
            state.totalBidders = [];
        },

        successForAllUsers(state, action) {
            state.loading = false;
            state.totalAuctioneers = action.payload.auctioneersArray;
            state.totalBidders = action.payload.biddersArray;
        },

        failureForAllUsers(state, action) {
            state.loading = false;
            state.totalAuctioneers = [];
            state.totalBidders = [];
        },

        requestForPaymentProofs(state, action) {
            state.loading = true;
            state.paymentProofs = [];
        },

        successForPaymentProofs(state, action) {
            state.loading = false;
            state.paymentProofs = action.payload;
        },

        failureForPaymentProofs(state, action) {
            state.loading = false;
            state.paymentProofs = [];
        },

        requestForDeletePaymentProof(state, action) {
            state.loading = true;
        },

        successForDeletePaymentProof(state, action) {
            state.loading = false;
        },

        failureForDeletePaymentProof(state, action) {
            state.loading = false;
        },

        requestForSinglePaymentProofDetail(state, action) {
            state.loading = true;
            state.singlePaymentProof = {};
        },

        successForSinglePaymentProofDetail(state, action) {
            state.loading = false;
            state.singlePaymentProof = action.payload;
        },

        failureForSinglePaymentProofDetail(state, action) {
            state.loading = false;
            state.singlePaymentProof = {};
        },

        requestForUpdatePaymentProof(state, action) {
            state.loading = true;
        },

        successForUpdatePaymentProof(state, action) {
            state.loading = false;
        },

          
        failureForUpdatePaymentProof(state, action) {
            state.loading = false;
        },

        requestForAuctionItemDelete(state, action) {
            state.loading = true;
        },

        successForAuctionItemDelete(state, action) {
            state.loading = false;
        },

        failureForAuctionItemDelete(state, action) {
            state.loading = false;
        },

        clearAllErrors(state, action) {
            state.loading = false;
            state.monthlyRevenue = state.monthlyRevenue;
            state.paymentProofs = state.paymentProofs;
            state.totalAuctioneers = state.totalAuctioneers;
            state.totalBidders = state.totalBidders;
            state.singlePaymentProof = {};
        },

    },
})



export const getMonthlyRevenue = () => async (dispatch) => {
    dispatch(adminSlice.actions.requestForMonthlyRevenue())

    try {
        const response = await axios.get(
        "http://localhost:5000/api/admin/monthlyincome",
        {
            withCredentials: true
        }
        )

        dispatch(adminSlice.actions.successForMonthlyRevenue(response.data.totalMonthlyRevenue))

        
    } catch (error) {

        dispatch(admin.actions.failedForMonthlyRevenue())

        console.log(error.response.data.message)
    }
}

export const getAllUsers = () => async (dispatch) => {
    dispatch(adminSlice.actions.requestForAllUsers());
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/users/getall",
        { withCredentials: true }
      );
      dispatch(adminSlice.actions.successForAllUsers(response.data));
    } catch (error) {
      dispatch(adminSlice.actions.failureForAllUsers());
      console.error(error.response.data.message);
    }
  };
  
  export const getAllPaymentProofs = () => async (dispatch) => {
    dispatch(adminSlice.actions.requestForPaymentProofs());
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/paymentproofs/getall",
        { withCredentials: true }
      );
      dispatch(
        adminSlice.actions.successForPaymentProofs(
          response.data.paymentProofs
        )
      );
    } catch (error) {
      dispatch(adminSlice.actions.failureForPaymentProofs());
      console.error(error.response.data.message);
    }
  };
  
  export const deletePaymentProof = (id) => async (dispatch) => {
    dispatch(adminSlice.actions.requestForDeletePaymentProof());
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/admin/paymentproof/delete/${id}`,
        { withCredentials: true }
      );
      dispatch(adminSlice.actions.successForDeletePaymentProof());
      dispatch(getAllPaymentProofs());
      toast.success(response.data.message);
    } catch (error) {
      dispatch(adminSlice.actions.failureForDeletePaymentProof());
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  
  export const getSinglePaymentProofDetail = (id) => async (dispatch) => {
    dispatch(adminSlice.actions.requestForSinglePaymentProofDetail());
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/admin/paymentproof/${id}`,
        { withCredentials: true }
      );
      dispatch(
        adminSlice.actions.successForSinglePaymentProofDetail(
          response.data.paymentProofDetail
        )
      );
    } catch (error) {
      dispatch(adminSlice.actions.failureForSinglePaymentProofDetail());
      console.error(error.response.data.message);
    }
  };
  
  export const updatePaymentProof = (id, status, amount) => async (dispatch) => {
    dispatch(adminSlice.actions.requestForUpdatePaymentProof());
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/admin/paymentproof/status/update/${id}`,
        { status, amount },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      dispatch(adminSlice.actions.successForUpdatePaymentProof());
      toast.success(response.data.message);
      dispatch(getAllPaymentProofs());
      dispatch(adminSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(adminSlice.actions.failureForUpdatePaymentProof());
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  
  export const deleteAuctionItem = (id) => async (dispatch) => {
    dispatch(adminSlice.actions.requestForAuctionItemDelete());
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/admin/auctionitem/delete/${id}`,
        { withCredentials: true }
      );
      dispatch(adminSlice.actions.successForAuctionItemDelete());
      toast.success(response.data.message);
      dispatch(getAllAuctionItems());
    } catch (error) {
      dispatch(adminSlice.actions.failureForAuctionItemDelete());
      console.error(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  
  export const clearAlladminSliceErrors = () => (dispatch) => {
    dispatch(adminSlice.actions.clearAllErrors());
  };
  
  export default adminSlice.reducer;

import { combineReducers } from "@reduxjs/toolkit";
import sectionReducer from "./slices/sectionSlice";


const rootReducer  = combineReducers({
    section : sectionReducer
})

export default rootReducer
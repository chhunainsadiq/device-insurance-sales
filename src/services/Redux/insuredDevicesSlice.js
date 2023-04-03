import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetch } from "../utils/api"

export const fetchAllDevices = createAsyncThunk('fetch-all-devices', async (apiUrl, thunkAPI) => {
  try {
    const { data } = await fetch(apiUrl, thunkAPI)
    return data?.data?.phones;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error in fetching devices");
  }
})

export const initialState = {
    devices: [],
    devicesFetchStatus: { loading: false, error: "" },
    insuredDevicesItems: [],
    currentInsuredItem: {}
}

const insuredDevicesSlice = createSlice({
  name: 'insuredDevices',
  initialState,
  reducers: {
    saveInsuranceItem: (state, action) => {
        state.insuredDevicesItems = [action.payload, ...state.insuredDevicesItems]
    },
    deleteInsuranceItem: (state, action) => {
        state.insuredDevicesItems = state.insuredDevicesItems.filter(insuredItem => insuredItem.id !== action.payload)
    },
    updateInsuranceItem: (state, action) => {
        const index = state.insuredDevicesItems.findIndex((insuredItem) => insuredItem.id === action.payload.id)
        state.insuredDevicesItems[index] = action.payload
    },
    setCurrentInsuranceItem: (state, action) => {
        state.currentInsuredItem = state.insuredDevicesItems.find((insuredItem) => insuredItem.id === action.payload)
    },
    unsetCurrentInsuranceItem: (state) => {
        state.currentInsuredItem = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDevices.pending, (state) => {
            state.devicesFetchStatus.loading = true
      })
      .addCase(fetchAllDevices.fulfilled, (state, action) => {
        state.devices = action.payload
        state.devicesFetchStatus.loading = false
      })
      .addCase(fetchAllDevices.rejected, (state, action) => {
        state.devicesFetchStatus.loading = true
        state.devicesFetchStatus.error = action.payload
      });
  },
})

export const { saveInsuranceItem, deleteInsuranceItem, updateInsuranceItem, setCurrentInsuranceItem, unsetCurrentInsuranceItem } = insuredDevicesSlice.actions;
export default insuredDevicesSlice
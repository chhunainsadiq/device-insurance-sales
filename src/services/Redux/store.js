import { configureStore } from '@reduxjs/toolkit'
import insuredDevicesSlice from './insuredDevicesSlice'

const store = configureStore({
  reducer: {
    insuredDevices: insuredDevicesSlice.reducer,
  },
})

export default store
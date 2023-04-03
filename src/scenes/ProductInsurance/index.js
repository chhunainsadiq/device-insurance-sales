import React, { useEffect, useMemo } from "react"
import styled from "styled-components";
import InsuranceForm from "./components/InsuranceForm";
import InsuranceListing from "./components/InsuranceListing";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDevices } from "../../services/Redux/insuredDevicesSlice"
import SalesPieChart from "../../components/SalesPieChart";
import { formatPieChartData } from "../../services/utils/functions";
import { screenSizes } from "../../services/general/constants";

export const ProductInsuranceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    .container {
        display: flex;
        flex-direction: row;
        height: 100%;

        @media only screen and (max-width: ${`${screenSizes.md}px`}) {
            flex-direction: column;
        }
    }

    .chart-container-styles {
        width: 100%;
        height: 100%;
        background-color: white;
        flex: 2;

        @media only screen and (max-width: ${`${screenSizes.md}px`}) {
            flex: 1;
        }
    }
`

function ProductInsurance(){
    const dispatch = useDispatch()
    const { insuredDevicesItems, currentInsuredItem } = useSelector(state => state.insuredDevices)

    const formattedData = useMemo(() => {
        return formatPieChartData(insuredDevicesItems)
    }, [insuredDevicesItems])
   
    useEffect(() => {
        dispatch(fetchAllDevices("https://phone-specs-api.azharimm.dev/latest"))
    }, [dispatch])

    return(
        <ProductInsuranceWrapper>
          <div className="container">
            <InsuranceForm />
            <SalesPieChart data={formattedData} className="chart-container-styles" total={insuredDevicesItems?.length} />
          </div>
          <InsuranceListing insuredDevicesItems={insuredDevicesItems} disabledId={currentInsuredItem?.id} />
        </ProductInsuranceWrapper>
    )
}

export default ProductInsurance
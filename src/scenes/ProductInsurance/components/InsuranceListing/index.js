import PropTypes from "prop-types"
import React from "react"
import isEmpty from "lodash/isEmpty"
import Button from "../../../../components/Button"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { deleteInsuranceItem, setCurrentInsuranceItem } from "../../../../services/Redux/insuredDevicesSlice"
import { screenSizes } from "../../../../services/general/constants"


const StyledListing = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.light};
  padding: 15px;
  margin-top: 15px;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  border-radius: 5px;

  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 15px;
    margin-top: 0;
    font-size: 20px;
  }

  .listing-container {
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border: 1px solid ${(props) => props.theme.colors.grayscale.gray3};

    @media only screen and (max-width: ${`${screenSizes.sm}px`}) {
      flex-direction: column;
    }

    .sales-details {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      flex: 1;

      @media only screen and (max-width: ${`${screenSizes.sm}px`}) {
        width: 100%;
        justify-content: space-evenly;
      }

      & p {
        color: ${(props) => props.theme.colors.primary};
        text-align: center;
        overflow: hidden;
        font-size: "1em";
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .buttons-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex: 1;

    .update {
      margin-right: 15px;
    }
  }

  .empty-message {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`;

function InsuranceListing({ insuredDevicesItems, disabledId }){
    const dispatch = useDispatch()

    const handleUpdateItem = (id) => {
        dispatch(setCurrentInsuranceItem(id))
        const salesForm = document.querySelector(".insurance-sales-form");
        if(salesForm){
          salesForm?.scrollIntoView({ behavior: "smooth" });
        }
    }
    return (
        <StyledListing>
            <p className="title">Insured Devices Listing</p>
            {insuredDevicesItems.map((insuredItem) => (
                <div className="listing-container" key={insuredItem.id}>
                    <div className="sales-details">
                        <p>{insuredItem.first_name}</p>
                        <p>{insuredItem.last_name}</p>
                        <p>{insuredItem.age}</p>
                        <p>{insuredItem.product.label}</p>
                    </div>
                    <div className="buttons-container">
                        <Button size="small" className="update" onClick={() => { handleUpdateItem(insuredItem.id) }}>Update</Button>
                        <Button size="small" disabled={insuredItem.id === disabledId} styletype="danger" onClick={() => { dispatch(deleteInsuranceItem(insuredItem.id)) }}>Delete</Button>
                    </div>
                </div>
            ))}
            {isEmpty(insuredDevicesItems) && (
                <div className="empty-message">No Insured Device to be shown</div>
            )}
        </StyledListing>
    )
}

export default InsuranceListing

InsuranceListing.prototypes = {
    insuredDevicesItems: PropTypes.array.isRequired,
    disabledId: PropTypes.string,
}
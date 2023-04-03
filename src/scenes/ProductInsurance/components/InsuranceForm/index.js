import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import React, { useMemo } from "react";
import * as Yup from "yup";
import { v4 as uuid } from 'uuid';
import styled from "styled-components";
import Button from "../../../../components/Button/index"
import { useDispatch, useSelector } from "react-redux";
import { saveInsuranceItem, updateInsuranceItem, unsetCurrentInsuranceItem } from "../../../../services/Redux/insuredDevicesSlice";
import { screenSizes } from "../../../../services/general/constants";

import Input from "../../../../components/FormComponents/Input";
import FormikSelect from "../../../../components/FormComponents/FormikSelect";

const InsuranceFormWrapper = styled.div`
    flex: 1;

    .form-action {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        margin: 0 16px;

        @media only screen and (max-width: ${`${screenSizes.md}px`}) {
            margin-bottom: 16px;
        }
    }
    .cancel {
        margin-right: 20px;
    }

    .insurance-sales-form {
        display: flex;
        flex-direction: column;

        .row {
            display: flex;
        }
    }

`

const schema = () =>
  Yup.object().shape({
    first_name: Yup.string().strict().matches(/^[a-zA-Z ]*$/, "Please enter a valid value").required("Is Required"),
    last_name: Yup.string().strict().matches(/^[a-zA-Z ]*$/, "Please enter a valid value").required("Is Required"),
    email: Yup.string()
      .required("Is Required").email("Is Not a Valid Email")
      .nullable(),
    age: Yup.number().typeError("Please enter a valid value").integer("Please enter a valid value").min(18, "You are not elegible for this product").required("Is Required"),
    product: Yup.object()
    .required("Is Required")
    .nullable(),
});

function InsuranceForm() {
    const { devices, deviceFetchStatus, currentInsuredItem } = useSelector(state => state.insuredDevices)
    const dispatch = useDispatch()
    
    const deviceOptions = useMemo(
        () =>
          devices?.map((device) => ({
            label: device.phone_name,
            value: device.slug,
          })),
        [devices]
    );

  const handleSubmit = (values, helpers) => {
    if (!isEmpty(currentInsuredItem)) {
      dispatch(updateInsuranceItem({ id: currentInsuredItem?.id, ...values }));
      dispatch(unsetCurrentInsuranceItem())
    } else {
      dispatch(saveInsuranceItem({ id: uuid(), ...values }))
    }
    helpers.resetForm();
  };

  return (
    <InsuranceFormWrapper>
      <Formik
        enableReinitialize
        initialValues={{
          first_name: currentInsuredItem?.first_name || "",
          last_name: currentInsuredItem?.last_name || "",
          email: currentInsuredItem?.email || "",
          age: currentInsuredItem?.age || "",
          product:
            !isEmpty(currentInsuredItem)
            ? deviceOptions.find(
                (item) => item.value === currentInsuredItem.product.value
            )
            : "",
        }}
        validationSchema={() => schema()}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          return (
            <Form className="insurance-sales-form" data-testid="device-insurance-form">
               <div className="row">
                  <Input
                    id="first_name"
                    name="first_name"
                    label="First Name"
                  />
                  <Input
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                  />
               </div>

               <div className="row">
                  <Input
                    id="email"
                    name="email"
                    label="Email"
                  />
               </div>

               <div className="row">
                  <Input
                    id="age"
                    name="age"
                    label="Age"
                    flexSize={1}
                  />

                  <FormikSelect
                    overflow
                    id="product"
                    name="product"
                    label="Product"
                    options={deviceOptions}
                    isLoading={deviceFetchStatus?.loading}
                    isClearable
                    isSearchable
                    isDisabled={false}
                    flexSize={2}
                  />
               </div>

              <div className="form-action">
                  {!isEmpty(currentInsuredItem) && (
                    <Button type="button" onClick={() => { dispatch(unsetCurrentInsuranceItem())}} size="small" styletype="secondary" className="cancel">Cancel</Button>
                  )}
                  <Button type="submit" data-testid="form-action-button" size="small">
                    Submit
                  </Button>
               </div>
            </Form>
         );
        }}
      </Formik>
    </InsuranceFormWrapper>
  );
}

InsuranceForm.propTypes = {
  edit: PropTypes.bool,
  initialValues: PropTypes.object,
};

InsuranceForm.defaultProps = {
  edit: false,
  initialValues: null,
};

export default InsuranceForm;

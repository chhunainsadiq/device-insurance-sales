/* eslint-disable testing-library/prefer-screen-queries */
import userEvent from "@testing-library/user-event";
import React from "react";

import "@testing-library/jest-dom";
import { deviceOptions } from "../../../../../../mocks/deviceOptions"
import { initialState } from "../../../../../services/Redux/insuredDevicesSlice";
import { renderComponent } from "../../../../../services/utils/test-utils";

import InsuranceForm from "../index";

const currentInsuredItem = {
    first_name: "test",
    last_name: "testing",
    email: "test@testing.com",
    age: "18",
    product: {
        label: "Oppo Find N3",
        value: "oppo_find_n3-12205"
    }
}
const fields = ["first_name", "last_name", "age", "email", "product"]

describe("Testing a product insurance sales form component", () => {

  it("should render a component without crash", () => {
    const { getByTestId } = renderComponent(<InsuranceForm />, {
        insuredDevices: { ...initialState },
    });
    expect(getByTestId("device-insurance-form")).toBeInTheDocument();
  });

  it('should throw error for age typed less than 18', async () => {
    const { queryByTestId, queryByText, getByTestId, getByText } = renderComponent(<InsuranceForm />, {
        insuredDevices: { ...initialState },
    });
    
    const firstNameElement = queryByTestId('age');
    const browserEvent = userEvent.setup();
    const errorMessage = "You are not elegible for this product"

    expect(queryByTestId('age-error')).not.toBeInTheDocument();
    expect(queryByText(errorMessage)).not.toBeInTheDocument();
    
    await browserEvent.type(firstNameElement, "12");
    await browserEvent.click(document.body);
    expect(getByTestId('age-error')).toBeInTheDocument();
    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('should not throw any error when typed age is above 18', async () => {
    const { queryByTestId, queryByText } = renderComponent(<InsuranceForm />, {
        insuredDevices: { ...initialState },
    });
    const firstNameElement = queryByTestId('age');
    const browserEvent = userEvent.setup();
    const errorMessage = "You are not elegible for this product"
    
    await browserEvent.type(firstNameElement, "19");
    await browserEvent.click(document.body);
    expect(queryByTestId('age-error')).not.toBeInTheDocument();
    expect(queryByText(errorMessage)).not.toBeInTheDocument();
  });

  it('should throw error for invalid email format', async () => {
    const { queryByTestId, queryByText, getByTestId, getByText } = renderComponent(<InsuranceForm />, {
        insuredDevices: { ...initialState },
    });
    const firstNameElement = queryByTestId('email');
    const browserEvent = userEvent.setup();
    const errorMessage = "Is Not a Valid Email"

    expect(queryByTestId('email-error')).not.toBeInTheDocument();
    expect(queryByText(errorMessage)).not.toBeInTheDocument();
    
    await browserEvent.type(firstNameElement, "wrongemail.com");
    await browserEvent.click(document.body);
    expect(getByTestId('email-error')).toBeInTheDocument();
    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it('should not throw any error on correct email format', async () => {
    const { queryByTestId, queryByText } = renderComponent(<InsuranceForm />, {
        insuredDevices: { ...initialState },
    });
    const firstNameElement = queryByTestId('email');
    const browserEvent = userEvent.setup();
    const errorMessage = "Is Not a Valid Email"
    
    await browserEvent.type(firstNameElement, "test@gmail.com");
    await browserEvent.click(document.body);
    expect(queryByTestId('email-error')).not.toBeInTheDocument();
    expect(queryByText(errorMessage)).not.toBeInTheDocument();
  });

  it('should throw error for required field', async () => {
    const { queryByTestId, queryByText, getByTestId, getByText } = renderComponent(<InsuranceForm />, {
        insuredDevices: { ...initialState },
    });
    const firstNameElement = queryByTestId('first_name');
    const browserEvent = userEvent.setup();
    const errorMessage = "Is Required"
    expect(queryByTestId('first_name-error')).not.toBeInTheDocument();
    expect(queryByText(errorMessage)).not.toBeInTheDocument();
    
    await browserEvent.type(firstNameElement, "test");
    await browserEvent.clear(firstNameElement);
    await browserEvent.click(document.body);
    expect(getByTestId('first_name-error')).toBeInTheDocument();
    expect(getByText(errorMessage)).toBeInTheDocument();
  });

  it("Should not submit form, with empty values and will throw required validation error", async () => {
    const { queryByTestId, getByTestId, getAllByText } = renderComponent(<InsuranceForm />, {
        insuredDevices: { ...initialState },
    });
    const errorMessage = "Is Required"
    const submitButton = queryByTestId('form-action-button');
    const browserEvent = userEvent.setup();
    
    await browserEvent.dblClick(submitButton);
    fields.forEach((formField) => {
        expect(getByTestId(`${formField}-error`)).toBeInTheDocument();
    })
    expect(getAllByText(errorMessage)).toHaveLength(fields.length);
  })

  it("should submit the form, as valid form values, with no validation error", async () => {
    const { queryByTestId, queryByText } = renderComponent(<InsuranceForm />, {
        insuredDevices: { ...initialState, devices: deviceOptions, currentInsuredItem },
    });
    const submitButton = queryByTestId('form-action-button');
    const browserEvent = userEvent.setup();
    await browserEvent.dblClick(submitButton);
    // Now there will no validation error in the DOM, means all values are correct
    fields.forEach(() => {
        expect(queryByText("Is Required")).not.toBeInTheDocument();
    })
    expect(queryByText("Is Not a Valid Email")).not.toBeInTheDocument();
    expect(queryByText("You are not elegible for this product")).not.toBeInTheDocument();
    expect(queryByText("Please enter a valid value")).not.toBeInTheDocument();
  })
});


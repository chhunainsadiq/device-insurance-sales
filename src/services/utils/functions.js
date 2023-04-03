import isEmpty from "lodash/isEmpty";

export const getRandomHexCode = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

// const data = [
//   {
//     label: "Cash",
//     value: 6000,
//     fill: "green"
//   },
// ]
export const formatPieChartData = (insuredDevicesItems) => {
    if(!isEmpty(insuredDevicesItems)){
        return insuredDevicesItems.reduce((formattedData, insuredItem) => {
            const existingProduct = formattedData.find((product) => product.slug === insuredItem.product.value);
            if (existingProduct) {
              existingProduct.value++;
            } else {
              formattedData.push({
                slug: insuredItem.product.value,
                label: insuredItem.product.label,
                value: 1,
                fill: getRandomHexCode()
              });
            }
            return formattedData;
        }, [])
    }
    return []
}
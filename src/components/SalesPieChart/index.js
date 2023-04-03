import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { PieChart, Pie, ResponsiveContainer, LabelList } from "recharts";

const SalesPieChart = React.memo(({ data, total, className }) => {

  const renderLabel = useCallback((sector) => {
    return sector.label;
  }, []);

  const renderPercentage = (listData) => {
    let percentageCalculated = (listData.value / total) * 100;
    return `${percentageCalculated.toFixed(2).toString()}%`;
  };

  return (
      <ResponsiveContainer className={className}>
        <PieChart style={{ cursor: "pointer" }}>
          <Pie
            dataKey="value"
            data={data}
            label={renderLabel}
            cx="50%"
            cy="50%"
            outerRadius={"75%"}
            nameKey="name"
          >
            <LabelList
              dy={-3}
              fill="white"
              dataKey={renderPercentage}
              position="inside"
              angle="0"
              stroke="none"
              className="label-percentage"
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
  );
});

SalesPieChart.propTypes = {
  data: PropTypes.array.isRequired,
  total: PropTypes.number,
  className: PropTypes.string
};

SalesPieChart.defaultProps = {
  total: 0, 
}

export default SalesPieChart;
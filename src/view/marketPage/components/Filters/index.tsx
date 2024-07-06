import React, { FC } from "react";

import { CustomSelect } from "../../../../shared/components";
import { COINS_FILTERS } from "../../../../shared/models/markerPage";
import { Currency, FiltersMarketsProps, Order } from "../../../../types";

const Filters: FC<FiltersMarketsProps> = ({
  currentQSParams,
  setCurrentQSParams,
}) => {
  return (
    <div style={styles.wrapper as React.CSSProperties}>
      <CustomSelect
        value={currentQSParams.currency as Currency}
        onChange={(value) =>
          setCurrentQSParams((prevParams) => ({
            ...prevParams,
            currency: value as Currency,
          }))
        }
        style={styles.currencySelect as React.CSSProperties}
        arrayOptons={COINS_FILTERS.currency}
      />
      <CustomSelect
        value={currentQSParams.order as Order}
        onChange={(value) =>
          setCurrentQSParams((prevParams) => ({
            ...prevParams,
            order: value as Order,
          }))
        }
        style={styles.orderSelect as React.CSSProperties}
        arrayOptons={COINS_FILTERS.order}
      />
    </div>
  );
};

export default Filters;

const styles = {
  wrapper: {
    display:'flex',
    marginBottom: 20
  },
  currencySelect: {
    width: 120,
    marginRight: 20,
    textAlign: "left",
  },
  orderSelect: {
    width: 180,
    textAlign: "left"
  }
};

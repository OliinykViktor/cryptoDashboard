import React, {
  FC,
  useEffect,
  useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Pagination,
  Result,
  Table,
  Typography
} from "antd";

import { AppDispatch } from "../../app/redux/store";
import {
  fetchMarkets,
  selectMarkets,
} from "../../app/redux/slices/marketsSlice";
import { COINS_TABLE_HEADER } from "../../shared/models/markerPage";
import { CodeModal, ThemeSwitcher } from "../../shared/components";
import { FetchMarketsParams, Market } from "../../types";
import { Filters, RenderColumns } from "./components";

const MarketPage: FC = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [currentQSParams, setCurrentQSParams] = useState<FetchMarketsParams>({
    page: 1,
    currency: "USD",
    order: "Market_cap_desc"
  });

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(selectMarkets);

  useEffect(() => {
    dispatch(fetchMarkets({ ...currentQSParams }));
  }, [dispatch, currentQSParams]);

  const toggleModal = () => setIsOpenModal((prev) => !prev);

  if (error) return <Result subTitle={error} />;

  const columns = RenderColumns<Market>({ columns: COINS_TABLE_HEADER });

  return (
    <div style={styles.wrapper as React.CSSProperties}>
      <div style={styles.wrapperBtn}>
        <ThemeSwitcher />
        <Button
          type="primary"
          onClick={toggleModal}
        >
          Open Modal
        </Button>
      </div>
      <CodeModal
        isOpenModal={isOpenModal}
        toggleModal={toggleModal}
      />
      <Typography.Title
        level={3}
        style={styles.title as React.CSSProperties}
      >
        Coins & Markets
      </Typography.Title>
      <Filters
        currentQSParams={currentQSParams}
        setCurrentQSParams={setCurrentQSParams} />
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={false}
        style={styles.table as React.CSSProperties}
      />
      <Pagination
        current={currentQSParams.page}
        total={10000}
        onChange={(page) =>
          setCurrentQSParams((prevParams) => ({
            ...prevParams,
            page,
          }))
        }
        pageSize={10}
        style={styles.pagination as React.CSSProperties}
      />
    </div>
  );
};

export default MarketPage;

const styles = {
  wrapper: {
    padding: 20
  },
  pagination: {
    marginTop: 16,
    textAlign: "center",
    justifyContent: "flex-end",
  },
  table: {
    marginTop: 10
  },
  title: {
    marginBottom: 24,
    textAlign: 'left',
  },
  wrapperBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 24,
  }
};

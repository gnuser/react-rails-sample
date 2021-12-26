import { Table, message, Popconfirm } from "antd";
import React from "react";

class Arbitrager extends React.Component {
  columns = [
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Buy Price",
      dataIndex: "buyPrice",
      key: "buyPrice",
    },
    {
      title: "Sell Price",
      dataIndex: "sellPrice",
      key: "sellPrice",
    },
    {
      title: "Exchange Price",
      dataIndex: "exchangePrice",
      key: "exchangePrice",
    },
    {
      title: "Diff",
      dataIndex: "diff",
      key: "diff",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    }
  ];

  state = {
    spreads: [],
  };

  componentDidMount() {
    this.loadSpreads();
  }

  loadSpreads = () => {
    const url = "api/v1/arbitrage/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        data.forEach((beer) => {
          const newEl = {
            key: beer.id,
            id: beer.id,
            brand: beer.brand,
            style: beer.style,
            country: beer.country,
            quantity: beer.quantity,
          };

          this.setState((prevState) => ({
            spreads: [...prevState.spreads, newEl],
          }));
        });
      })
      .catch((err) => message.error("Error: " + err));
  };

  reloadSpreads = () => {
    this.setState({ spreads: [] });
    this.loadSpreads();
  };

  render() {
    return (
      <>
        <h1>Spread</h1>
        <Table className="table-striped-rows" dataSource={this.state.spreads} columns={this.columns} pagination={{ pageSize: 5 }} />
      </>
    );
  }
}

export default Arbitrager;
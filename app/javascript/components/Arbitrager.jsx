import { Table, message, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";

class Arbitrager extends React.Component {
  
  columns = [
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Buy Price",
      dataIndex: "buy_price",
      key: "buy_price",
    },
    {
      title: "Sell Price",
      dataIndex: "sell_price",
      key: "sell_price",
    },
    {
      title: "Exchange Price",
      dataIndex: "exchange_price",
      key: "exchange_price",
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
    setInterval(() => {
      this.reloadSpreads();
    }, 5000);
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
        data.forEach((spread) => {
          const newEl = {
            key: spread.currency,
            id: spread.currency,
            currency: spread.currency,
            buy_price: spread.buy_price,
            sell_price: spread.sell_price,
            exchange_price: spread.exchange_price,
            diff: spread.diff,
            message: spread.message
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
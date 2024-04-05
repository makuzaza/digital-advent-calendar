import React, { useState } from 'react';
import './date-and-order.css';

interface Order {
  id: number;
  name: string;
}

interface Props {
  orders: Order[];
}

const DateAndOrderPicker: React.FC<Props> = ({ orders }) => {
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const orderId = parseInt(event.target.value);
    const order = orders.find((order) => order.id === orderId);
    setSelectedOrder(order || null);
  };

  return (
    <div className="date-and-order">
      <div>
        <label
          htmlFor="fromDatePicker"
          style={{ display: 'inline-block', width: '100px' }}
        >
          From Date:
        </label>
        <input
          className="input"
          type="date"
          id="fromDatePicker"
          value={fromDate}
          onChange={handleFromDateChange}
        />
      </div>

      <div>
        <label
          htmlFor="toDatePicker"
          style={{ display: 'inline-block', width: '100px', margin: '10px 0' }}
        >
          To Date:
        </label>
        <input
          type="date"
          id="toDatePicker"
          value={toDate}
          onChange={handleToDateChange}
        />
      </div>

      <label className="label" htmlFor="orderPicker">
        Select an Order:
      </label>
      <select
        id="orderPicker"
        value={selectedOrder ? selectedOrder.id : ''}
        onChange={handleOrderChange}
      >
        <option value="">Select an order...</option>
        {orders.map((order) => (
          <option key={order.id} value={order.id}>
            {order.name}
          </option>
        ))}
      </select>

      <div>
        <h2 style={{ fontSize: '1.3rem' }}>From Date: {fromDate}</h2>
        <h2 style={{ fontSize: '1.3rem' }}>To Date: {toDate}</h2>
        {selectedOrder && (
          <h2 style={{ fontSize: '1.3rem' }}>
            Selected Order: {selectedOrder.name}
          </h2>
        )}
      </div>
      <div className="buttons">
        <button className="reset-btn" type="submit">
          Reset
        </button>
        <button className="apply-btn" type="submit">
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateAndOrderPicker;

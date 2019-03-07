import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import SmartDataTable from 'react-smart-data-table';

const TransactionList = props => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions(props.userId);
  }, []);

  const formatDates = value => {
    const formatted = value.map(row => {
      row.Date = new Date(row.Date).toLocaleDateString();
      return row;
    });
    return formatted;
  };

  const getTransactions = async userId => {
    let transactions;
    if (sessionStorage.getItem('transactions') === null) {
      const eventref = firebase.database().ref(`users/${userId}/transactions`);
      const snapshot = await eventref.once('value');
      transactions = formatDates(snapshot.val());
      sessionStorage.setItem('transactions', JSON.stringify(transactions));
    } else {
      transactions = JSON.parse(sessionStorage.getItem('transactions'));
    }
    setTransactions(transactions);
  };

  return (
    <>
      <SmartDataTable
        data={transactions}
        name='test-table'
        className='table'
        sortable
      />
    </>
  );
};

export default TransactionList;

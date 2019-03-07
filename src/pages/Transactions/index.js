import React from 'react';
import { Title } from 'bloomer';
import TransactionList from '../../components/TransactionList';

const Transactions = props => {
  return (
    <>
      <Title isSize={1}>Transactions</Title>
      <TransactionList userId={props.userId} />
    </>
  );
}

export default Transactions;
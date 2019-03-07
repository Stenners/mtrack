import React from 'react';
import { Title } from 'bloomer';
import CategoryList from '../../components/CategoryList';

const Categories = () => {
  return (
    <>
      <Title isSize={1}>Categories</Title>
      <CategoryList/>
    </>
  );
}

export default Categories;
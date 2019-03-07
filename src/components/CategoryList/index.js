import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { toProperCase } from "../../utils/strings";
import { Button } from "bloomer/lib/elements/Button";
import { Columns } from "bloomer/lib/grid/Columns";
import { Column } from "bloomer/lib/grid/Column";
import { Title } from "bloomer/lib/elements/Title";
import { Box } from "bloomer/lib/elements/Box";
import { Control } from "bloomer/lib/elements/Form/Control";
import { Field } from "bloomer/lib/elements/Form/Field/Field";
import { Radio } from "bloomer/lib/elements/Form/Radio";
import { Input } from "bloomer/lib/elements/Form/Input";
import { Label } from "bloomer/lib/elements/Form/Label";

const CategoryList = props => {
  const [categories, setCategories] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    getCategories(props.userId);
  }, []);

  const getCategories = async userId => {
    const eventref = firebase.database().ref("categories");
    const snapshot = await eventref.once("value");
    const value = snapshot.val();
    setCategories(value);
  };

  const handleClick = category => {
    const catObj = categories.find(cat => cat.name === category);
    setSelected(catObj);
  };

  return (
    <Columns isCentered>
      <Column isSize="1/2">
        <Title>Categories:</Title>
        <Field>
          <Label>Add new category</Label>
          <Control>
            <Input type="text" placeholder="Text Input" />
          </Control>
        </Field>
        <Field isGrouped>
          <Control>
            <Button isColor="primary">Submit</Button>
          </Control>
        </Field>
        <Box>
          <Field>
            <Control>
              {categories &&
                categories.map((category, i) => (
                  <Radio
                    key={i}
                    name="question"
                    onClick={() => handleClick(category.name)}
                  >
                    {toProperCase(category.name)}
                  </Radio>
                ))}
            </Control>
          </Field>
        </Box>
      </Column>
      <Column isSize="1/2">
        <Title>Category keywords:</Title>
        <Field>
          <Label>Add new keyword</Label>
          <Control>
            <Input type="text" placeholder="Text Input" />
          </Control>
        </Field>
        <Field isGrouped>
          <Control>
            <Button isColor="primary" disabled={!selected}>
              Submit
            </Button>
          </Control>
        </Field>
        <Box>
          {selected &&
            selected.keywords.map((keyword, i) => (
              <div key={i}>{toProperCase(keyword)}</div>
            ))}
        </Box>
      </Column>
    </Columns>
  );
};

export default CategoryList;

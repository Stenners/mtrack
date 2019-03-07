import firebase from "firebase";

const getCategories = async () => {
  const eventref = firebase.database().ref("/categories/");
  const snapshot = await eventref.once("value");
  const value = snapshot.val();
  return value;
};

let categoryArr = [];

export const setCategories = async () => {
  categoryArr = await getCategories();
};

const categorise = desc => {
  const bow = desc.toLowerCase().match(/\b(\w+)\b/g);

  let descCategory;

  categoryArr.forEach(category => {
    bow.forEach(word => {
      if (category.keywords.includes(word)) {
        descCategory = category.name;
      }
    });
  });

  return descCategory;
};

export default categorise;

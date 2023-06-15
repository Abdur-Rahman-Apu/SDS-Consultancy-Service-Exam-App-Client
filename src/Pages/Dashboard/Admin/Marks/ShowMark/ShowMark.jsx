/* eslint-disable react/prop-types */
import React from "react";

const ShowMark = ({ item }) => {
  console.log(item, "item");
  return (
    <>
      <tr className="bg-[#f7f1e3]">
        <td>{item[0]}</td>
        <td>{item[1].length ? item[1][0] : <p>No exam is given</p>}</td>
      </tr>
    </>
  );
};

export default ShowMark;

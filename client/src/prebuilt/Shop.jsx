import React from "react";
import styled from "@emotion/styled";

import Image from "./Image";
import Quantity from "./Quantity";

const ShopDiv = styled.div`
  padding: 10px 20px 40px 20px;
`;

const ShopName = styled.h1`
  font-size: 18px;
  color: #fff;
  font-style: normal;
  font-variant: normal;
  font-weight: 400;
  line-height: 26.4px;
  margin-bottom: 20px;
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Shop = ({ onAddDonation, onRemoveDonation, numDonation }) => {
  return (
    <ShopDiv>
      <ShopName> </ShopName>
      <Image src="./title.png" width="400px"></Image>
      <Image src="./please.png" width="200px"></Image>
      <Image src="./kittens.png" width="100px"></Image>
      <Controls>
        <Quantity
          onAdd={onAddDonation}
          onRemove={onRemoveDonation}
          quantity={numDonation}
        />
      </Controls>
      <Image src="./onedollar.png" width="300px"></Image>
    </ShopDiv>
  );
};

export default Shop;

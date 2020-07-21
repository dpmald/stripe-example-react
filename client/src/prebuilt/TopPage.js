import React, { useState } from "react";
import Router from "next/router";

import Layout from "../Layout";
import Row from "./Row";
import Shop from "./Shop";
import CheckoutForm from "../CheckoutForm";
import getPrice from "./GetPrice";



const TopPage = props => {
  const [numDonation, setNumDonation] = useState(1);

  const addDonation = () => setNumDonation(num => Math.min(20, num + 1));
  const remDonation = () => setNumDonation(num => Math.max(1, num - 1));

  return (
    <Layout title="Feed some kittens">
      <Row>
        <Shop
          onAddDonation={addDonation}
          onRemoveDonation={remDonation}
          numDonation={numDonation}
        />
        <CheckoutForm
          price={getPrice(numDonation)}
        />
      </Row>
    </Layout>
  );
};

export default TopPage;

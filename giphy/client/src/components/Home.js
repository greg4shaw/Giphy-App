import React from "react";
import Card from "./Card";
import bank from "./bank.png";

function Home() {
  return (
    <Card
      bgcolor="primary"
      txtcolor="white"
      header="WELCOME to the Fat Piggy Bank"
      title="Deposit cash | Earn bonuses | Be as happy as a pig in..."
      text="We are here to help you fatten your piggy."
      body={<img src={bank} className="img-fluid" alt="" />}
    />
  );
}

export default Home;
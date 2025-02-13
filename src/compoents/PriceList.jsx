import React from 'react';

const PriceList = () => {
  // Array of price list data
  const priceList = [
    {
      unitType: "2 BHK",
      unitArea: "On Request",
      unitPrice: "₹ On Request"
    },
    {
      unitType: "3 BHK",
      unitArea: "On Request",
      unitPrice: "₹ On Request"
    },
    {
      unitType: "4 BHK",
      unitArea: "On Request",
      unitPrice: "₹ On Request"
    }
  ];

  return (
    <section className="amenities_wrap" id="price">
      <div className="container">
        <h2 className="section-title">
          Prestige City Siddharth Vihar Ghaziabad Price List
        </h2>
        <div className="borBot"></div>

        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="table-responsive">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td><b>UNIT TYPE</b></td>
                  <td><b>UNIT AREA</b></td>
                  <td><b>UNIT PRICE</b></td>
                </tr>
                {/* Dynamically render the rows */}
                {priceList.map((price, index) => (
                  <tr key={index}>
                    <td>{price.unitType}</td>
                    <td>{price.unitArea}</td>
                    <td
                      className="get-price-offer"
                      style={{ color: "#a88154" }}
                    >
                      {price.unitPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceList;

import {
  calculateCurrentCaffeineLevel,
  coffeeConsumptionHistory,
  getCaffeineAmount,
  timeSinceConsumption,
} from "../utils";

const History = () => {
  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-timeline " />
        <h2>Header</h2>
      </div>
      <p>
        <i>Hover for more information!</i>
      </p>
      <div className="coffee-history">
        {Object.keys(coffeeConsumptionHistory)
          .sort((a, b) => b - a)
          .map((utcTime, coffeeIndx) => {
            const coffee = coffeeConsumptionHistory[utcTime];
            const timeSinceConsume = timeSinceConsumption(utcTime);
            const orginalAmount = getCaffeineAmount(coffee.name);
            const remainingAmount = calculateCurrentCaffeineLevel({
              [utcTime]: coffee,
            });

            const summary = `${coffee.name} | ${timeSinceConsume} | ${orginalAmount}mg / ${remainingAmount}`;

            return (
              <div title={summary} key={coffeeIndx}>
                {" "}
                <i className="fa-solid fa-mug-hot" />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default History;

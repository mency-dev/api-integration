import { useState } from "react";

export default function FruitCount() {
  const [totalFruits, setTotalFruits] = useState({
    Apple: 10,
    Banana: 10,
    Orange: 10,
  });

  const [selectedFruits, setSelectedFruits] = useState({
    Apple: 0,
    Banana: 0,
    Orange: 0,
  });
  const handleClick = (fruit) => {
    if (totalFruits[fruit] > 0) {
      setTotalFruits((prev) => ({
        ...prev,
        [fruit]: prev[fruit] - 1,
      }));

      setSelectedFruits((prev) => ({
        ...prev,
        [fruit]: prev[fruit] + 1,
      }));
    }
  };

  const totalSelected = Object.values(selectedFruits).reduce(
    (acc, val) => acc + val,
    0
  );

  return (
    <div style={{ fontFamily: "Arial", lineHeight: "2" }}>
      <h3>Available Fruits</h3>
      <div>
        {Object.keys(totalFruits).map((fruit) => (
          <button
            key={fruit}
            onClick={() => handleClick(fruit)}
            style={{ marginRight: "10px", padding: "5px 10px" }}
          >
            {fruit}: {totalFruits[fruit]}
          </button>
        ))}
      </div>

      <h3>Selected Fruits</h3>
      <div>
        {Object.keys(selectedFruits).map((fruit) => (
          <div key={fruit}>
            {fruit}: {selectedFruits[fruit]}
          </div>
        ))}
      </div>

      <h3>Total Fruit: {totalSelected}</h3>
    </div>
  );
}

import { useState } from "react";

export default function FruitCount() {
  const [fruits, setFruits] = useState([]);
function addFruit(name){
    setFruits(prev=>({
        ...prev,[name]:(prev[name] || 0)+1
    }))
}

  return (
    <div className="w-100 text-center p-10">
      <h3>Click a fruit</h3>
      <div className="flex justify-between">
      <button onClick={() => addFruit("Apple")}>Apple</button>
      <button onClick={() => addFruit("Banana")}>Banana</button>
      <button onClick={() => addFruit("Orange")}>Orange</button>
      </div>
      <div>
        {fruits.map(([fruits,count])=>(
            <div key={fruits}>
                {fruits}:{count}

                </div>
        ))}
      </div>
    </div>
  );
}

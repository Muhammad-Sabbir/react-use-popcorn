import { useState, useEffect } from "react";
export default function CurrencyConverter() {
  const [money, setMoney] = useState(0);
  const [from, setFrom] = useState("CAD");
  const [to, setTo] = useState("EUR");
  const [output, setOutput] = useState("OUTPUT");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchConverter() {
      try {
        if (to === from) {
          console.log("bal");
        } else {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${money}&from=${from}&to=${to}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies");
          }
          const data = await res.json();
          console.log(data);
          setOutput(data.rates[to]);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchConverter();
    return function () {
      controller.abort();
    };
  }, [money, from, to]);
  //   console.log(money);
  return (
    <div>
      <input
        type="text"
        value={money}
        onChange={(e) => setMoney(e.target.value)}
        disabled={isLoading}
      />
      <select
        defaultValue={from}
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        defaultValue={to}
        value={to}
        onChange={(e) => setTo(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{from === to ? money : output}</p>
    </div>
  );
}

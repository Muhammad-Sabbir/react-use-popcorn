import { useEffect, useState, useRef } from "react";

export default function Ignition() {
  const [tag, setTag] = useState("");
  const [tagRead, setTagRead] = useState("");
  const click_ref = useRef(null);
  useEffect(() => {
    const url = `/system/webdev/AutomizeOEM/tagRead`;
    // const url = `http://50.66.140.198:18088/system/webdev/AutomizeOEM/tagRead`;
    const body = {
      tagPaths: [
        "[default]Canada Wind Farm/Alberta/Optimist Wind Energy/OWE 1/RPM",
        "[default]Canada Wind Farm/Alberta/Optimist Wind Energy/OWE 2/RPM",
      ],
    };
    async function fetchConverter() {
      try {
        const res = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          // mode: "no-cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          throw new Error("Something went wrong with fetching data");
        }
        const data = await res.json();
        setTag(
          data[
            "[default]Canada Wind Farm/Alberta/Optimist Wind Energy/OWE 2/RPM"
          ]["value"]
        );
        console.log(
          data[
            "[default]Canada Wind Farm/Alberta/Optimist Wind Energy/OWE 2/RPM"
          ]["value"]
        );
      } catch (err) {
        console.log(err.message);
      }
    }
    click_ref.current = fetchConverter;
  }, [tag]);
  useEffect(() => {

    const url = `/system/webdev/AutomizeOEM/tagRead`;
    // const url = `http://50.66.140.198:18088/system/webdev/AutomizeOEM/tagRead`;
    const body = {
      tagPaths: [
        "[default]Canada Wind Farm/Alberta/Optimist Wind Energy/OWE 1/RPM",
        "[default]Canada Wind Farm/Alberta/Optimist Wind Energy/OWE 2/RPM",
      ],
    };
    async function fetchTagValues() {
      try {
        const res = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          // mode: "no-cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          throw new Error("Something went wrong with fetching data");
        }
        const data = await res.json();
        setTagRead(
          data[
            "[default]Canada Wind Farm/Alberta/Optimist Wind Energy/OWE 2/RPM"
          ]["value"]
        );
        console.log(
          data[
            "[default]Canada Wind Farm/Alberta/Optimist Wind Energy/OWE 2/RPM"
          ]["value"]
        );
      } catch (err) {
        console.log(err.message);
      }
    }
    const interval = setInterval(async ()=>{
      fetchTagValues();
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div>
      <button onClick={() => click_ref.current()}>Reading Tag Data</button>
      <h1>{tag}</h1>
      <h1>{tagRead}</h1>
    </div>
  );
}
//  // "proxy": "http://localhost:8088",
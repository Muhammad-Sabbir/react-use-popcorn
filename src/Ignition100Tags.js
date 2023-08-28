import { useEffect, useState, useRef } from "react";


const url = `/system/webdev/AutomizeOEM/tagRead`;
const tagList1=Array.apply(null, Array(20)).map(function (y, i) { return `[default]Canada Wind Farm/Alberta/Optimist Wind Energy 1/OWE ${i+1}/Flow Rate` ; });
const tagList2=Array.apply(null, Array(20)).map(function (y, i) { return `[default]Canada Wind Farm/Alberta/Optimist Wind Energy 2/OWE ${i+1}/Flow Rate` ; });
const tagList3=Array.apply(null, Array(20)).map(function (y, i) { return `[default]Canada Wind Farm/Alberta/Optimist Wind Energy 3/OWE ${i+1}/Flow Rate` ; });
const tagList4=Array.apply(null, Array(20)).map(function (y, i) { return `[default]Canada Wind Farm/Alberta/Optimist Wind Energy 4/OWE ${i+1}/Flow Rate` ; });
const tagList5=Array.apply(null, Array(20)).map(function (y, i) { return `[default]Canada Wind Farm/Alberta/Optimist Wind Energy 5/OWE ${i+1}/Flow Rate` ; });
const body = {
  tagPaths: [...tagList1,...tagList2,...tagList3,...tagList4,...tagList5]
};
export default function Ignition100() {
  const [tagRead, setTagRead] = useState('');
  useEffect(() => {
    // const url = `/system/webdev/AutomizeOEM/tagRead`;
    // const url = `http://50.66.140.198:18088/system/webdev/AutomizeOEM/tagRead`;
    // const body = {
    //   tagPaths: [
    //     "[default]Canada Wind Farm/Alberta/Optimist Wind Energy 1/OWE 1/Flow Rate"
    //   ],
    // };
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
          data
        );
        // console.log(
        //   data["[default]Canada Wind Farm/Alberta/Optimist Wind Energy 1/OWE 1/Flow Rate"]["value"]
        // );
        console.log(
          tagRead
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
      <h1>Reading Tag Data</h1>
      <h1>Station Tag 1-20 </h1>
      {body.tagPaths.map((e,i)=> <h3>{JSON.stringify(tagRead[`[default]Canada Wind Farm/Alberta/Optimist Wind Energy 1/OWE ${i}/Flow Rate`])}</h3>)}
      <h1>Station Tag 21-40 </h1>
      {body.tagPaths.map((e,i)=> <h3>{JSON.stringify(tagRead[`[default]Canada Wind Farm/Alberta/Optimist Wind Energy 2/OWE ${i}/Flow Rate`])}</h3>)}
      <h1>Station Tag 41-60 </h1>
      {body.tagPaths.map((e,i)=> <h3>{JSON.stringify(tagRead[`[default]Canada Wind Farm/Alberta/Optimist Wind Energy 3/OWE ${i}/Flow Rate`])}</h3>)}
      <h1>Station Tag 61-80 </h1>
      {body.tagPaths.map((e,i)=> <h3>{JSON.stringify(tagRead[`[default]Canada Wind Farm/Alberta/Optimist Wind Energy 4/OWE ${i}/Flow Rate`])}</h3>)}
      <h1>Station Tag 81-100 </h1>
      {body.tagPaths.map((e,i)=> <h3>{JSON.stringify(tagRead[`[default]Canada Wind Farm/Alberta/Optimist Wind Energy 5/OWE ${i}/Flow Rate`])}</h3>)}
      
    </div>
  );
}
//  // "proxy": "http://localhost:8088",
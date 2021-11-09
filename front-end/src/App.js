import React, { useState, useEffect } from "react";

import{ sliceData } from "./utils";
import { ENUMS } from "./enums";

import SubItem from "./components/SubItem";
import Title from "./components/Title";

export default function App() {
 
  const [data, setData] = useState([]);

  useEffect(() => {
    runSocket();
  }, []);

  const runSocket = _ => {

    const sw = new WebSocket(ENUMS.WEB_SOCKET_API);

    sw.onopen = function() {
      sw.send(JSON.stringify(ENUMS.subscribeMsg));
    };

    sw.onmessage = msg => {
      let msgdata = JSON.parse(msg.data);
      console.log(msgdata);
      setDataView(msgdata, ENUMS.DEFAULT_LIST_LENGTH);
    };
  };

  const setDataView = (msgdata, lengthList) => {

    let asks = sliceData(msgdata.data.asks, lengthList);
    let bids = sliceData(msgdata.data.bids, lengthList);
    let dataEdit = Object.assign({}, { bids: {data: bids,asksR:true}}, { asks: {data: asks,asksR:false}} );

    setData(Object.values(dataEdit));

  }

  const renderItem = (data) => {
    return data.map( (particle, pid) => {
      return (
        <div key={pid}>         
          <ul style={{width: "auto"}}>
            <div className="App--title__container">
              <SubItem 
                key={pid + Math.random()}
                asksR={particle.asksR}
                item={ENUMS.TITLES[pid]}
                style={{
                  width: 100
                }}
              />
            </div>
            
            {
              particle.data.map( (item, id) => {
                return (
                 <SubItem 
                    key={pid+id}
                    asksR={particle.asksR}
                    item={item}
                    style={{
                      width: 100
                    }}
                 />                       
                );
              })
            }
          </ul>
        </div>
      )
    })
  }

  return (
    <div className="App">
        <Title title={"BTC-USD"}/>
        <div className="App--particle">
          {
            renderItem(data)
          }
        </div>
      
    </div>
  );
}

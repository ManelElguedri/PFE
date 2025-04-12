import React, {useState} from "react";
function Dinamik(){

    const [time, setTime] = useState(new Date().toLocaleTimeString());
    return(
    <div>
        <h1>Current Time: {time}</h1>
        <button onClick={() => setTime(new Date().toLocaleTimeString())}>Get Time</button>
    </div>);

}

export default Dinamik;
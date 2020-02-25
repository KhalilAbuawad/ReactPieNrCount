// skjema.js
import React, {useState} from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function skjema() {

    //input field data
    const [input, setInput] = useState('');

    //pie chart data
    const [pie, setPie] = useState([{
        name: '7',
        y: 7
      }, {
        name: '8',
        y: 2
      }, {
        name: '3',
        y: 3
    }]);

    //options used in piechart
    const [options, setOptions] = useState({
        chart: {
          type: 'pie',
          margin: [0, 0, 0, 0]
        },
        series: [
          {
            data: pie // initilize with pie's data
          }
        ],
        credits: {
            enabled: false
        },
        title: false,
        plotOptions:{
            pie:{
                dataLabels:{
                    distance:-20, // places the label in the center of the pie slice
                    color:'black',
                    style:{
                        textOutline:false
                    }
                }
            }
        },
        responsive: {  
            rules: [{  
              condition: {  
                maxWidth: 200  
              }
            }]  
          }
    });

    const handleChange = event => {
        const { value } = event.target;
        setInput(value)
    }

    const submitForm = () => {
        var found = false;
        
        // only 1-9 is allowed to be stored in pie
        if(input > 0 && input < 10){

            //check for number in pie
            pie.map(obj => {
                if(obj.name === input){
                    found = true;
                    obj.y += 1;
                    console.log(obj.y)
                    obj = {...obj, y:obj.y}
                }
            })

            // checks if number was new or not and adds it to pie state accordingly
            if(found){
                setPie(pie)
            }else{
                setPie(prev => [
                    ...prev,
                    {
                        name:input,
                        y: 1,
                    }
                ])
            }

            // updates options data
            setOptions(prev => ({
                ...prev,
                series: {
                    data:pie
                }
            }))
        }
       
    }

    return (
        <div>
            <h1 className="font">Hva er folks favoritt tall?</h1>
            <div className="boxleft">
                <div className="topText">skjema</div>
                <div id="boxRightText" className="boxText">Ditt tall</div>
                <input className="input" id="inNr" type="text" pattern="[1-9]" placeholder="1-9" value={input} onChange={handleChange} ></input>
                <div className="button" onClick={submitForm}>Send inn</div>
            </div>
            <div className="boxright" >
                <div className="topText">graf</div>
                <HighchartsReact containerProps={{ style: { height: "70%" } }} highcharts={Highcharts} options={options} />
                <div className="boxText" id="graftext">Resultat av avstemning</div>
            </div>
        </div>
    );
};


import fs from 'fs'
import { format } from 'path';



fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    let tariffs = JSON.parse(data);

    let arr = [];

    

    while(tariffs.length > 0){
        let objs = tariffs.splice(0,4);

        let obj = {};
        obj.RATE = {};

        for (const x of objs){
            
            obj.DESTINATION = x.DESTINATION;
            obj.CODE = x.CODE;
            if(x.RATE == "GEN, DG OK PAX"){
                
                obj.RATE["GEN, DG OK PAX"] = {
                    "MIN": x.MIN,
                    "N": x.N,
                    "45kg": x["45kg"],
                    "100kg": x["100kg"],
                    "500kg": x["500kg"],
                    "1000kg": x["1000kg"] 
                }
            }else if(x.RATE == "TK PLUS, CAO"){
                //obj.RATE = "TK PLUS, CAO";
                obj.RATE["TK PLUS, CAO"] = {
                    "MIN": x.MIN,
                    "N": x.N,
                    "45kg": x["45kg"],
                    "100kg": x["100kg"],
                    "500kg": x["500kg"],
                    "1000kg": x["1000kg"] 
                }
            }else if(x.RATE == "Pharma(PIL)"){
                //obj.RATE = "Pharma(PIL)";
                obj.RATE["Pharma(PIL)"] = {
                    "MIN": x.MIN,
                    "N": x.N,
                    "45kg": x["45kg"],
                    "100kg": x["100kg"],
                    "500kg": x["500kg"],
                    "1000kg": x["1000kg"] 
                }
            }else if(x.RATE == "PHARMA TK PLUS"){
                //obj.RATE = "PHARMA TK PLUS";
                obj.RATE["PHARMA TK PLUS"] = {
                    "MIN": x.MIN,
                    "N": x.N,
                    "45kg": x["45kg"],
                    "100kg": x["100kg"],
                    "500kg": x["500kg"],
                    "1000kg": x["1000kg"] 
                }
            }
        }
        arr.push(obj);
    }

    // for (const x of tariffs){
        
    //     x.RATE = {"GEN, DG OK PAX":{
    //         "MIN": x.MIN,
    //         "N": x.N,
    //         "45kg": x["45kg"],
    //         "100kg": x["100kg"],
    //         "500kg": x["500kg"],
    //         "1000kg": x["1000kg"]
            
    //     }, "TK PLUS, CAO":{}, "Pharma(PIL)":{}, "PHARMA TK PLUS":{}};
    // }

    // console.log(languages);
    let data2 = JSON.stringify(arr, null, 2);

    fs.writeFile('tariffs.json', data2, (err) => {
    if (err) throw err;
    console.log('Data written file');
});

});





console.log('This is after the read call');
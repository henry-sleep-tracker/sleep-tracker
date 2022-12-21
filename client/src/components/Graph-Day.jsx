import { Chart } from "react-google-charts";

const GraphD = () => {
  //let data = prueba.prueba;

  let User =  {
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-20",
            "duration": 25020000,
            "efficiency": 57,
            "endTime": "2022-12-20T12:44:30.000",
            "infoCode": 0,
            "isMainSleep": true,
            "levels": {
                "data": [
                    {
                        "dateTime": "2022-12-20T05:47:30.000",
                        "level": "wake",
                        "seconds": 330
                    },
                    {
                        "dateTime": "2022-12-20T05:53:00.000",
                        "level": "light",
                        "seconds": 390
                    },
                    {
                        "dateTime": "2022-12-20T05:59:30.000",
                        "level": "wake",
                        "seconds": 270
                    },
                    {
                        "dateTime": "2022-12-20T06:04:00.000",
                        "level": "light",
                        "seconds": 660
                    },
                    {
                        "dateTime": "2022-12-20T06:15:00.000",
                        "level": "deep",
                        "seconds": 1620
                    },
                    {
                        "dateTime": "2022-12-20T06:42:00.000",
                        "level": "light",
                        "seconds": 1980
                    },
                    {
                        "dateTime": "2022-12-20T07:15:00.000",
                        "level": "deep",
                        "seconds": 2010
                    },
                    {
                        "dateTime": "2022-12-20T07:48:30.000",
                        "level": "light",
                        "seconds": 780
                    },
                    {
                        "dateTime": "2022-12-20T08:01:30.000",
                        "level": "deep",
                        "seconds": 420
                    },
                    {
                        "dateTime": "2022-12-20T08:08:30.000",
                        "level": "light",
                        "seconds": 1440
                    },
                    {
                        "dateTime": "2022-12-20T08:32:30.000",
                        "level": "wake",
                        "seconds": 390
                    },
                    {
                        "dateTime": "2022-12-20T08:39:00.000",
                        "level": "light",
                        "seconds": 1050
                    },
                    {
                        "dateTime": "2022-12-20T08:56:30.000",
                        "level": "deep",
                        "seconds": 420
                    },
                    {
                        "dateTime": "2022-12-20T09:03:30.000",
                        "level": "light",
                        "seconds": 2070
                    },
                    {
                        "dateTime": "2022-12-20T09:38:00.000",
                        "level": "rem",
                        "seconds": 2760
                    },
                    {
                        "dateTime": "2022-12-20T10:24:00.000",
                        "level": "light",
                        "seconds": 1290
                    },
                    {
                        "dateTime": "2022-12-20T10:45:30.000",
                        "level": "deep",
                        "seconds": 270
                    },
                    {
                        "dateTime": "2022-12-20T10:50:00.000",
                        "level": "light",
                        "seconds": 2310
                    },
                    {
                        "dateTime": "2022-12-20T11:28:30.000",
                        "level": "rem",
                        "seconds": 930
                    },
                    {
                        "dateTime": "2022-12-20T11:44:00.000",
                        "level": "wake",
                        "seconds": 210
                    },
                    {
                        "dateTime": "2022-12-20T11:47:30.000",
                        "level": "rem",
                        "seconds": 2310
                    },
                    {
                        "dateTime": "2022-12-20T12:26:00.000",
                        "level": "light",
                        "seconds": 1080
                    },
                    {
                        "dateTime": "2022-12-20T12:44:00.000",
                        "level": "deep",
                        "seconds": 30
                    }
                ],
                "shortData": [
                    {
                        "dateTime": "2022-12-20T06:48:00.000",
                        "level": "wake",
                        "seconds": 120
                    },
                    {
                        "dateTime": "2022-12-20T07:45:30.000",
                        "level": "wake",
                        "seconds": 180
                    },
                    {
                        "dateTime": "2022-12-20T07:55:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T08:10:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T08:44:30.000",
                        "level": "wake",
                        "seconds": 90
                    },
                    {
                        "dateTime": "2022-12-20T09:35:00.000",
                        "level": "wake",
                        "seconds": 180
                    },
                    {
                        "dateTime": "2022-12-20T09:39:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T09:43:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T10:01:30.000",
                        "level": "wake",
                        "seconds": 60
                    },
                    {
                        "dateTime": "2022-12-20T10:10:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T10:19:00.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T10:27:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T10:55:00.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T10:59:00.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T11:07:00.000",
                        "level": "wake",
                        "seconds": 60
                    },
                    {
                        "dateTime": "2022-12-20T11:10:30.000",
                        "level": "wake",
                        "seconds": 150
                    },
                    {
                        "dateTime": "2022-12-20T11:14:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T11:17:00.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T11:34:30.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T11:39:00.000",
                        "level": "wake",
                        "seconds": 30
                    },
                    {
                        "dateTime": "2022-12-20T11:56:00.000",
                        "level": "wake",
                        "seconds": 30
                    }
                ],
                "summary": {
                    "deep": {
                        "count": 6,
                        "minutes": 76,
                        "thirtyDayAvgMinutes": 0
                    },
                    "light": {
                        "count": 21,
                        "minutes": 204,
                        "thirtyDayAvgMinutes": 0
                    },
                    "rem": {
                        "count": 11,
                        "minutes": 96,
                        "thirtyDayAvgMinutes": 0
                    },
                    "wake": {
                        "count": 25,
                        "minutes": 41,
                        "thirtyDayAvgMinutes": 0
                    }
                }
            },
            "logId": 39500879068,
            "logType": "auto_detected",
            "minutesAfterWakeup": 0,
            "minutesAsleep": 376,
            "minutesAwake": 41,
            "minutesToFallAsleep": 0,
            "startTime": "2022-12-20T05:47:30.000",
            "timeInBed": 417,
            "type": "stages"
        }
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 376,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
}


let sueño = User.sleep[0].levels.data;



let sw = [['Horario de sueño', 'Tipo de descanso']]

for (let i = 0; i < sueño.length; i++) {

    if (sueño[i].level === 'rem') {
        sueño[i].level = 3
    }
    if (sueño[i].level === 'deep') {
        sueño[i].level = 2
    }
    if (sueño[i].level === 'light') {
        sueño[i].level = 1
    }
    if(sueño[i].level === 'wake') {
        sueño[i].level = 0
    }
   
         sw.push([sueño[i].dateTime.slice(11, -4), sueño[i].level])
          //  ,  +sueño[i].seconds/60
}
const options = {
    title: `My Dream ${User.sleep[0].dateOfSleep}`
  };



  return (
    <div>
      <Chart chartType='Bar' data={sw}  options ={options} width='100%'   />
    </div>
  );
};

export default GraphD;

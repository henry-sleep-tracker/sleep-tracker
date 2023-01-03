export const User =  [{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-14",
            "duration": 25020000,
            "efficiency": 57,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 476,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-15",
            "duration": 25020000,
            "efficiency": 75,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 306,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-16",
            "duration": 25020000,
            "efficiency": 97,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 476,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-17",
            "duration": 25020000,
            "efficiency": 87,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 496,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-18",
            "duration": 25020000,
            "efficiency": 100,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 476,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-19",
            "duration": 25020000,
            "efficiency": 75,}
            
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
    
},
{
    
    "sleep": [
        {
            "dateOfSleep": "2022-12-20",
            "duration": 25020000,
            "efficiency": 57,}
            
    ],
    "summary": {
        "stages": {
            "deep": 76,
            "light": 204,
            "rem": 96,
            "wake": 41
        },
        "totalMinutesAsleep": 596,
        "totalSleepRecords": 1,
        "totalTimeInBed": 417
    }
    
},
]


export let UserC = {
    name: "Juan",
    sueño: [1, 3, 2, 4, 5, 1, 3, 2, 1, 5, 3, 4],
    consumo: {
      cafeina: "",
      alcohol: "2 cervezas, 3 mojitos",
      comida: "19:45",
      ejercicio: { tiempo:"30 min",
      tipo: 'caminata'}
    },
  };
  
  export let consumed = UserC.consumo;
  const dream = UserC.sueño;

  export let prueba = [["horas de sueño", "profundidad de sueño"]];
  for (let i = 0; i < dream.length; i++) {
    prueba.push([i + 1, dream[i]]);
  }
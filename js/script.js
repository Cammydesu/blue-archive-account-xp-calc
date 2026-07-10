const XPNeeded = [
    8,10,15,21,28,36,45,55,66,79,93,108,124,141,159,178,198,219,241,265,288,312,337,363,390,
    418,447,477,508,581,656,734,814,897,982,1069,1159,1251,1346,1443,1543,1645,1750,1857,1966,
    2078,2192,2309,2428,2550,2674,2800,2929,3060,3194,3330,3469,3610,3754,3900,4048,4199,4352,
    4508,4666,4831,5007,5186,5369,5556,5747,5942,6141,6344,6552,6768,6989,7216,7449,7682,7915,
    8148,8381,8883,9460,10614,12922,17538,26770
];

const APCap = [
    24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,102,104,106,108,110,112,114,
    116,118,120,122,124,126,128,130,132,134,136,138,140,142,144,146,148,150,152,154,156,158,
    160,162,164,166,168,170,172,174,176,178,180,182,184,186,188,190,192,194,196,198,200,202,
    204,206,210,212,214,216,218,220,222,224,226,228,230,232,234,236,238,240
];

const PyroxeneSpent = [0,30,60,90,150,210,270,360,450,540,690,840,990,1170,1350,1530,1740,1950,2160,2460,2760];
const TacticalChallengeCoinsSpent = [0,45,110,165,210];

function APForLevelUp(CurrentLevel, TargetLevel){
    let TotalAPReceived = 0;
    for(let i = CurrentLevel; i < TargetLevel - 2; ++i){
        TotalAPReceived += APCap[i];
    }
    return TotalAPReceived;
}

function YearMonthDay(Days){
    if(Days < 30) return "";
    let Years = Math.floor(Days / 365);
    let RemainingDays = Days % 365;
    let Months = Math.floor(RemainingDays / 30);
    RemainingDays %= 30;

    let segments = [];
    if(Years > 0) segments.push(`${Years} ${Years === 1 ? 'year' : 'years'}`);
    if(Months > 0) segments.push(`${Months} ${Months === 1 ? 'month' : 'months'}`);
    if(RemainingDays > 0) segments.push(`${RemainingDays} ${RemainingDays === 1 ? 'day' : 'days'}`);
    return `(~${segments.join(', ')})`;
}

function APFromCafeHourly(CafeLevel){
    const APPerHour = [3.82, 6.44, 9.27, 12.31, 15.56, 19.02, 22.25, 25.1, 27.95, 30.8];
    return APPerHour[CafeLevel - 1] || 0;
}

function LevelingSim(Currentlevel, TargetLevel, CurrentXP, CalculateDailyAP){
    let days = 0;
    let simXP = CurrentXP;
    let simlevel = Currentlevel;
    while(simlevel < TargetLevel){
        days++;
        let multiplier = 1.0;
        if(simlevel <= 59) multiplier = 2.0;
        else if(simlevel >= 60 && simlevel < 70) multiplier = 1.5;
        let DailyXP = CalculateDailyAP * multiplier;
        simXP += DailyXP;
        while(simXP >= XPNeeded[simlevel - 1]){
            simXP -= XPNeeded[simlevel - 1];
            simlevel++;
            if(simlevel <= 59) multiplier = 2.0;
            else if(simlevel >= 60 && simlevel < 70) multiplier = 1.5;
            let XPFromLevelUp = APCap[simlevel - 1] * multiplier;
            simXP += XPFromLevelUp;
        }
    }
    return days || 0;
}

function Calculate(){
    let SimCurrentLevel = parseInt(document.getElementById("CurrentLevel").value);
    let SimCurrentXPInLevel = parseInt(document.getElementById("CurrentXPInLevel").value);
    let SimTargetLevel = parseInt(document.getElementById("TargetLevel").value);
    let SimTacticalChallengeRefreshes = parseInt(document.getElementById("TacticalChallengeRefreshes").value);
    let SimAPRefreshes = parseInt(document.getElementById("APRefreshes").value);
    let SimCafeLevel = parseInt(document.getElementById("CafeLevel").value);

    if(SimCurrentLevel === 90){alert("You're already max level!"); return;}
    if(SimCurrentLevel > SimTargetLevel){alert("You're current level is higher than your target level."); return;}
    if(isNaN(SimCurrentLevel) || SimCurrentLevel < 1 || SimCurrentLevel > 89){alert("Invalid level selection."); return;}
    if(isNaN(SimCurrentXPInLevel) || SimCurrentXPInLevel < 0 || SimCurrentXPInLevel >= XPNeeded[SimCurrentLevel - 1]){alert("Invalid XP amount."); return;}
    if(isNaN(SimTargetLevel) || SimTargetLevel > 90){alert("Invalid target level."); return;}
    if(isNaN(SimTacticalChallengeRefreshes) || SimTacticalChallengeRefreshes < 0 || SimTacticalChallengeRefreshes > 4){alert("Invalid Tactical Challenge refresh amount."); return;}
    if(isNaN(SimAPRefreshes) || SimAPRefreshes > 20 || SimAPRefreshes < 0){alert("Invalid pyroxene refresh amount."); return;}
    if(isNaN(SimCafeLevel) || SimCafeLevel < 1 || SimCafeLevel > 10){alert("Invalid cafe level."); return;}

    const dailyAP = 150;
    const weeklyAP = 350;
    const naturalDailyAP = 240;
    const clubAP = 10;
    const dailyShopAP = 10;

    let totalXPNeeded = 0;
    let totalAPNeeded = 0;

    let TCCoinsSpent = TacticalChallengeCoinsSpent[SimTacticalChallengeRefreshes];
    let PyroSpent = PyroxeneSpent[SimAPRefreshes];

    for(let i = SimCurrentLevel - 1; i < SimTargetLevel - 1; ++i){
        let currentMultiplier = 1;
        if(i < 59) currentMultiplier = 2;
        else if(i >= 59 && i < 69) currentMultiplier = 1.5;
        totalXPNeeded += XPNeeded[i];
        totalAPNeeded += XPNeeded[i] / currentMultiplier;
    }
    let APMult = 1;
    if(SimCurrentLevel < 59) APMult = 2.0;
    if(SimCurrentLevel >= 59 && SimCurrentLevel < 69) APMult = 1.5;
    totalXPNeeded -= SimCurrentXPInLevel;
    totalAPNeeded -= (SimCurrentXPInLevel / APMult);
    let LevelUpAP = APForLevelUp(SimCurrentLevel, SimTargetLevel);
    let CafeAP = Math.floor(APFromCafeHourly(SimCafeLevel) * 24);
    let RefreshAP = SimAPRefreshes * 120;
    let TacticalChallengeAP = SimTacticalChallengeRefreshes * 90;
    let TotalDailyAP = CafeAP + RefreshAP + TacticalChallengeAP + dailyAP + naturalDailyAP + clubAP + dailyShopAP;
    let CalcTotalDailyAP = TotalDailyAP + weeklyAP / 7;
    let TotalWeeklyAP = TotalDailyAP * 7 + weeklyAP;
    
    let days = LevelingSim(SimCurrentLevel, SimTargetLevel, SimCurrentXPInLevel, CalcTotalDailyAP);
    let TotalPyroSpent = PyroSpent * days;
    let pulls = ((TotalPyroSpent) / 120).toFixed(0);
    let YMD = YearMonthDay(days);

    document.getElementById("ResultTime").innerText = `${days} days ${YMD}`;
    document.getElementById("ResultTotals").innerText = `${totalXPNeeded.toLocaleString()} XP / ${Math.round(totalAPNeeded).toLocaleString()} AP (With level up AP: ${Math.round(totalAPNeeded - LevelUpAP).toLocaleString()} AP)`;
    document.getElementById("ResultAPRates").innerText = `Daily: ${TotalDailyAP} AP | Weekly: ${TotalWeeklyAP} AP`;
    document.getElementById("ResultDailyCost").innerText = `💎 ${PyroSpent} / 🔵 ${TCCoinsSpent} Coins`;
    document.getElementById("ResultTotalPyroxenes").innerText = `${TotalPyroSpent.toLocaleString()} Pyroxenes (${pulls} ${pulls === 1 ? 'pull' : 'pulls'})`;
    document.getElementById("ResultTotalCoins").innerText = `${(TCCoinsSpent * days).toLocaleString()} Coins`
    document.getElementById("output-panel").classList.add("show");
}


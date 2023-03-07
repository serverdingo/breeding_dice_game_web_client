/**
* Four distinct steps:
*
*    1. Calculate mods       -       return mods
*    2. Impregnation Check   -       return yes or no to whether they preggo
*    3. Ovulation Check      -       return back egg count
*    4. Babby making         -       return back babies made, twin/triplet/etc stats, impreg chance
*
* All the steps need the breeder's and bred's variables...
*
*
*     bred_dice.diceRoll1 etc
*

id="bred_inHeat"
id="bred_desireForImpreg"
id="bred_arousedBeforeSex"
id="bred_lowFertility"
id="bred_differentSpecies"

*     bred_checked: [],
*     bred_fertilityBonusValue: '0',
*     bred_fertilityAidsValue: '0',
*     bred_ovulationDrugsValue: '0',
*     bred_previousImpregnationsValue: '0',
*     bred_numberOrgasmsValue: '0',
*     bred_positionSelected: 'other',
*     bred_positionOptions: [
*       { text: 'Doggy Style', value: 'doggyStyle' },
*       { text: 'Mating Press', value: 'matingPress' },
*       { text: 'Other', value: 'other' },
*     ],
*     bred_penetrationDepthSelected: 'normal',
*     bred_penetrationDepthOptions: [
*       { text: 'Normal', value: 'normal' },
*       { text: 'Flooded Overies', value: 'floodedOvaries' },
*       { text: 'Cervical Penetration', value: 'cervicalPen' },
*     ],
*     bred_wetnessSelected: 'none',             <-- No effect on breeder mod
*     bred_wetnessOptions: [
*       { text: 'None/Lube Needed', value: 'none' },
*       { text: 'Dripping', value: 'dripping' },
*       { text: 'Constant Stream', value: 'constantStream' },
*     ],
*
*     breeder_dice.diceRoll1 etc
*

id="breeder_hasKnot"
id="breeder_hasBarbs"
id="breeder_inRut"
id="breeder_cameMoreThanOnce"
id="breeder_extraFluids"
id="breeder_extendedPenetration"
id="breeder_lowSpermCount"

*     breeder_checked: [],
*     breeder_virilityBonusValue: '0',
*     breeder_virilityAidsValue: '0',
*     breeder_numberOrgasmsValue: '0',              <-- No effect on breeder mod
*     breeder_defeatedContraceptivesValue: '0',     <-- No effect on breeder mod
*     breeder_undefeatedContraceptivesValue: '0',   <-- No effect on breeder mod
*     breeder_cumflationSelected: 'none',           <-- No effect on breeder mod
*     breeder_cumflationOptions: [                  <-- No effect on breeder mod
*       { text: 'None', value: 'none' },
*       { text: 'Paunch', value: 'paunch' },
*       { text: 'Pregnant-like', value: 'pregnantLike' },
*       { text: 'Overflowing', value: 'overflowing' },
*     ]
*/

// TODO: Something smart would be to put the variables in a massive dict,
//       and store the value's mod effect in there

const Roll = require('roll');

function calculateMods(playerOptions) {
  if (playerOptions === 'test') {
    return 'test';
  }

  const dice = new Roll();

  let bredMod = 0;
  let breederMod = 0;

  if (playerOptions.bred_checked.includes('bred_inHeat')) {
    if (playerOptions.breeder_checked.includes('breeder_inRut')) {
      bredMod -= dice.roll('2d2').result;
      breederMod += dice.roll('2d2').result;
    } else {
      bredMod -= 2;
    }
  } else if (playerOptions.breeder_checked.includes('breeder_inRut')) {
    breederMod += 2;
  }

  if (playerOptions.bred_penetrationDepthSelected === 'cervicalPen') {
    bredMod -= 1;
    breederMod += 1;
  } else if (playerOptions.bred_penetrationDepthSelected === 'floodedOvaries') {
    bredMod -= 2;
    breederMod += 1;
  }

  // Doing bred mods

  bredMod -= parseInt(playerOptions.bred_fertilityBonusValue, 10);

  for (let i = 0; i < parseInt(playerOptions.bred_fertilityAidsValue, 10); i += 1) {
    bredMod -= dice.roll('1d4').result;
  }

  bredMod -= parseInt(playerOptions.bred_previousImpregnationsValue, 10);
  bredMod -= parseInt(playerOptions.bred_numberOrgasmsValue, 10);

  if (playerOptions.bred_positionSelected === 'doggyStyle') {
    bredMod -= 1;
  } else if (playerOptions.bred_positionSelected === 'matingPress') {
    bredMod -= 2;
  }

  if (playerOptions.bred_checked.includes('bred_desireForImpreg')) {
    bredMod -= 1;
  }

  if (playerOptions.bred_checked.includes('bred_arousedBeforeSex')) {
    bredMod -= 1;
  }

  if (playerOptions.bred_checked.includes('bred_differentSpecies')) {
    bredMod += 1;
  }

  if (playerOptions.bred_checked.includes('bred_lowFertility')) {
    bredMod += 2;
  }

  // Breeder mods

  if (playerOptions.breeder_checked.includes('breeder_hasKnot')) {
    breederMod += 1;
  }

  if (playerOptions.breeder_checked.includes('breeder_hasBarbs')) {
    breederMod += 1;
  }

  if (playerOptions.breeder_checked.includes('breeder_extendedPenetration')) {
    breederMod += 1;
  }

  if (playerOptions.breeder_checked.includes('breeder_cameMoreThanOnce')) {
    breederMod += 1;
  }

  if (playerOptions.breeder_checked.includes('breeder_extraFluids')) {
    breederMod += 1;
  }

  breederMod += parseInt(playerOptions.breeder_virilityBonusValue, 10);

  for (let i = 0; i < parseInt(playerOptions.breeder_virilityAidsValue, 10); i += 1) {
    breederMod += dice.roll('1d4').result;
  }

  if (playerOptions.breeder_checked.includes('breeder_lowSpermCount')) {
    breederMod -= 1;
  }
  console.log(bredMod);
  return {
    bred_mod: bredMod,
    breeder_mod: breederMod,
  };
}

function addEggs(amount, playerOptions, currentEggCount, diceRoller) {
  const lowFertMod = playerOptions.bred_checked.includes('bred_lowFertility') ? -1 : 0;
  const heatMod = parseInt(playerOptions.bred_checked.includes('bred_inHeat'), 10);

  let addedEggs = (typeof amount === 'string') ? diceRoller.roll(amount).result : amount;

  // TODO: change heat mod to also have the roll addition, instead of
  //       hard coding 2d3. That way can boost w/ traits
  addedEggs = heatMod ? (addedEggs + diceRoller.roll('2d3').result) : addedEggs;
  addedEggs += parseInt(lowFertMod, 10);
  return currentEggCount + addedEggs;
}

// TODO: set all these hard-coded values to be capable of
//       being modified by traits
function getNumEggs(playerOptions, playerRolls) {
  // let eggLog = '';
  let eggCount = 0;

  const dice = new Roll();

  // Initial 1d3 eggs
  eggCount = addEggs('1d3', playerOptions, eggCount, dice);

  const matchups = Object.keys(playerRolls);

  let bredCritFails = 0;
  let bredDoubleCritFails = 0;
  let breederCrits = 0;
  let breederDoubleCrits = 0;

  for (let i = 0; i < matchups.length; i += 1) {
    // Tally up crits for bred/breeder. Double crits count as both
    if (playerRolls[matchups[i]].bredCrit === 'double') {
      bredCritFails += 1;
      bredDoubleCritFails += 1;
    } else if (playerRolls[matchups[i]].bredCrit === 'single') {
      bredCritFails += 1;
    }

    if (playerRolls[matchups[i]].breederCrit === 'double') {
      breederCrits += 1;
      breederDoubleCrits += 1;
    } else if (playerRolls[matchups[i]].breederCrit === 'single') {
      breederCrits += 1;
    }
  }

  for (let i = 0; i < bredCritFails; i += 1) {
    // Add 1d3 eggs per bred crit fail
    eggCount = addEggs('1d3', playerOptions, eggCount, dice);
  }

  // Add 1d3 eggs for breeder's barbed cock
  eggCount = playerOptions.breeder_checked.includes('breeder_hasBarbs')
    ? addEggs('1d3', playerOptions, eggCount, dice) : eggCount;

  // Add ovuDrugsValue-d2 eggs
  const ovuDrugsValue = parseInt(playerOptions.bred_ovulationDrugsValue, 10);
  eggCount = ovuDrugsValue > 0
    ? addEggs(`${ovuDrugsValue}d2`, playerOptions, eggCount, dice)
    : eggCount;

  // Add 1d-bredOrgasms eggs
  const bredOrgasms = parseInt(playerOptions.bred_numberOrgasmsValue, 10);
  eggCount = bredOrgasms > 0
    ? addEggs(`1d${bredOrgasms}`, playerOptions, eggCount, dice)
    : eggCount;

  // Add 10d3 eggs if 5 or more bred crit fail and 5 or more breeder crit
  if (((bredCritFails + bredDoubleCritFails) >= 5)
      && ((breederCrits + breederDoubleCrits) >= 5)) {
    eggCount = addEggs('10d3', playerOptions, eggCount, dice);
  }

  if (bredDoubleCritFails < 5) {
    // Add 1d4 egg for every double crit fail if there's less than 5
    for (let i = 0; i < bredDoubleCritFails; i += 1) {
      eggCount = addEggs('1d4', playerOptions, eggCount, dice);
    }
  } else {
    // Bred double crit failed 5 (or more??) times. +4d4 and... double the eggs.
    // DOUBLE THEM, DAMN YOU! DID I STUTTER?!

    eggCount = addEggs('4d4', playerOptions, eggCount, dice);
    eggCount *= 2;
  }

  return eggCount;
}

function fertEgg(diceRoller, fertMod, babiesToAdd) {
  const naturalRoll = diceRoller.roll('1d100').result;
  let babiesToAddCopy = babiesToAdd;
  if (naturalRoll + fertMod >= 0) {
    // If we get a positive value for roll + fertMod, thassa babby!
    babiesToAddCopy.push({
      gender: diceRoller.roll('1d3').result,
      species: diceRoller.roll('1d3').result,
      natRoll: naturalRoll,
    });
  }

  if ((naturalRoll >= 90) && (naturalRoll < 100)) {
    // Natural roll of 90+ - chance for extra baby!

    babiesToAddCopy = fertEgg(diceRoller, fertMod, babiesToAddCopy);
  } else if (naturalRoll > 100) {
    // Naturall roll of 100 - extra baby guaranteed, and try for another!
    babiesToAddCopy.push({
      gender: diceRoller.roll('1d3').result,
      species: diceRoller.roll('1d3').result,
      natRoll: naturalRoll,
    });
    babiesToAddCopy = fertEgg(diceRoller, fertMod, babiesToAddCopy);
  }
  return babiesToAddCopy;
}

function getBabies(playerOptions, playerRolls, eggs) {
  // Base fert mod is -90, leaving 10% fert chance
  let fertMod = -90;

  const prevImpreg = parseInt(playerOptions.bred_previousImpregnationsValue, 10);

  // I think this may be wrong... my old code references prevImpreg
  // but I wrote "roll win beyond second for the stud" in the logs.
  if (prevImpreg >= 3) {
    fertMod += (prevImpreg - 2) * 3;
  } else {
    fertMod -= (3 - prevImpreg) * 3;
  }

  // +10 for knot
  fertMod = playerOptions.breeder_checked.includes('breeder_hasKnot')
    ? (fertMod + 10) : fertMod;

  // +10 for barbs
  fertMod = playerOptions.breeder_checked.includes('breeder_hasBarbs')
    ? (fertMod + 10) : fertMod;

  // +10 for flooded ovaries or cervical pen
  const penDepth = playerOptions.bred_penetrationDepthSelected;
  fertMod = (penDepth !== 'normal') ? (fertMod + 10) : fertMod;

  // +10 for every bred/breeder orgasm beyond first
  const bredOrgasms = parseInt(playerOptions.bred_numberOrgasmsValue, 10);
  const breederOrgasms = parseInt(playerOptions.breeder_numberOrgasmsValue, 10);

  fertMod = (bredOrgasms > 1) ? (fertMod + (10 * (bredOrgasms - 1)))
    : fertMod;
  fertMod = (breederOrgasms > 1) ? (fertMod + (10 * (breederOrgasms - 1)))
    : fertMod;

  // +5/10/15 for paunch/preg/overflow cumflation respectively
  const cumflation = playerOptions.breeder_cumflationSelected;
  if (cumflation !== 'none') {
    if (cumflation === 'paunch') {
      fertMod += 5;
    } else {
      fertMod = (cumflation === 'pregnantLike') ? (fertMod + 10)
        : (fertMod + 15);
    }
  }

  // +5/10 for dripping/constant stream wetness respectively
  const wetness = playerOptions.bred_wetnessSelected;
  if (wetness !== 'none') {
    fertMod = (wetness === 'dripping') ? (fertMod + 5)
      : (fertMod + 10);
  }

  // -10 if different species, +10 if same
  fertMod = playerOptions.bred_checked.includes('bred_differentSpecies')
    ? (fertMod - 10) : (fertMod + 10);

  // -10 for every undefeated contraceptive
  const undefContra = parseInt(playerOptions.breeder_undefeatedContraceptivesValue, 10);
  fertMod = undefContra > 0 ? (fertMod - (10 * undefContra)) : fertMod;

  // -1 for every defeated contraceptive
  const defContra = parseInt(playerOptions.breeder_defeatedContraceptivesValue, 10);
  fertMod = defContra > 0 ? (fertMod - (1 * defContra)) : fertMod;

  // +10 for every extra fert level
  const extraFert = parseInt(playerOptions.bred_fertilityBonusValue, 10);
  fertMod = (extraFert > 0) ? (fertMod + (10 * extraFert)) : fertMod;

  // -10 for low fert
  fertMod = playerOptions.bred_checked.includes('bred_lowFertility')
    ? (fertMod - 10) : fertMod;

  const babies = [];
  const dice = new Roll();

  const eggsCopy = eggs;
  eggsCopy.eggList = {};
  // ok... it's time for the big chungus loop
  for (let i = 0; i < eggs.count; i += 1) {
    let babiesToAdd = [];
    let numBabiesAdded = 0;

    babiesToAdd = fertEgg(dice, fertMod, babiesToAdd);

    numBabiesAdded = babiesToAdd.length;
    eggsCopy.eggList[`babiesFromEgg${i}`] = numBabiesAdded;

    babies.push(...babiesToAdd);
  }

  return { updatedEggs: eggsCopy, babiesList: babies };
}

export {
  calculateMods, getNumEggs, getBabies, Roll,
};

/**
* Four distinct steps:
*
*    1. Calculate mods       -       return mods
*    2. Impregnation Check   -       return yes or no to whether they preggo
*    3. Ovulation Check      -       return back egg count
*    4. Babby making         -       return back babies made, twin/triplet/etc stats, impreg chance
*
*/

// TODO: Something smart would be to put the variables in a massive dict,
//       and store the value's mod effect in there

const Roll = require('roll');

function calculateMods(playerOptions) {
  const dice = new Roll();

  let bredMod = 0;
  let breederMod = 0;

  const bredOptions = playerOptions.bred;
  const breederOptions = playerOptions.breeder;

  const bredTraits = playerOptions.selectedTraits.bred;
  const breederTraits = playerOptions.selectedTraits.breeder;

  if (bredOptions.checkboxes.checked.includes('inHeat')) {
    if (breederOptions.checkboxes.checked.includes('inRut')) {
      bredMod -= dice.roll('2d2').result;
      breederMod += dice.roll('2d2').result;
    } else {
      bredMod -= 2;
    }
  } else if (breederOptions.checkboxes.checked.includes('inRut')) {
    breederMod += 2;
  }

  if (bredOptions.radioGroups.penetrationDepth.selected === 'cervicalPen') {
    bredMod -= bredTraits.includes('overactiveOvaries') ? 2 : 1;
    bredMod -= bredTraits.includes('tightCervix') ? 1 : 0;
    breederMod += breederTraits.includes('deeepInsemination') ? 2 : 1;
  } else if (bredOptions.radioGroups.penetrationDepth.selected === 'floodedOvaries') {
    bredMod -= bredTraits.includes('overactiveOvaries') ? 3 : 2;
    breederMod += 1;
  }

  // Doing bred mods

  bredMod -= parseInt(bredOptions.ranges.fertilityBonus.value, 10);

  for (let i = 0; i < parseInt(bredOptions.ranges.fertilityAids.value, 10); i += 1) {
    bredMod -= dice.roll('1d4').result;
  }

  bredMod -= parseInt(bredOptions.ranges.previousImpregnations.value, 10);
  bredMod -= parseInt(bredOptions.ranges.numberOrgasms.value, 10);

  if (bredOptions.radioGroups.sexPosition.selected === 'doggyStyle') {
    bredMod -= 1;
  } else if (bredOptions.radioGroups.sexPosition.selected === 'matingPress') {
    bredMod -= 2;
  }

  if (bredOptions.checkboxes.checked.includes('desireForImpreg')) {
    bredMod -= 1;
  }

  if (bredOptions.checkboxes.checked.includes('arousedBeforeSex')) {
    bredMod -= 1;
  }

  if (bredOptions.checkboxes.checked.includes('differentSpecies')
      && !(bredTraits.includes('corruptedWomb'))) {
    bredMod += 1;
  }

  if (bredOptions.checkboxes.checked.includes('lowFertility')) {
    bredMod += 2;
  }

  // Breeder mods

  if (breederOptions.checkboxes.checked.includes('hasKnot')) {
    breederMod += 1;
  }

  if (breederOptions.checkboxes.checked.includes('hasBarbs')) {
    breederMod += 1;
  }

  if (breederOptions.checkboxes.checked.includes('extendedPenetration')) {
    breederMod += 1;
  }

  if (breederOptions.checkboxes.checked.includes('cameMoreThanOnce')) {
    breederMod += 1;
  }

  if (breederOptions.checkboxes.checked.includes('extraFluids')) {
    breederMod += 1;
  }

  const virilityMod = breederTraits.includes('potentVirility') ? 2 : 1;
  breederMod += parseInt(breederOptions.ranges.virilityBonus.value, 10) * virilityMod;

  for (let i = 0; i < parseInt(breederOptions.ranges.virilityAids.value, 10); i += 1) {
    breederMod += dice.roll('1d4').result;
  }

  if (breederOptions.checkboxes.checked.includes('lowSpermCount')) {
    breederMod -= 1;
  }

  // Traits

  if (bredTraits.includes('cluelessBreeder')) {
    breederMod += 1;
    bredMod -= 1;
  }

  if (bredTraits.includes('corruptedOvaries')) {
    breederMod += 2;
  }

  return {
    bred_mod: bredMod,
    breeder_mod: breederMod,
  };
}

function addEggs(amount, playerOptions, currentEggCount, diceRoller) {
  const bredOptions = playerOptions.bred;
  // const breederOptions = playerOptions.breeder;

  const lowFertMod = bredOptions.checkboxes.checked.includes('lowFertility') ? -1 : 0;
  const heatMod = parseInt(bredOptions.checkboxes.checked.includes('inHeat'), 10);

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

  const bredOptions = playerOptions.bred;
  const breederOptions = playerOptions.breeder;

  const bredTraits = playerOptions.selectedTraits.bred;
  const breederTraits = playerOptions.selectedTraits.breeder;

  const dice = new Roll();

  const matchups = Object.keys(playerRolls);

  let bredCritFails = 0;
  let bredDoubleCritFails = 0;
  let breederCrits = 0;
  let breederDoubleCrits = 0;

  // All d3 become d6 with overactiveOvaries bred trait
  const defaultDice = bredTraits.includes('overactiveOvaries') ? 6 : 3;

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

    // if domineeringSeed is active, add 1d3 eggs per nat 10 for breeder
    if (breederTraits.includes('domineeringSeed')
        && playerRolls[matchups[i]].breederValue >= 10) {
      eggCount += addEggs(`1d${defaultDice}`, playerOptions, eggCount, dice);
    }
  }

  // Add initial eggs, 1d3 by default
  const initialEggs = bredTraits.includes('corruptedOvaries')
    ? `1d${breederCrits + defaultDice}` : `1d${defaultDice}`;
  eggCount += addEggs(initialEggs, playerOptions, eggCount, dice);

  for (let i = 0; i < bredCritFails; i += 1) {
    // Add 1d3 eggs per bred crit fail, 2d3 if natBornMilf trait
    eggCount = bredTraits.includes('natBornMilf')
      ? addEggs(`2d${defaultDice}`, playerOptions, eggCount, dice)
      : addEggs(`1d${defaultDice}`, playerOptions, eggCount, dice);
  }

  // Add 1d3 eggs for breeder's barbed cock
  eggCount = breederOptions.checkboxes.checked.includes('hasBarbs')
    ? addEggs(`1d${defaultDice}`, playerOptions, eggCount, dice) : eggCount;

  // Add ovuDrugsValue-d2 eggs
  const ovuDrugsValue = parseInt(bredOptions.ranges.ovulationDrugs.value, 10);
  eggCount = ovuDrugsValue > 0
    ? addEggs(`${ovuDrugsValue}d2`, playerOptions, eggCount, dice)
    : eggCount;

  // Add 1d-bredOrgasms eggs
  const bredOrgasms = parseInt(bredOptions.ranges.numberOrgasms.value, 10);
  eggCount = bredOrgasms > 0
    ? addEggs(`1d${bredOrgasms}`, playerOptions, eggCount, dice)
    : eggCount;

  // Add 10d3 eggs if 5 or more bred crit fail and 5 or more breeder crit
  if (((bredCritFails + bredDoubleCritFails) >= 5)
      && ((breederCrits + breederDoubleCrits) >= 5)) {
    eggCount = addEggs(`10d${defaultDice}`, playerOptions, eggCount, dice);
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

function fertEgg(diceRoller, fertMod, babiesToAdd, traits) {
  let naturalRoll = diceRoller.roll('1d100').result;
  // +2 to fertilization roll if tightCervix bred trait
  naturalRoll = traits.bred.includes('tightCervix')
    ? Math.min((naturalRoll + 2), 100) : naturalRoll;

  const guaranteedMultipleCheck = traits.breeder.includes('potentVirility')
    ? 90 : 100;
  const multipleCheck = traits.breeder.includes('potentVirility')
    ? 80 : 90;

  let babiesToAddCopy = babiesToAdd;
  if (naturalRoll + fertMod >= 0) {
    // If we get a positive value for roll + fertMod, thassa babby!
    babiesToAddCopy.push({
      gender: diceRoller.roll('1d3').result,
      species: diceRoller.roll('1d3').result,
      natRoll: naturalRoll,
    });
  }

  if ((naturalRoll >= multipleCheck) && (naturalRoll < guaranteedMultipleCheck)) {
    // Natural roll of multipleCheck+ - chance for extra baby!

    babiesToAddCopy = fertEgg(diceRoller, fertMod, babiesToAddCopy, traits);
  } else if (naturalRoll >= guaranteedMultipleCheck) {
    // Naturall roll of guaranteedMultipleCheck - extra baby guaranteed, and try for another!
    babiesToAddCopy.push({
      gender: diceRoller.roll('1d3').result,
      species: diceRoller.roll('1d3').result,
      natRoll: naturalRoll,
    });
    babiesToAddCopy = fertEgg(diceRoller, fertMod, babiesToAddCopy, traits);
  }
  return babiesToAddCopy;
}

function getBabies(playerOptions, playerRolls, eggs) {
  // Base fert mod is -90, leaving 10% fert chance
  let fertMod = -90;

  const bredOptions = playerOptions.bred;
  const breederOptions = playerOptions.breeder;

  const bredTraits = playerOptions.selectedTraits.bred;

  const prevImpreg = parseInt(bredOptions.ranges.previousImpregnations.value, 10);

  // I think this may be wrong... my old code references prevImpreg
  // but I wrote "roll win beyond second for the stud" in the logs.
  if (prevImpreg >= 3) {
    fertMod += (prevImpreg - 2) * 3;
  } else {
    fertMod -= (3 - prevImpreg) * 3;
  }

  // +10 for knot
  fertMod = breederOptions.checkboxes.checked.includes('hasKnot')
    ? (fertMod + 10) : fertMod;

  // +10 for barbs
  fertMod = breederOptions.checkboxes.checked.includes('hasBarbs')
    ? (fertMod + 10) : fertMod;

  // +10 for flooded ovaries or cervical pen
  const penDepth = bredOptions.radioGroups.penetrationDepth.selected;
  fertMod = (penDepth !== 'normal') ? (fertMod + 10) : fertMod;

  // +10 for every bred/breeder orgasm beyond first
  const bredOrgasms = parseInt(bredOptions.ranges.numberOrgasms.value, 10);
  const breederOrgasms = parseInt(breederOptions.ranges.numberOrgasms.value, 10);

  fertMod = (bredOrgasms > 1) ? (fertMod + (10 * (bredOrgasms - 1)))
    : fertMod;
  fertMod = (breederOrgasms > 1) ? (fertMod + (10 * (breederOrgasms - 1)))
    : fertMod;

  // +5/10/15 for paunch/preg/overflow cumflation respectively
  const cumflation = breederOptions.radioGroups.cumflation.selected;
  if (cumflation !== 'none') {
    if (cumflation === 'paunch') {
      fertMod += 5;
    } else {
      fertMod = (cumflation === 'pregnantLike') ? (fertMod + 10)
        : (fertMod + 15);
    }
  }

  // +5/10 for dripping/constant stream wetness respectively
  const wetness = bredOptions.radioGroups.wetness.selected;
  if (wetness !== 'none') {
    fertMod = (wetness === 'dripping') ? (fertMod + 5)
      : (fertMod + 10);
  }

  // -10 if different species, +10 if same
  fertMod = (bredOptions.checkboxes.checked.includes('differentSpecies')
             && !(bredTraits.includes('corruptedWomb')))
    ? (fertMod - 10) : (fertMod + 10);

  // -10 for every undefeated contraceptive
  const undefContra = parseInt(breederOptions.ranges.undefeatedContraceptives.value, 10);
  fertMod = undefContra > 0 ? (fertMod - (10 * undefContra)) : fertMod;

  // -1 for every defeated contraceptive
  const defContra = parseInt(breederOptions.ranges.defeatedContraceptives.value, 10);
  fertMod = defContra > 0 ? (fertMod - (1 * defContra)) : fertMod;

  // +10 for every extra fert level
  const extraFert = parseInt(bredOptions.ranges.fertilityBonus.value, 10);
  fertMod = (extraFert > 0) ? (fertMod + (10 * extraFert)) : fertMod;

  // -10 for low fert
  fertMod = bredOptions.checkboxes.checked.includes('lowFertility')
    ? (fertMod - 10) : fertMod;

  const dice = new Roll();

  // B-B-B-Bonus crits from naturalBornStud are factored in!
  const matchups = Object.keys(playerRolls);
  let breederCrits = 0;
  let breederDoubleCrits = 0;
  let breederBonusCrits = 0;

  for (let i = 0; i < matchups.length; i += 1) {
    // Double crits do NOT double dip for fert phase
    if (playerRolls[matchups[i]].breederCrit === 'double') {
      breederDoubleCrits += 1;
    } else if (playerRolls[matchups[i]].breederCrit === 'single') {
      breederCrits += 1;
    }
    // This will only ever be true if naturalBornStud is active
    if (playerRolls[matchups[i]].breederBonusCrit) {
      breederBonusCrits += 1;
    }
  }

  // +5 per crit/bonus crit
  fertMod += ((breederCrits + breederBonusCrits) * 5);
  // +8, 14, 18, 20, 25 + SpECiaL bOnUS for doubleCrits
  // I see the pattern, but I'm too lazy to do some recursive bullshit
  let doubleCritMod = 0;

  switch (breederDoubleCrits) {
    case 1:
      doubleCritMod = 8;
      break;
    case 2:
      doubleCritMod = 14;
      break;
    case 3:
      doubleCritMod = 18;
      break;
    case 4:
      doubleCritMod = 20;
      break;
    case 5:
      doubleCritMod = 25;
      break;
    default:
      doubleCritMod = 0;
  }

  fertMod += doubleCritMod;

  // TODO: Male 5/5 Doublecrit Strikes / Female Fails: +25, then either:
  //    roll 3d50 rather than 1d100
  //    or
  //    double available eggs
  // (Overrides single double crits, so +25 max.
  // Eggs can only be doubled once, if not done already in ovulation check.)

  const babies = [];
  const eggsCopy = eggs;
  eggsCopy.eggList = {};
  // ok... it's time for the big chungus loop
  // this is easily the most computation-heavy bit if many eggs
  for (let i = 0; i < eggs.count; i += 1) {
    let babiesToAdd = [];
    let numBabiesAdded = 0;

    babiesToAdd = fertEgg(dice, fertMod, babiesToAdd, playerOptions.selectedTraits);

    numBabiesAdded = babiesToAdd.length;
    eggsCopy.eggList[`babiesFromEgg${i}`] = numBabiesAdded;

    babies.push(...babiesToAdd);
  }

  return { updatedEggs: eggsCopy, babiesList: babies, fertChance: (100 + fertMod) };
}

export {
  calculateMods, getNumEggs, getBabies, Roll,
};

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

export { calculateMods, Roll };

// const yes = calculateMods('test');
// console.log(yes);

/**
   *def calculate_mods(event, values):

    # breeder
    if(values['knot']):
        breeder_mod += 1
    if(values['barbs']):
        breeder_mod += 1
    if(values['virility'] > 0):
        breeder_mod += values['virility']
    if(values['extra_fluids']):
        breeder_mod += 1
    if(values['extended_penetration_duration']):
        breeder_mod += 1
    if(values['successive_climaxes_inside_bred']):
        breeder_mod += 1
    if(values['virility_aids'] > 0):
        i = 0
        while i < values['virility_aids']:
            breeder_mod += dice.roll('1d4')[0]
            i += 1
    if(values['low_sperm_count']):
        breeder_mod -= 2
    print(breeder_mod)
    return {'bred_mod':bred_mod,'breeder_mod':breeder_mod}
   */

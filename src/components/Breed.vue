<template>
  <div class="container">
    <h1 class="text-center">Serv's Breeding Dice Game Thing</h1>
    <br/>
    <b-collapse id="accordion-settings" visible accordion="main-accordion" role="tabpanel">
    <h2 class="text-center">1. Set your settings</h2>
    <br>
    <!--todo: add save settings button?-->
    <div class="accordion" role="tablist">
      <b-card w-25 no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="primary">Bred Options</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-row>
            <b-col>
          <b-card-body>
            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-bred_inHeat" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-bred_inHeat" triggers="hover">
                  Big boost to eggs ovulated and fertility.
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" id="bred_inHeat" value="bred_inHeat" v-model="bred_checked">
              </b-col>
              <b-col md="auto">
                <label for="bred_inHeat">In Heat</label>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-bred_desireForImpreg" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-bred_desireForImpreg" triggers="hover">
                  Boosts fertility. They know what they want. Now give it to them.
                </b-tooltip>
              </b-col>
              <b-col md="auto">
              <input type="checkbox" id="bred_desireForImpreg" value="bred_desireForImpreg"
                v-model="bred_checked">
              </b-col>
              <b-col md="auto">
                <label for="bred_desireForImpreg">Strong Desire for Impregnation</label>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-bred_arousedBeforeSex" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-bred_arousedBeforeSex" triggers="hover">
                  They don't need any convincing. They're already yours...
                  Lowers bred's chance to resist impregnation.
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" id="bred_arousedBeforeSex" value="bred_arousedBeforeSex"
                v-model="bred_checked">
              </b-col>
              <b-col md="auto">
                <label for="bred_arousedBeforeSex">Aroused Before Sex</label>
              </b-col>
            </b-row>

            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-bred_lowFertility" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-bred_lowFertility" triggers="hover">
                  Naturally barren? Cursed? Whatever the reason, this oven has some issues.
                  Hopefully you can fix that.~
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" id="bred_lowFertility" value="bred_lowFertility"
                v-model="bred_checked">
              </b-col>
              <b-col md="auto">
                <label class="text-danger" for="bred_lowFertility">Low Innate Fertility</label>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-bred_differentSpecies" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-bred_differentSpecies" triggers="hover">
                  Differing genetics makes it a bit more difficult to conceive...
                  (Note: Play however you want, but I'd suggest keeping it "high-level" like
                  "canines" vs. "wolf/dingo" etc.)
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" id="bred_differentSpecies" value="bred_differentSpecies"
                v-model="bred_checked">
              </b-col>
              <b-col md="auto">
                <label class="text-danger" for="bred_differentSpecies">Different Species</label>
              </b-col>
            </b-row>
            <b-row>
            <b-col md="auto">
                <b-icon id="help-button-bred_position" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-bred_position" triggers="hover">
                  Getting the right angle helps make sure that seed gets
                  where it needs to so it can work its magic.
                </b-tooltip>
              </b-col>
            <b-form-group label="Sex Position" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                  id="bred_position"
                  v-model="bred_positionSelected"
                  :options="bred_positionOptions"
                  :aria-describedby="ariaDescribedby"
                  name="bred_position"
                ></b-form-radio-group>
            </b-form-group>
          </b-row>
          <b-row>
            <b-col md="auto">
              <b-icon id="help-button-bred_penetrationDepth" icon="question-circle-fill"
              aria-label="Help" font-scale=".8">
              </b-icon>
              <b-tooltip target="help-button-bred_penetrationDepth" triggers="hover">
                Conceiving is a bit easier if you give that spunk a one way
                trip to those egg factories.
              </b-tooltip>
            </b-col>
            <b-form-group label="Penetration Depth" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                  id="bred_penetrationDepth"
                  v-model="bred_penetrationDepthSelected"
                  :options="bred_penetrationDepthOptions"
                  :aria-describedby="ariaDescribedby"
                  name="bred_penetrationDepth"
                ></b-form-radio-group>
            </b-form-group>
          </b-row>
          <b-row>
            <b-col md="auto">
              <b-icon id="help-button-bred_wetness" icon="question-circle-fill"
              aria-label="Help" font-scale=".8">
              </b-icon>
              <b-tooltip target="help-button-bred_wetness" triggers="hover">
                While wetness may not <i>directly</i> boost fertility,
                the lack of 'friction' can only serve to help.~
              </b-tooltip>
            </b-col>
            <b-form-group label="Wetness" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                  id="bred_wetness"
                  v-model="bred_wetnessSelected"
                  :options="bred_wetnessOptions"
                  :aria-describedby="ariaDescribedby"
                  name="bred_wetness"
                ></b-form-radio-group>
            </b-form-group>
          </b-row>
          </b-card-body>
        </b-col>
        <b-col>
          <b-card-body>

            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-bred_fertilityBonus" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-bred_fertilityBonus" triggers="hover">
                  Someone's innate fertility. This is usually achieved either naturally
                  or through some permanent enhancement or modification to the one being bred.
                </b-tooltip>
              </b-col>
              <label for="bred_fertilityBonus">
                Fertility Bonus: {{bred_fertilityBonusValue}}
              </label>
              </b-row>
              <b-form-input class="w-50" name="bred_fertilityBonus" id="bred_fertilityBonus"
                v-model="bred_fertilityBonusValue" type="range" min="0" max="50">
              </b-form-input>

            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-bred_fertilityAids" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-bred_fertilityAids" triggers="hover">
                  A temporary boost to one's fertility or ability to conceive. Pills,
                  potions, medicine, energy boosts - things like that!
                </b-tooltip>
              </b-col>
              <label for="bred_fertilityAids">
                Fertility Aids: {{bred_fertilityAidsValue}}
              </label>
              </b-row>

              <b-form-input class="w-50" name="bred_fertilityAids" id="bred_fertilityAids"
                v-model="bred_fertilityAidsValue" type="range" min="0" max="50">
              </b-form-input>

            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-bred_previousImpregnations" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-bred_previousImpregnations" triggers="hover">
                  Those who have had previous experience baking buns in their oven
                  will find it a bit easier to conceive with every successive pregnancy.
                </b-tooltip>
              </b-col>
              <label for="bred_previousImpregnations">
                Previous Impregnations: {{bred_previousImpregnationsValue}}
              </label>
              </b-row>

              <b-form-input class="w-50" name="bred_previousImpregnations"
                id="bred_previousImpregnations"
                v-model="bred_previousImpregnationsValue" type="range" min="0" max="50">
              </b-form-input>

            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-bred_numberOrgasms" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-bred_numberOrgasms" triggers="hover">
                  Not only does every orgasm help milk the stud of their seed, but
                  is said to also stimulate the ovaries to release their bounty.
                </b-tooltip>
              </b-col>
              <label for="bred_numberOrgasms">
                Number of Orgasms: {{bred_numberOrgasmsValue}}
              </label>
              </b-row>

              <b-form-input class="w-50" name="bred_numberOrgasms" id="bred_numberOrgasms"
              v-model="bred_numberOrgasmsValue" type="range" min="0" max="50">
              </b-form-input>

            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-bred_ovulationDrugs" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-bred_ovulationDrugs" triggers="hover">
                  Drugs/stimulants given to the one being bred that result in the womb's
                  ovaries releasing more and more precious ova for the breeder's seed to claim.
                </b-tooltip>
              </b-col>
              <label for="bred_ovulationDrugs">
                Ovulation Drugs: {{bred_ovulationDrugsValue}}
              </label>
              </b-row>
              <b-form-input class="w-50" name="bred_ovulationDrugs"
                id="bred_ovulationDrugs"
                v-model="bred_ovulationDrugsValue" type="range" min="0" max="50">
              </b-form-input>
          </b-card-body>
        </b-col>
      </b-row>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="danger">Breeder Options</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-row>
            <b-col>
          <b-card-body>
            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_hasKnot" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_hasKnot" triggers="hover">
                  A nice plump bulb at the end of the shaft to keep that seed locked
                  firmly in place. Need I say more?
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" id="breeder_hasKnot"
                value="breeder_hasKnot" v-model="breeder_checked">
              </b-col>
              <b-col md="auto">
                <label for="breeder_hasKnot">Has Knot</label>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_hasBarbs" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_hasBarbs" triggers="hover">
                  Each rake of those spines along the tight walls of the one being bred
                  sends signals to the ovaries that a true stud is about to deliver their
                  payload.
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" id="breeder_hasBarbs"
                value="breeder_hasBarbs" v-model="breeder_checked">
              </b-col>
              <b-col md="auto">
                <label for="breeder_hasBarbs">Has Barbs/Penile Spines</label>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_inRut" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_inRut" triggers="hover">
                  A special time in which the breeder's virility and almost primal drive to
                  breed is drastically increased. Watch out: it's mating season...
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" id="breeder_inRut"
                value="breeder_inRut" v-model="breeder_checked">
              </b-col>
              <b-col md="auto">
                <label for="breeder_inRut">In Rut</label>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_cameMoreThanOnce" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_cameMoreThanOnce" triggers="hover">
                  "You think you're good and bred, huh? Let's go again.
                  Y'know... Just to be sure.~"
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" id="breeder_cameMoreThanOnce"
                value="breeder_cameMoreThanOnce" v-model="breeder_checked">
              </b-col>
              <b-col md="auto">
                <label for="breeder_cameMoreThanOnce">Came > 1 time in who was bred</label>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_extraFluids" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_extraFluids" triggers="hover">
                  All that slick belching from the tip of that spire really helps for
                  making sure the breeder can get themselves as far in as they can possibly get.
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" id="breeder_extraFluids"
                  value="breeder_extraFluids" v-model="breeder_checked">
              </b-col>
              <b-col md="auto">
                <label for="breeder_extraFluids">Extra Fluids</label>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_extendedPenetration" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_extendedPenetration" triggers="hover">
                  "Woah woah woah, where you going? I tied, we ain't going anywhere. Guess
                  we have no choice but to let that baby gravy brew and churn in that womb of
                  yours.~"
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" id="breeder_extendedPenetration"
                value="breeder_extendedPenetration" v-model="breeder_checked">
              </b-col>
              <b-col md="auto">
                <label for="breeder_extendedPenetration">Extended Penetration Duration</label>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_lowSpermCount" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_lowSpermCount" triggers="hover">
                  Not quite shooting blanks, but the breeder has quite a few less tadpoles
                  in each load than the average stud.
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" id="breeder_lowSpermCount"
                value="breeder_lowSpermCount" v-model="breeder_checked">
              </b-col>
              <b-col md="auto">
                <label class="text-danger" for="breeder_lowSpermCount">Low Natural Sperm Count
                </label>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_cumflation" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_cumflation" triggers="hover">
                  "Goddamn, you look pregnant already. And if I didn't know better,
                  I'd think you were already starting to swell.~ Can't wait to see
                  how you look in 9 months from now..."
                </b-tooltip>
              </b-col>
            <b-form-group label="Cumflation" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                  id="breeder_cumflation"
                  v-model="breeder_cumflationSelected"
                  :options="breeder_cumflationOptions"
                  :aria-describedby="ariaDescribedby"
                  name="breeder_cumflation"
                ></b-form-radio-group>
            </b-form-group>
          </b-row>
          </b-card-body>
        </b-col>
        <b-col>
          <b-card-body>
            <row>
              <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_virilityBonus" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_virilityBonus" triggers="hover">
                  The breeder's natural virility. For whatever reason, this stud was born
                  for making babies. Let's just hope he doesn't get even better at it as he goes...
                </b-tooltip>
              </b-col>
              <label for="breeder_virilityBonus">
                Virility Bonus: {{breeder_virilityBonusValue}}
              </label>
            </b-row>
              <b-form-input class="w-50" name="breeder_virilityBonus" id="breeder_virilityBonus"
                v-model="breeder_virilityBonusValue" type="range" min="0" max="50">
              </b-form-input>
            </row>
            <br/>
            <row>
              <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_virilityAids" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_virilityAids" triggers="hover">
                  "Virilify-2000 - Serving size: 1 pill, huh? Fuck that.
                  I say Serving size: 1 bottle. Increase as needed. Doctor's orders.~"
                </b-tooltip>
              </b-col>
              <label for="breeder_virilityAids">
                Virility Aids: {{breeder_virilityAidsValue}}
              </label>
            </b-row>
              <b-form-input class="w-50" name="breeder_virilityAids" id="breeder_virilityAids"
                v-model="breeder_virilityAidsValue" type="range" min="0" max="50">
              </b-form-input>
            </row>
            <br/>
            <row>
              <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_numberOrgasms" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_numberOrgasms" triggers="hover">
                  If you thought that first wave of gravy made a lot of pups, you're in
                  for a wild ride. They're just getting started...
                </b-tooltip>
              </b-col>
              <label for="breeder_numberOrgasms">
                Number of Orgasms: {{breeder_numberOrgasmsValue}}
              </label>
            </b-row>
              <b-form-input class="w-50" name="breeder_numberOrgasms" id="breeder_numberOrgasms"
              v-model="breeder_numberOrgasmsValue" type="range" min="0" max="50">
              </b-form-input>
            </row>
            <br/>
            <row>
              <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_undefeatedContraceptives"
                icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_undefeatedContraceptives"
                triggers="hover">
                  Whether it's birth control, plan B, spermicidal lube, or a good ol' rubber -
                  something's trying to keep the breeder from doing what he does best. "Trying",
                  of course, being the key word.~
                </b-tooltip>
              </b-col>
              <label class="text-danger" for="breeder_undefeatedContraceptives">
                Undefeated Contraceptives: {{breeder_undefeatedContraceptivesValue}}
              </label>
              </b-row>
              <b-form-input class="w-50" name="breeder_undefeatedContraceptives"
                id="breeder_undefeatedContraceptives"
                v-model="breeder_undefeatedContraceptivesValue" type="range" min="0" max="50">
              </b-form-input>
            </row>
            <br/>
            <row>
              <b-row>
              <b-col md="auto">
                <b-icon id="help-button-breeder_defeatedContraceptives"
                icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip target="help-button-breeder_defeatedContraceptives"
                triggers="hover">
                  Maybe the condom ripped, or that birth control was expired/was
                  ineffective. Better than nothing for stopping a pregnancy, but
                  drastically less effective than the user probably would've hoped...
                </b-tooltip>
              </b-col>
              <label class="text-danger" for="breeder_defeatedContraceptives">
                Defeated Contraceptives: {{breeder_defeatedContraceptivesValue}}
              </label>
              </b-row>
              <b-form-input class="w-50" name="breeder_defeatedContraceptives"
                id="breeder_defeatedContraceptives"
                v-model="breeder_defeatedContraceptivesValue" type="range" min="0" max="50">
              </b-form-input>
            </row>

          </b-card-body>
        </b-col>
      </b-row>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" id="traitcard">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button disabled block variant="info"
          v-b-toggle.accordion-3 id="traitbutton">Choose Traits</b-button>
          <b-tooltip target="traitcard"
                triggers="hover">
                Coming soon™!
          </b-tooltip>
        </b-card-header>
        <!-- TODO: add traits functionality -->
        <!--<b-collapse id="accordion-3" accordion="my-accordion"
        v-b-tooltip.html title="test" role="tabpanel">
      <div class="column" border-variant="danger">
        <b-card-group deck>
          <b-card
          border-variant="primary"
          header="Bred Traits"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center"
        >
          </b-card>
          <b-card
          border-variant="danger"
          header="Breeder Traits"
          header-bg-variant="danger"
          header-text-variant="white"
          align="center"
        >
          </b-card>
        </b-card-group>
      </div>
        </b-collapse>-->
      </b-card>
    </div><br>

    <h2 class="text-center">2. Roll your dice</h2><br>

    <div class="wrapper">
      <div class="column">
        <b-row align="center">
          <b-col class="pb-2">
            <b-button size="lg" id="rollBredButton"
              variant="primary" @click="rollDiceBred">
              Roll Dice
            </b-button>
          </b-col>
          <b-col class="pb-2">
            <b-button size="lg" id="rollBreederButton"
              variant="danger" @click="rollDiceBreeder">
              Roll Dice
            </b-button>
          </b-col>
        </b-row>
      </div>
      <br>
      <div class="column">
        <b-card-group deck>
          <b-card
          border-variant="primary"
          header="Bred Rolls"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center"
        >
          <b-list-group>
            <b-row cols="5">
              <!--TODO: convert min/max logic to global constants for tweaks by traits-->
            <b-form-input class="w-25 text-center" :id="die.bredId" v-for="die in playerRolls"
            type="number" :key="die" :value="die.bredValue" pattern="\d+"
            min="1" max="10" default="1" oninput="validity.valid&&(value!='')||(value='1')">
            </b-form-input></b-row>
          </b-list-group>
          </b-card>
          <b-card
          border-variant="danger"
          header="Breeder Rolls"
          header-bg-variant="danger"
          header-text-variant="white"
          align="center"
        >
          <b-list-group>
            <b-row cols="5">
            <b-form-input class="w-25 text-center" :id="die.breederId" v-for="die in playerRolls"
            type="number" :key="die" :value="die.breederValue" pattern="\d+"
            min="1" max="10" default="1" oninput="validity.valid&&(value!='')||(value='1')">
            </b-form-input>
          </b-row>
          </b-list-group>
          </b-card>
        </b-card-group>
      </div>
    </div>
    <br>
    <h2 class="text-center">3. <b-button size="lg" id="rollBreederButton"
              variant="dark"  @click="startPhaseImpreg"
              v-b-toggle.accordion-impreg>
              BREED
            </b-button></h2>
    </b-collapse>
    <!--
        _____                                   _____  _
       |_   _|                                 |  __ \| |
         | |  _ __ ___  _ __  _ __ ___  __ _   | |__) | |__   __ _ ___  ___
         | | | '_ ` _ \| '_ \| '__/ _ \/ _` |  |  ___/| '_ \ / _` / __|/ _ \
        _| |_| | | | | | |_) | | |  __/ (_| |  | |    | | | | (_| \__ \  __/
       |_____|_| |_| |_| .__/|_|  \___|\__, |  |_|    |_| |_|\__,_|___/\___|
                       | |              __/ |
                       |_|             |___/
    -->
    <b-collapse id="accordion-impreg" visible accordion="main-accordion" role="tabpanel">
    <div id="charts" class="center" v-if="phase === 1">
      <b-row align-h="around">
        <b-column>
          <apexchart type="radialBar" height="350" :options="bredChartOptions"
          :series="bredSeries">
          </apexchart>
        </b-column>
        <b-column>
          <apexchart type="radialBar" height="350" :options="breederChartOptions"
          :series="breederSeries">
          </apexchart>
        </b-column>
      </b-row>
    </div>
      <b-row class="justify-content-md-center" v-if="phase === 1">
        <b-col col lg="2">
          <h4>
          <b-card
          border-variant="primary"
          header="Bred"
          header-bg-variant="primary"
          header-text-variant="white"
          class="text-center">

            <b-card-body no-body class="text-center" :id="die.id"
            v-for="die in playerRolls" :key="die">
              <b-row align-h="center">
                <b-badge>{{die.bredCalcValue}}</b-badge>
              </b-row>
            </b-card-body>
          </b-card>
          </h4>
        </b-col>
        <b-column md="auto">
          <h4>
          <b-card
            header="VS."
            class="text-center">
            <b-card-body no-body class="text-center"
            v-for="result in playerRolls" :key="result">
              <b-row align-h="center">
                <b v-if="result.winner==='breeder'">
                  <b class="text-danger">Breeder</b> wins! 🎉
                </b>
                <b v-else-if="result.winner==='bred'">
                  <b class="text-primary">Bred</b> wins... 😢
                </b>
                <b v-else>Tie... Fuck it,
                  <b class="text-danger">Breeder</b> wins!
                </b>
              </b-row>
            </b-card-body>
          </b-card>
        </h4>
        </b-column>
        <b-col col lg="2">
          <h4>
        <b-card
        border-variant="danger"
        header="Breeder"
        header-bg-variant="danger"
        header-text-variant="white"
        align="center">

          <b-card-body no-body class="text-center" :id="die.id"
          v-for="die in playerRolls" :key="die">
            <b-row align-h="center">
              <b-badge>{{die.breederCalcValue}}</b-badge>
            </b-row>
          </b-card-body>

        </b-card>
        </h4>
      </b-col>
    </b-row>

    <div v-if="overallWinner === 'bred'">
      <b-row class="justify-content-md-center text-center">
        <b-col md="auto">
          <b-img src="https://static.f-list.net/images/eicon/missionfailed.gif"
          fluid alt="Mission Failed">
          </b-img>
        </b-col>
        <b-col md="auto">
          <h1 class="text-primary" align-self="center"><br/>Impregnation Failed...</h1>
        </b-col>
        <b-col md="auto">
          <b-img src="https://static.f-list.net/images/eicon/missionfailed.gif"
          fluid alt="Mission Failed">
          </b-img>
        </b-col>
      </b-row>
      <br/>
      <b-row class="justify-content-md-center">
        <h2 class="text-center">
          <b-button size="lg" id="rollBreederButton"
                variant="dark"  @click="tryAgain">
                Try again?
          </b-button>
        </h2>
      </b-row>
    </div>
    <div v-else>
      <b-row class="justify-content-md-center text-center">
        <b-col md="auto">
          <b-img src="https://static.f-list.net/images/eicon/wombknot2.gif"
          style="transform: scaleX(-1);" fluid alt="Preggo R2">
          </b-img>
          <b-img src="https://static.f-list.net/images/eicon/wombknot1.gif"
          style="transform: scaleX(-1);" fluid alt="Preggo R1">
          </b-img>
        </b-col>
        <b-col md="auto">
          <h1 class="text-danger" align-self="center"><br/>Impregnation Successful</h1>
        </b-col>
        <b-col md="auto">
          <b-img src="https://static.f-list.net/images/eicon/wombknot1.gif" fluid alt="Preggo R1">
          </b-img>
          <b-img src="https://static.f-list.net/images/eicon/wombknot2.gif" fluid alt="Preggo R2">
          </b-img>
        </b-col>
      </b-row>
      <br/>
      <b-row class="justify-content-md-center">

          <b-col col lg="2" class="text-right">
            <b-icon id="ovu-help-button"
            icon="question-circle-fill" aria-label="Help"></b-icon>
            <b-tooltip target="ovu-help-button" triggers="hover">
              Can't make a baby without dropping a few
            eggs, eh?</b-tooltip>
          </b-col>
          <b-col cols="12" md="auto">
            <h2>
              <b-button size="lg" id="rollBreederButton"
                    variant="dark"  @click="startPhaseOvu"
                    class="text-center" v-b-toggle.accordion-ovu>
                    Ovulate
              </b-button>
            </h2>
          </b-col>
          <b-col col lg="2"></b-col>

      </b-row>
  </div>
  </b-collapse>
  <!--
       ____              _       _   _                _____  _
      / __ \            | |     | | (_)              |  __ \| |
     | |  | |_   ___   _| | __ _| |_ _  ___  _ __    | |__) | |__   __ _ ___  ___
     | |  | \ \ / / | | | |/ _` | __| |/ _ \| '_ \   |  ___/| '_ \ / _` / __|/ _ \
     | |__| |\ V /| |_| | | (_| | |_| | (_) | | | |  | |    | | | | (_| \__ \  __/
      \____/  \_/  \__,_|_|\__,_|\__|_|\___/|_| |_|  |_|    |_| |_|\__,_|___/\___|
  -->
  <b-collapse id="accordion-ovu" visible accordion="main-accordion" role="tabpanel">
      <div id="ovu-charts" class="center" v-if="phase === 2">
        <!-- TODO: Add some fun egg charts~ -->
        <!--<b-row align-h="around">
          <b-column>
            <apexchart type="radialBar" height="350" :options="bredChartOptions"
            :series="bredSeries">
            </apexchart>
          </b-column>
          <b-column>
            <apexchart type="radialBar" height="350" :options="breederChartOptions"
            :series="breederSeries">
            </apexchart>
          </b-column>
        </b-row> -->
      </div>
        <b-row class="justify-content-md-center" v-if="phase === 2">
          <b-column md="auto">
            <h4>
            <b-card
              header="Egg Tally:"
              class="text-center">
              <b-card-body no-body class="text-center">
                <b-row align-h="center">
                    🥚 <h2><b class="text-danger">{{eggs.count}}</b></h2>&nbsp;eggs! 🥚
                </b-row>
              </b-card-body>
            </b-card>
          </h4>
          </b-column>
      </b-row>
      <div v-if="eggs.count <= 0">
        <b-row class="justify-content-md-center">
          <h2 class="text-center">
            <b-button size="lg" id="tryAgainOvu"
                  variant="dark"  @click="tryAgain">
                  Try again?
            </b-button>
          </h2>
        </b-row>
      </div>
      <div v-else>
        <b-row class="justify-content-md-center text-center">
          <!--<b-col md="auto">
            <b-img src="https://static.f-list.net/images/eicon/wombknot2.gif"
            style="transform: scaleX(-1);" fluid alt="Preggo R2">
            </b-img>
            <b-img src="https://static.f-list.net/images/eicon/wombknot1.gif"
            style="transform: scaleX(-1);" fluid alt="Preggo R1">
            </b-img>
          </b-col>
          <b-col md="auto">
            <h1 class="text-danger" align-self="center"><br/>Impregnation Successful</h1>
          </b-col>
          <b-col md="auto">
            <b-img src="https://static.f-list.net/images/eicon/wombknot1.gif" fluid alt="Preggo R1">
            </b-img>
            <b-img src="https://static.f-list.net/images/eicon/wombknot2.gif" fluid alt="Preggo R2">
            </b-img>
          </b-col>-->
        </b-row>
        <br/>
        <b-row class="justify-content-md-center">
            <b-col col lg="2" class="text-right">
              <b-icon id="fert-help-button"
              icon="question-circle-fill" aria-label="Help"></b-icon>
              <b-tooltip target="fert-help-button" triggers="hover">
                Got the eggs, time to add the gravy~</b-tooltip>
            </b-col>
            <b-col cols="12" md="auto">
              <h2>
                <b-button size="lg" id="startFinalPhaseButton"
                      variant="dark"  @click="startFinalPhase"
                      class="text-center" v-b-toggle.accordion-final>
                      Fertilize
                </b-button>
              </h2>
            </b-col>
            <b-col col lg="2"></b-col>
        </b-row>
    </div>
  </b-collapse>
  <!--
    ______ _             _   _____  _
   |  ____(_)           | | |  __ \| |
   | |__   _ _ __   __ _| | | |__) | |__   __ _ ___  ___
   |  __| | | '_ \ / _` | | |  ___/| '_ \ / _` / __|/ _ \
   | |    | | | | | (_| | | | |    | | | | (_| \__ \  __/
   |_|    |_|_| |_|\__,_|_| |_|    |_| |_|\__,_|___/\___|
  -->
  <b-collapse id="accordion-final" visible accordion="main-accordion" role="tabpanel">
    <div id="fert-charts" class="center" v-if="(phase === 3)">
      <!-- TODO: Add some fun egg charts~ -->
      <b-row align-v="stretch" class="justify-content-md-center">
        <b-column md="auto">
          <apexchart type="donut" height="600"
          :options="babiesChartOptions" :series="babiesSeries">
          </apexchart>
        </b-column>
      </b-row>
    </div>
    <br/>
      <b-row class="justify-content-md-center" v-if="(phase === 3)">
        <b-column md="auto">
          <h4>
          <b-card
            header="Babies:"
            class="text-center">
            <b-card-body no-body class="text-center">
              <b-row align-h="center">
                  Your chance to fertilize an egg was {{fertilizeChance}}%!
              </b-row>
              <br/>
              <b-row align-h="center">
                  You made&nbsp;<h2><b class="text-danger">{{babies.length}}</b></h2>&nbsp;babies
                  from&nbsp;<h2><b class="text-primary">{{eggs.count}}</b></h2>&nbsp;eggs!
              </b-row>
            </b-card-body>
          </b-card>
        </h4>
      </b-column>
    </b-row>
      <b-row class="justify-content-md-center" v-if="(phase === 3) && (babies.length > 0)">
        <b-col col lg="4">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.collapse-gender variant="info">Gender Details</b-button>
            </b-card-header>
            <b-collapse id="collapse-gender" role="tabpanel">
                <b-card-body no-body class="text-center">
                  <b-row align-h="center">
                    <apexchart type="donut" height="350"
                      :options="genderChartOptions" :series="genderSeries">
                    </apexchart>
                  </b-row>
                </b-card-body>
              </b-collapse>
          </b-card>
        </b-col>
        <b-col col lg="4">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.collapse-species variant="success">
                Species Details
              </b-button>
            </b-card-header>
            <b-collapse id="collapse-species" role="tabpanel">
                <b-card-body no-body class="text-center">
                  <b-row align-h="center">
                    <apexchart type="donut" height="350"
                      :options="speciesChartOptions" :series="speciesSeries">
                    </apexchart>
                  </b-row>
                </b-card-body>
              </b-collapse>
          </b-card>
        </b-col>
    </b-row>
    <div>
      <b-row class="justify-content-md-center">
        <b-col col lg="2" class="text-right">
        </b-col>
        <b-col cols="12" md="auto">
          <b-row class="justify-content-md-center">
            <h2 class="text-center">
              <b-button size="lg" id="goAgainButton"
                    variant="dark"  @click="tryAgain">
                    Go again?
              </b-button>
            </h2>
          </b-row>
        </b-col>
        <b-col col lg="2">
        </b-col>
      </b-row>
    </div>
  </b-collapse>
  <br/>
  <br/>
  <br/>
  <br/>
  <footer class="text-center fixed-bottom" v-if="!isMobile()">
    <b-card>
      <b-card-text>
      <b-row align-h="center">
        <b-col md="auto">
          <b-icon icon="envelope"></b-icon>
        </b-col>
        <b-col md="auto">
          Questions/Feedback? <a href="https://www.f-list.net/c/serv/">Send a note!</a> Based on
          <a href="https://www.f-list.net/c/taji%20amatsukaze/">these rules</a>.
        </b-col>
        <b-col md="auto">
          <b-icon icon="github"></b-icon>
        </b-col>
        <b-col md="auto">
          <a href="https://github.com/serverdingo/breeding_dice_game_web_client">serverdingo</a>
        </b-col>
      </b-row>
      </b-card-text>
    </b-card>
  </footer>
  <footer class="text-center" v-else>
    <b-card>
      <b-card-text>
      <b-row align-h="center">
        <b-col md="auto">
          <b-icon icon="envelope"></b-icon>
        </b-col>
        <b-col md="auto">
          Questions/Feedback? <a href="https://www.f-list.net/c/serv/">Send a note!</a> Based on
          <a href="https://www.f-list.net/c/taji%20amatsukaze/">these rules</a>.
        </b-col>
        <b-col md="auto">
          <b-icon icon="github"></b-icon>
        </b-col>
        <b-col md="auto">
          <a href="https://github.com/serverdingo/breeding_dice_game_web_client">serverdingo</a>
        </b-col>
      </b-row>
      </b-card-text>
    </b-card>
  </footer>
  </div>
</template>
<script>
// import axios from 'axios';
import { calculateMods, getNumEggs, getBabies } from '../breed';

export default {
  name: 'Breed',
  title() {
    return 'Breed';
  },
  data() {
    return {
      phase: 0,
      playerOptions: [],

      fertilizeChance: 0,

      mods: {},

      babies: {},

      playerRolls: {
        diceRoll1: {
          bredId: 'calculated_bred_diceRoll1',
          bredValue: 1,
          bredCalcValue: 1,
          bredCrit: '',

          breederId: 'calculated_breeder_diceRoll1',
          breederValue: 1,
          breederCalcValue: 1,
          breederCrit: '',

          winner: '',
        },
        diceRoll2: {
          bredId: 'calculated_bred_diceRoll2',
          bredValue: 1,
          bredCalcValue: 1,
          bredCrit: '',

          breederId: 'calculated_breeder_diceRoll2',
          breederValue: 1,
          breederCalcValue: 1,
          breederCrit: '',

          winner: '',
        },
        diceRoll3: {
          bredId: 'calculated_bred_diceRoll3',
          bredValue: 1,
          bredCalcValue: 1,
          bredCrit: '',

          breederId: 'calculated_breeder_diceRoll3',
          breederValue: 1,
          breederCalcValue: 1,
          breederCrit: '',

          winner: '',
        },
        diceRoll4: {
          bredId: 'calculated_bred_diceRoll4',
          bredValue: 1,
          bredCalcValue: 1,
          bredCrit: '',

          breederId: 'calculated_breeder_diceRoll4',
          breederValue: 1,
          breederCalcValue: 1,
          breederCrit: '',

          winner: '',
        },
        diceRoll5: {
          bredId: 'calculated_bred_diceRoll5',
          bredValue: 1,
          bredCalcValue: 1,
          bredCrit: '',

          breederId: 'calculated_breeder_diceRoll5',
          breederValue: 1,
          breederCalcValue: 1,
          breederCrit: '',

          winner: '',
        },
      },
      overallWinner: '',

      eggs: {
        count: 0,
      },

      bredSeries: [-53],
      breederSeries: [93],
      msg: '',
      bred_checked: [],
      bred_fertilityBonusValue: '0',
      bred_fertilityAidsValue: '0',
      bred_ovulationDrugsValue: '0',
      bred_previousImpregnationsValue: '0',
      bred_numberOrgasmsValue: '0',
      bred_positionSelected: 'other',
      bred_positionOptions: [
        { text: 'Doggy Style', value: 'doggyStyle' },
        { text: 'Mating Press', value: 'matingPress' },
        { text: 'Other', value: 'other' },
      ],
      bred_penetrationDepthSelected: 'normal',
      bred_penetrationDepthOptions: [
        { text: 'Normal', value: 'normal' },
        { text: 'Flooded Overies', value: 'floodedOvaries' },
        { text: 'Cervical Penetration', value: 'cervicalPen' },
      ],
      bred_wetnessSelected: 'none',
      bred_wetnessOptions: [
        { text: 'None/Lube Needed', value: 'none' },
        { text: 'Dripping', value: 'dripping' },
        { text: 'Constant Stream', value: 'constantStream' },
      ],

      breeder_checked: [],
      breeder_virilityBonusValue: '0',
      breeder_virilityAidsValue: '0',
      breeder_numberOrgasmsValue: '0',
      breeder_defeatedContraceptivesValue: '0',
      breeder_undefeatedContraceptivesValue: '0',
      breeder_cumflationSelected: 'none',
      breeder_cumflationOptions: [
        { text: 'None', value: 'none' },
        { text: 'Paunch', value: 'paunch' },
        { text: 'Pregnant-like', value: 'pregnantLike' },
        { text: 'Overflowing', value: 'overflowing' },
      ],

      babiesSeries: [],
      babiesChartOptions: {
        chart: {
          height: 450,
          type: 'donut',
          offsetY: -10,
        },
        colors: ['#353638', '#0234c9', '#c96902', '#34c72c', '#c22929', '#d117ce'],
        labels: ['Unfertilized', 'Singles', 'Twins', 'Triplets', 'Quadruplets', 'Quintuplets+'],
        responsive: [{
          breakpoint: 580,
          options: {
            chart: {
              width: 250,
            },
            legend: {
              height: 350,
              position: 'bottom',
            },
          },
        }],
      },

      genderSeries: [],
      genderChartOptions: {
        chart: {
          height: 350,
          type: 'donut',
          offsetY: -10,
        },
        colors: ['#3d81a8', '#a6468a', '#431d8f'],
        labels: ['Males', 'Females', 'Herms'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        }],
      },

      speciesSeries: [],
      speciesChartOptions: {
        chart: {
          height: 350,
          type: 'donut',
          offsetY: -10,
        },
        colors: ['#002bc7', '#c70007', '#aa02b0'],
        labels: ['Bred\'s', 'Breeder\'s', 'Hybrid'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        }],
      },

      bredChartOptions: {
        chart: {
          height: 350,
          type: 'radialBar',
          offsetY: -10,
        },
        colors: ['#4e0d8c'],
        plotOptions: {
          radialBar: {
            startAngle: -125,
            endAngle: 125,
            dataLabels: {
              name: {
                fontSize: '16px',
                color: undefined,
                offsetY: 120,
              },
              value: {
                offsetY: 76,
                fontSize: '22px',
                color: undefined,
                formatter(val) {
                  if (val < 10) {
                    return `${val}% Meh...`;
                  }
                  if (val < 25) {
                    return `${val}% Fairly fecund`;
                  }
                  if (val < 45) {
                    return `${val}% Pregtastic!`;
                  }
                  if (val < 101) {
                    return `${val}% Baby factory!`;
                  }
                  return 'Oh god...';
                },
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            gradientToColors: ['#69b2ce'],
            stops: [0, 100],
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: ['Fertil-o\'-meter'],
      },

      breederChartOptions: {
        chart: {
          height: 350,
          type: 'radialBar',
          offsetY: -10,
        },
        colors: ['#000000'],
        plotOptions: {
          radialBar: {
            startAngle: -125,
            endAngle: 125,
            background: '#333',
            dataLabels: {
              name: {
                fontSize: '16px',
                color: undefined,
                offsetY: 120,
              },
              value: {
                offsetY: 76,
                fontSize: '22px',
                color: undefined,
                formatter(val) {
                  if (val < 10) {
                    return `${val}% Normie`;
                  }
                  if (val < 25) {
                    return `${val}% Babymaker!`;
                  }
                  if (val < 45) {
                    return `${val}% Breederific!`;
                  }
                  if (val < 101) {
                    return `${val}% Mega-stud!`;
                  }
                  return 'Holy shit...';
                },
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            shadeIntensity: 0.15,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            gradientToColors: ['#fa3838'],
            stops: [0, 100],
          },
        },
        stroke: {
          dashArray: 4,
        },
        labels: ['Virility Score'],
      },
    };
  },
  methods: {
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    },
    rollDiceBred() {
      const dice = {
        sides: 10,
        roll() {
          const randomNumber = Math.floor(Math.random() * this.sides) + 1;
          return randomNumber;
        },
      };
      this.playerRolls.diceRoll1.bredValue = dice.roll();
      this.playerRolls.diceRoll2.bredValue = dice.roll();
      this.playerRolls.diceRoll3.bredValue = dice.roll();
      this.playerRolls.diceRoll4.bredValue = dice.roll();
      this.playerRolls.diceRoll5.bredValue = dice.roll();
    },
    rollDiceBreeder() {
      const dice = {
        sides: 10,
        roll() {
          const randomNumber = Math.floor(Math.random() * this.sides) + 1;
          return randomNumber;
        },
      };
      this.playerRolls.diceRoll1.breederValue = dice.roll();
      this.playerRolls.diceRoll2.breederValue = dice.roll();
      this.playerRolls.diceRoll3.breederValue = dice.roll();
      this.playerRolls.diceRoll4.breederValue = dice.roll();
      this.playerRolls.diceRoll5.breederValue = dice.roll();
    },
    startPhaseImpreg() {
      this.phase = 1;
      this.playerOptions = {
        bred_dice: this.bred_dice,
        breeder_dice: this.breeder_dice,
        bredSeries: this.bredSeries,
        breederSeries: this.breederSeries,
        bred_checked: this.bred_checked,
        bred_fertilityBonusValue: this.bred_fertilityBonusValue,
        bred_fertilityAidsValue: this.bred_fertilityAidsValue,
        bred_ovulationDrugsValue: this.bred_ovulationDrugsValue,
        bred_previousImpregnationsValue: this.bred_previousImpregnationsValue,
        bred_numberOrgasmsValue: this.bred_numberOrgasmsValue,
        bred_positionSelected: this.bred_positionSelected,
        bred_positionOptions: this.bred_positionOptions,
        bred_penetrationDepthSelected: this.bred_penetrationDepthSelected,
        bred_penetrationDepthOptions: this.bred_penetrationDepthOptions,
        bred_wetnessSelected: this.bred_wetnessSelected,
        bred_wetnessOptions: this.bred_wetnessOptions,
        breeder_checked: this.breeder_checked,
        breeder_virilityBonusValue: this.breeder_virilityBonusValue,
        breeder_virilityAidsValue: this.breeder_virilityAidsValue,
        breeder_numberOrgasmsValue: this.breeder_numberOrgasmsValue,
        breeder_defeatedContraceptivesValue: this.breeder_defeatedContraceptivesValue,
        breeder_undefeatedContraceptivesValue: this.breeder_undefeatedContraceptivesValue,
        breeder_cumflationSelected: this.breeder_cumflationSelected,
        breeder_cumflationOptions: this.breeder_cumflationOptions,
      };
      this.mods = calculateMods(this.playerOptions);

      let bredScore = (this.mods.bred_mod >= 0) ? 0 : Math.abs(this.mods.bred_mod);
      if (bredScore <= 25) { // Boost graph % up to 75%, then it's 1 % per point
        bredScore *= 3;
      } else {
        bredScore = Math.floor(75 + (5 * (bredScore ** 0.35)));
      }
      this.bredSeries = [Math.min(bredScore, 101)];

      let breederScore = (this.mods.breeder_mod < 0) ? 0 : Math.abs(this.mods.breeder_mod);
      if (breederScore <= 25) { // Boost graph % up to 75%, then it's 1 % per point
        breederScore *= 3;
      } else {
        breederScore = Math.floor(75 + (5 * (breederScore ** 0.35)));
      }
      this.breederSeries = [Math.min(breederScore, 101)];

      const matchups = Object.keys(this.playerRolls);

      let bredTotalWins = 0;
      let breederTotalWins = 0;

      for (let i = 0; i < matchups.length; i += 1) {
        this.playerRolls[matchups[i]].bredCalcValue = this.playerRolls[matchups[i]].bredValue
          + this.mods.bred_mod;
        this.playerRolls[matchups[i]].breederCalcValue = this.playerRolls[matchups[i]].breederValue
          + this.mods.breeder_mod;

        const bred = this.playerRolls[matchups[i]].bredCalcValue;
        const breeder = this.playerRolls[matchups[i]].breederCalcValue;

        let winner = 'tie';
        let bredCrit = 'none';
        let breederCrit = 'none';

        if (bred !== breeder) {
          winner = (bred > breeder) ? 'bred' : 'breeder';
          if (breeder >= 10) { // TODO: make these global constants for easy tweaking
            breederCrit = (breeder >= 20) ? 'double' : 'single';
          }
          if (bred <= 1) {
            bredCrit = (bred <= -10) ? 'double' : 'single';
          }
        }

        if (winner === 'bred') {
          bredTotalWins += 1;
        } else if (winner === 'breeder') {
          breederTotalWins += 1;
        } // If tied, don't add a win to either

        this.playerRolls[matchups[i]].winner = winner;
        this.playerRolls[matchups[i]].bredCrit = bredCrit;
        this.playerRolls[matchups[i]].breederCrit = breederCrit;
      }
      if (bredTotalWins !== breederTotalWins) {
        this.overallWinner = (bredTotalWins > breederTotalWins) ? 'bred' : 'breeder';
      } else {
        this.overallWinner = 'tie';
      }
    },

    startPhaseOvu() {
      this.phase = 2;
      this.eggs.count = getNumEggs(this.playerOptions, this.playerRolls);
    },

    startFinalPhase() {
      this.phase = 3;
      // I'm pretty sure this variable name has put me on some kind of watch list
      const eggsAndBabies = getBabies(this.playerOptions, this.playerRolls, this.eggs);
      console.log(eggsAndBabies);
      this.eggs = eggsAndBabies.updatedEggs;
      this.babies = eggsAndBabies.babiesList;
      this.fertilizeChance = eggsAndBabies.fertChance;

      const numBabies = this.babies.length;
      const genderCount = {
        male: 0,
        female: 0,
        herm: 0,
      };
      const speciesCount = {
        bred: 0,
        breeder: 0,
        hybrid: 0,
      };
      for (let i = 0; i < numBabies; i += 1) {
        if (this.babies[i].gender === 1) {
          genderCount.male += 1;
        } else if (this.babies[i].gender === 2) {
          genderCount.female += 1;
        } else {
          genderCount.herm += 1;
        }

        if (this.babies[i].species === 1) {
          speciesCount.bred += 1;
        } else if (this.babies[i].gender === 2) {
          speciesCount.breeder += 1;
        } else {
          speciesCount.hybrid += 1;
        }
      }

      this.genderSeries = [genderCount.male, genderCount.female, genderCount.herm];
      this.speciesSeries = [speciesCount.bred, speciesCount.breeder, speciesCount.hybrid];
      // console.log(this.genderSeries);
      // console.log(this.speciesSeries);

      const numEggies = Object.keys(this.eggs.eggList).length;
      const multipleTracker = {
        unfert: 0,
        single: 0,
        twins: 0,
        triplets: 0,
        quadruplets: 0,
        quintupletsOrMore: 0,
      };

      for (let i = 0; i < numEggies; i += 1) {
        console.log(this.eggs.eggList[`babiesFromEgg${i}`]);
        switch (this.eggs.eggList[`babiesFromEgg${i}`]) {
          case 0:
            multipleTracker.unfert += 1;
            break;
          case 1:
            multipleTracker.single += 1;
            break;
          case 2:
            multipleTracker.twins += 1;
            break;
          case 3:
            multipleTracker.triplets += 1;
            break;
          case 4:
            multipleTracker.quadruplets += 1;
            break;
          default:
            multipleTracker.quintupletsOrMore += 1;
        }
      }

      this.babiesSeries = [multipleTracker.unfert, multipleTracker.single, multipleTracker.twins,
        multipleTracker.triplets, multipleTracker.quadruplets,
        multipleTracker.quintupletsOrMore];
      console.log(this.babiesSeries);
    },

    tryAgain() {
      window.location.reload(); // TODO: Reload page with saved settings, or do a 'soft reload'
    },
  },
  created() {
    // this.getMessage();
  },
};

</script>

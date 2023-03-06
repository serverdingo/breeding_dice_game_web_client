<template>
  <div class="container">
    <h1 class="text-center">Serv's Breeding Calculator Thing</h1>
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
                <input type="checkbox" id="bred_inHeat" value="bred_inHeat" v-model="bred_checked">
              </b-col>
              <b-col md="auto">
                <label for="bred_inHeat">In Heat</label>
              </b-col>
            </b-row>

            <b-row>
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
                <input type="checkbox" id="bred_arousedBeforeSex" value="bred_arousedBeforeSex"
                v-model="bred_checked">
              </b-col>
              <b-col md="auto">
                <label for="bred_arousedBeforeSex">Aroused Before Sex</label>
              </b-col>
            </b-row>

            <b-row>
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
                <input type="checkbox" id="bred_differentSpecies" value="bred_differentSpecies"
                v-model="bred_checked">
              </b-col>
              <b-col md="auto">
                <label class="text-danger" for="bred_differentSpecies">Different Species</label>
              </b-col>
            </b-row>
            <b-form-group label="Sex Position" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                  id="bred_position"
                  v-model="bred_positionSelected"
                  :options="bred_positionOptions"
                  :aria-describedby="ariaDescribedby"
                  name="bred_position"
                ></b-form-radio-group>
            </b-form-group>
            <b-form-group label="Penetration Depth" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                  id="bred_penetrationDepth"
                  v-model="bred_penetrationDepthSelected"
                  :options="bred_penetrationDepthOptions"
                  :aria-describedby="ariaDescribedby"
                  name="bred_penetrationDepth"
                ></b-form-radio-group>
            </b-form-group>
            <b-form-group label="Wetness" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                  id="bred_wetness"
                  v-model="bred_wetnessSelected"
                  :options="bred_wetnessOptions"
                  :aria-describedby="ariaDescribedby"
                  name="bred_wetness"
                ></b-form-radio-group>
            </b-form-group>
          </b-card-body>
        </b-col>
        <b-col>
          <b-card-body>

            <b-row>
              <label for="bred_fertilityBonus">
                Fertility Bonus: {{bred_fertilityBonusValue}}
              </label>
              </b-row>
          <b-row>
              <b-form-input class="w-50" name="bred_fertilityBonus" id="bred_fertilityBonus"
                v-model="bred_fertilityBonusValue" type="range" min="0" max="50">
              </b-form-input>
            </b-row>

            <b-row>
              <label for="bred_fertilityAids">
                Fertility Aids: {{bred_fertilityAidsValue}}
              </label>
              </b-row>
          <b-row>
              <b-form-input class="w-50" name="bred_fertilityAids" id="bred_fertilityAids"
                v-model="bred_fertilityAidsValue" type="range" min="0" max="50">
              </b-form-input>
            </b-row>

            <b-row>
              <label for="bred_previousImpregnations">
                Previous Impregnations: {{bred_previousImpregnationsValue}}
              </label>
              </b-row>
          <b-row>
              <b-form-input class="w-50" name="bred_previousImpregnations"
                id="bred_previousImpregnations"
                v-model="bred_previousImpregnationsValue" type="range" min="0" max="50">
              </b-form-input>
            </b-row>

            <b-row>
              <label for="bred_fertilityBonus">
                Number of Orgasms: {{bred_numberOrgasmsValue}}
              </label>
              </b-row>
          <b-row>
              <b-form-input class="w-50" name="bred_numberOrgasms" id="bred_numberOrgasms"
              v-model="bred_numberOrgasmsValue" type="range" min="0" max="50">
              </b-form-input>
            </b-row>

            <b-row>
              <label for="bred_ovulationDrugs">
                Ovulation Drugs: {{bred_ovulationDrugsValue}}
              </label>
              </b-row>
          <b-row>
              <b-form-input class="w-50" name="bred_ovulationDrugs"
                id="bred_ovulationDrugs"
                v-model="bred_ovulationDrugsValue" type="range" min="0" max="50">
              </b-form-input>
            </b-row>
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
                <input type="checkbox" id="breeder_hasKnot"
                value="breeder_hasKnot" v-model="breeder_checked">
              </b-col>
              <b-col md="auto">
                <label for="breeder_hasKnot">Has Knot</label>
              </b-col>
            </b-row>
            <b-row>
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
                <input type="checkbox" id="breeder_inRut"
                value="breeder_inRut" v-model="breeder_checked">
              </b-col>
              <b-col md="auto">
                <label for="breeder_inRut">In Rut</label>
              </b-col>
            </b-row>
            <b-row>
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
                <input type="checkbox" id="breeder_extraFluids"
                  value="breeder_extraFluids" v-model="breeder_checked">
              </b-col>
              <b-col md="auto">
                <label for="breeder_extraFluids">Extra Fluids</label>
              </b-col>
            </b-row>
            <b-row>
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
                <input type="checkbox" id="breeder_lowSpermCount"
                value="breeder_lowSpermCount" v-model="breeder_checked">
              </b-col>
              <b-col md="auto">
                <label class="text-danger" for="breeder_lowSpermCount">Low Natural Sperm Count
                </label>
              </b-col>
            </b-row>
            <b-form-group label="Cumflation" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                  id="breeder_cumflation"
                  v-model="breeder_cumflationSelected"
                  :options="breeder_cumflationOptions"
                  :aria-describedby="ariaDescribedby"
                  name="breeder_cumflation"
                ></b-form-radio-group>
            </b-form-group>
          </b-card-body>
        </b-col>
        <b-col>
          <b-card-body>
            <row>
              <label for="breeder_virilityBonus">
                Virility Bonus: {{breeder_virilityBonusValue}}
              </label>
              <br/>
              <b-form-input class="w-50" name="breeder_virilityBonus" id="breeder_virilityBonus"
                v-model="breeder_virilityBonusValue" type="range" min="0" max="50">
              </b-form-input>
            </row>
            <br/>
            <row>
              <label for="breeder_virilityAids">
                Virility Aids: {{breeder_virilityAidsValue}}
              </label>
              <br/>
              <b-form-input class="w-50" name="breeder_virilityAids" id="breeder_virilityAids"
                v-model="breeder_virilityAidsValue" type="range" min="0" max="50">
              </b-form-input>
            </row>
            <br/>
            <row>
              <label for="breeder_numberOrgasms">
                Number of Orgasms: {{breeder_numberOrgasmsValue}}
              </label>
              <br/>
              <b-form-input class="w-50" name="breeder_numberOrgasms" id="breeder_numberOrgasms"
              v-model="breeder_numberOrgasmsValue" type="range" min="0" max="50">
              </b-form-input>
            </row>
            <br/>
            <row>
              <label class="text-danger" for="breeder_undefeatedContraceptives">
                Undefeated Contraceptives: {{breeder_undefeatedContraceptivesValue}}
              </label>
              <br/>
              <b-form-input class="w-50" name="breeder_undefeatedContraceptives"
                id="breeder_undefeatedContraceptives"
                v-model="breeder_undefeatedContraceptivesValue" type="range" min="0" max="50">
              </b-form-input>
            </row>
            <br/>
            <row>
              <label class="text-danger" for="breeder_defeatedContraceptives">
                Defeated Contraceptives: {{breeder_defeatedContraceptivesValue}}
              </label>
              <br/>
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
          <b-button disabled block v-b-tooltip.html title="Coming soon™!" variant="info"
          v-b-toggle.accordion-3 id="traitbutton">Choose Traits</b-button>
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
    <div id="charts" class="center">
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
        <b-row class="justify-content-md-center">
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
      <h2 class="text-center"><b-button size="lg" id="rollBreederButton"
              variant="dark"  @click="startPhaseOvu"
              v-b-toggle.accordion-ovu>
              GIMME THEM EGGIES
      </b-button></h2>
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
            <h2 class="text-center"><b-button size="lg" id="rollBreederButton"
              variant="dark"  @click="startPhaseFinal"
              v-b-toggle.accordion-final>
              GO TO FINAL
      </b-button></h2>
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
    </b-collapse>
    <br/>
    <br/>
    <br/>
    <br/>
  <footer class="text-center fixed-bottom">
    <b-card>
      <b-row align-h="center">
        <b-col md="auto">
          <b-icon icon="envelope"></b-icon>
        </b-col>
        <b-col md="auto">
          Questions? Comments? Concerns? Confusions? <a href="https://www.f-list.net/c/serv/">Send a note!</a>
        </b-col>
        <b-col md="auto">
          <b-icon icon="github"></b-icon>
        </b-col>
        <b-col md="auto">
          serverdingo
        </b-col>
      </b-row>
    </b-card>
  </footer>
  </div>
</template>
<script>
// import axios from 'axios';
import '../assets/dice.css';
import { calculateMods } from '../breed';

export default {
  name: 'Breed',
  data() {
    return {
      phase: 0,
      playerOptions: [],

      mods: {},

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

      bredChartOptions: {
        chart: {
          height: 350,
          type: 'radialBar',
          offsetY: -10,
        },
        colors: ['#4e0d8c'],
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
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
            startAngle: -135,
            endAngle: 135,
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
    /**
     * getMessage() {
      const path = 'http://localhost:5000/breed';
      axios.get(path)
        .then((res) => {
          this.msg = res.data;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    */
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

        this.playerRolls[matchups[i]].winner = winner;
        this.playerRolls[matchups[i]].bredCrit = bredCrit;
        this.playerRolls[matchups[i]].breederCrit = breederCrit;
      }
    },
  },
  created() {
    // this.getMessage();
  },
};

</script>

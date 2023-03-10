<template>
  <div class="container">
    <h1 class="text-center">Serv's Breeding Dice Game Thing</h1>
    <br/>
    <b-collapse id="accordion-settings" visible accordion="main-accordion" role="tabpanel">
    <h2 class="text-center">1. Set your settings</h2>
    <br>
    <!--todo: add save settings button?-->
    <div class="accordion" role="tablist">
      <!--    ____  _____  ______ _____
             |  _ \|  __ \|  ____|  __ \
             | |_) | |__) | |__  | |  | |
             |  _ <|  _  /|  __| | |  | |
             | |_) | | \ \| |____| |__| |
             |____/|_|  \_\______|_____/ -->
      <b-card w-25 no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="primary">Bred Options</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-row>
            <b-col>
          <b-card-body>
            <b-row v-for="checkbox in playerOptions.bred.checkboxes.formInfo"
              :key="checkbox.id">
              <b-col md="auto">
                <b-icon :id="`help-button-${checkbox.id}`" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip :target="`help-button-${checkbox.id}`" triggers="hover">
                  {{checkbox.helpText}}
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" :id="checkbox.id" :value="checkbox.id"
                v-model="playerOptions.bred.checkboxes.checked">
              </b-col>
              <b-col md="auto">
                <label v-if="!checkbox.bad" :for="checkbox.id">{{checkbox.label}}</label>
                <label v-else class="text-danger" :for="checkbox.id">
                  {{checkbox.label}}
                </label>
              </b-col>
            </b-row>

            <b-row v-for="radioGroup in playerOptions.bred.radioGroups"
              :key="radioGroup.id">
            <b-col md="auto">
                <b-icon :id="`help-button-${radioGroup.id}`" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip :target="`help-button-${radioGroup.id}`" triggers="hover">
                  {{radioGroup.helpText}}
                </b-tooltip>
              </b-col>
            <b-form-group :label="radioGroup.label" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                  :id="radioGroup.id"
                  v-model="radioGroup.selected"
                  :options="radioGroup.options"
                  :aria-describedby="ariaDescribedby"
                  :name="radioGroup.id"
                ></b-form-radio-group>
            </b-form-group>
          </b-row>
          </b-card-body>
        </b-col>
        <b-col>
          <b-card-body>
            <div v-for="range in playerOptions.bred.ranges"
              :key="range.id">
            <b-row>
              <b-col md="auto">
                <b-icon :id="`help-button-${range.id}`" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip :target="`help-button-${range.id}`" triggers="hover">
                  {{range.helpText}}
                </b-tooltip>
              </b-col>
              <label :for="range.id">
                {{range.label}}: {{range.value}}
              </label>
              </b-row>
              <b-form-input class="w-50" :name="range.id" :id="range.id"
                v-model="range.value" type="range" :min="range.min" :max="range.max">
              </b-form-input>
            </div>
          </b-card-body>
        </b-col>
      </b-row>
        </b-collapse>
      </b-card>
      <!--  ____  _____  ______ ______ _____  ______ _____
           |  _ \|  __ \|  ____|  ____|  __ \|  ____|  __ \
           | |_) | |__) | |__  | |__  | |  | | |__  | |__) |
           |  _ <|  _  /|  __| |  __| | |  | |  __| |  _  /
           | |_) | | \ \| |____| |____| |__| | |____| | \ \
           |____/|_|  \_\______|______|_____/|______|_|  \_\ -->
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="danger">Breeder Options</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-row>
            <b-col>
          <b-card-body>
              <b-row v-for="checkbox in playerOptions.breeder.checkboxes.formInfo"
              :key="checkbox.id">
              <b-col md="auto">
                <b-icon :id="`help-button-${checkbox.id}`" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip :target="`help-button-${checkbox.id}`" triggers="hover">
                  {{checkbox.helpText}}
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" :id="checkbox.id" :value="checkbox.id"
                v-model="playerOptions.breeder.checkboxes.checked">
              </b-col>
              <b-col md="auto">
                <label v-if="!checkbox.bad" :for="checkbox.id">{{checkbox.label}}</label>
                <label v-else class="text-danger" :for="checkbox.id">
                  {{checkbox.label}}
                </label>
              </b-col>
            </b-row>
            <b-row v-for="radioGroup in playerOptions.breeder.radioGroups"
              :key="radioGroup.id">
            <b-col md="auto">
                <b-icon :id="`help-button-${radioGroup.id}`" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip :target="`help-button-${radioGroup.id}`" triggers="hover">
                  {{radioGroup.helpText}}
                </b-tooltip>
              </b-col>
              <b-form-group :label="radioGroup.label" v-slot="{ ariaDescribedby }">
                <b-form-radio-group
                    :id="radioGroup.id"
                    v-model="radioGroup.selected"
                    :options="radioGroup.options"
                    :aria-describedby="ariaDescribedby"
                    :name="radioGroup.id"
                  ></b-form-radio-group>
              </b-form-group>
            </b-row>
          </b-card-body>
        </b-col>
        <b-col>
          <b-card-body>
            <div v-for="range in playerOptions.breeder.ranges"
              :key="range.id">
            <b-row>
              <b-col md="auto">
                <b-icon :id="`help-button-${range.id}`" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip :target="`help-button-${range.id}`" triggers="hover">
                  {{range.helpText}}
                </b-tooltip>
              </b-col>
              <label v-if="range.bad" class="text-danger" :for="range.id">
                {{range.label}}: {{range.value}}
              </label>
              <label v-else :for="range.id">
                {{range.label}}: {{range.value}}
              </label>
              </b-row>
              <b-form-input class="w-50" :name="range.id" :id="range.id"
                v-model="range.value" type="range" :min="range.min" :max="range.max">
              </b-form-input>
            </div>
          </b-card-body>
        </b-col>
      </b-row>
      </b-collapse>
      </b-card>
      <!--  _______ _____            _____ _______ _____
           |__   __|  __ \     /\   |_   _|__   __/ ____|
              | |  | |__) |   /  \    | |    | | | (___
              | |  |  _  /   / /\ \   | |    | |  \___ \
              | |  | | \ \  / ____ \ _| |_   | |  ____) |
              |_|  |_|  \_\/_/    \_\_____|  |_| |_____/ --->
      <b-card no-body class="mb-1" id="traitcard">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block variant="info"
          v-b-toggle.accordion-3 id="traitbutton">Choose Traits</b-button>
        </b-card-header>
        <!-- TODO: add traits functionality -->
        <b-collapse id="accordion-3" accordion="my-accordion"
        v-b-tooltip.html role="tabpanel">
      <div class="column" border-variant="danger">
        <b-card-group deck>
          <b-card
          border-variant="primary"
          header="Bred Traits"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center">
            <b-row v-for="trait in traits.bredTraits" :key="trait.id">
              <b-col md="auto">
                <b-icon :id="`help-button-${trait.traitId}`" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip :target="`help-button-${trait.traitId}`" triggers="hover">
                  {{trait.description}}
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" :id="trait.traitId"
                :value="trait.traitId" v-model="playerOptions.selectedTraits.bred">
              </b-col>
              <b-col md="auto">
                <label :for="trait.traitId">{{trait.name}}</label>
              </b-col>
            </b-row>
          </b-card>
          <b-card
          border-variant="danger"
          header="Breeder Traits"
          header-bg-variant="danger"
          header-text-variant="white"
          align="center">
            <b-row v-for="trait in traits.breederTraits" :key="trait.id">
              <b-col md="auto">
                <b-icon :id="`help-button-${trait.traitId}`" icon="question-circle-fill"
                aria-label="Help" font-scale=".8">
                </b-icon>
                <b-tooltip :target="`help-button-${trait.traitId}`" triggers="hover">
                  {{trait.description}}
                </b-tooltip>
              </b-col>
              <b-col md="auto">
                <input type="checkbox" :id="trait.traitId"
                :value="trait.traitId" v-model="playerOptions.selectedTraits.breeder">
              </b-col>
              <b-col md="auto">
                <label :for="trait.traitId">{{trait.name}}</label>
              </b-col>
            </b-row>
          </b-card>
        </b-card-group>
      </div>
        </b-collapse>
      </b-card>
      <b-row class="justify-content-md-center">
        <b-col class="text-center">
          <b-button size="sm" id="initialSaveButton"
                variant="dark"  @click="saveData">
                Save Settings
          </b-button>
          <b-button size="sm" id="initialLoadButton"
                variant="dark"  @click="loadData">
                Load Settings
          </b-button>
          <b-button size="sm" id="initialClearButton"
                variant="dark"  @click="clearData">
                Delete Saved Settings
          </b-button>
        </b-col>
      </b-row>
      <b-row class="justify-content-md-center" :key="saveKey">
        <br/>
        {{saveMessage}}
      </b-row>
    </div><br>

    <!--  _____   ____  _      _       _____
         |  __ \ / __ \| |    | |     / ____|
         | |__) | |  | | |    | |    | (___
         |  _  /| |  | | |    | |     \___ \
         | | \ \| |__| | |____| |____ ____) |
         |_|  \_\\____/|______|______|_____/ -->
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
            <b-form-input class="w-25 text-center" :id="die.bredId"
            v-for="(die, idx) in playerRolls"
            type="number" :key="idx" :value="die.bredValue" pattern="\d+"
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
            <b-form-input class="w-25 text-center" :id="die.breederId"
            v-for="(die, idx) in playerRolls"
            type="number" :key="idx" :value="die.breederValue" pattern="\d+"
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
            v-for="(die, idx) in playerRolls" :key="idx">
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
            v-for="(result, idx) in playerRolls" :key="idx">
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
          v-for="(die, idx) in playerRolls" :key="idx">
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
          <b-img v-if="phase===1" src="https://static.f-list.net/images/eicon/missionfailed.gif"
          fluid alt="Mission Failed">
          </b-img>
        </b-col>
        <b-col md="auto">
          <h1 class="text-primary" align-self="center"><br/>Impregnation Failed...</h1>
        </b-col>
        <b-col md="auto">
          <b-img v-if="phase===1" src="https://static.f-list.net/images/eicon/missionfailed.gif"
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
          <b-img v-if="phase===1" src="https://static.f-list.net/images/eicon/wombknot2.gif"
          style="transform: scaleX(-1);" fluid alt="Preggo R2">
          </b-img>
          <b-img v-if="phase===1" src="https://static.f-list.net/images/eicon/wombknot1.gif"
          style="transform: scaleX(-1);" fluid alt="Preggo R1">
          </b-img>
        </b-col>
        <b-col md="auto">
          <h1 v-if="phase===1" class="text-danger" align-self="center">
            <br/>Impregnation Successful
          </h1>
        </b-col>
        <b-col md="auto">
          <b-img v-if="phase===1" src="https://static.f-list.net/images/eicon/wombknot1.gif" fluid alt="Preggo R1">
          </b-img>
          <b-img v-if="phase===1" src="https://static.f-list.net/images/eicon/wombknot2.gif" fluid alt="Preggo R2">
          </b-img>
        </b-col>
      </b-row>
      <br/>
      <b-row v-if="phase>=1"  class="justify-content-md-center">

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
      <div v-if="eggs.count <= 0 && phase >=2">
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
          <!-- TODO: add more fun egg shit/flourishes/flavor -->
        </b-row>
        <br/>
        <b-row v-if="phase>=2" class="justify-content-md-center">
          <!-- TODO: add option to continue as normal, or go through the fert process slowly
                     and watch each result one at a time. Perhaps only
                     if under 100 eggs or something. -->
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
                <b-col md="auto">
                  <b-img src="https://static.f-list.net/images/eicon/omnifertile.gif" fluid alt="omnifert">
                  </b-img>
                </b-col>
                <b-col md="auto">
                  You made&nbsp;<h2><b class="text-danger">{{babies.length}}</b></h2>&nbsp;babies
                  from&nbsp;<h2><b class="text-primary">{{eggs.count}}</b></h2>&nbsp;eggs!
                </b-col>
                <b-col md="auto">
                  <b-img src="https://static.f-list.net/images/eicon/omnifertile.gif" fluid alt="omnifert">
                  </b-img>
                </b-col>
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
    <div v-if="phase>=3">
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
          <b-row class="justify-content-md-center">
            <b-col class="text-center">
              <b-button size="sm" id="finalSaveButton"
                    variant="dark"  @click="saveData">
                    Save Settings
              </b-button>
            </b-col>
          </b-row>
          <b-row class="justify-content-md-center">
            {{saveMessage}}
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
      traits: {
        bredTraits: [
          {
            name: 'Natural Born Milf',
            traitId: 'natBornMilf',
            description: 'During initial pregnancy check, crit fails are counted as 2\'s or lower (instead of 1\'s), and for ovulation check count crit fails as adding 2d3 eggs instead of 1d3',
          },
          {
            name: 'Clueless Breeder',
            traitId: 'cluelessBreeder',
            description: 'During Initial pregnancy check, add a +1 modifier to the breeder\'s rolls and a -1 modifier to the bred\'s rolls.',
          },
          {
            name: 'Corrupted Womb',
            traitId: 'corruptedWomb',
            description: 'During Initial pregnancy check, ignore modifiers for different species for both bred and breeder. Also, bred must re-roll any modified results over 1 during initial pregnancy check',
          },
          {
            name: 'Corrupted Ovaries',
            traitId: 'corruptedOvaries',
            description: 'During initial pregnancy check, adds +2 to breeder\'s rolls. Every crit from the breeder adds an extra side of die to the ovulation check (IE 3 crits is d6, 5 crits is d8). Litter size may be capped at a number determined by the breeder and distributed among multiple litters.',
          },
          {
            name: 'Overactive Ovaries',
            traitId: 'overactiveOvaries',
            description: 'During Initial pregnancy check, bred gains an additional -1 roll modifier on all rolls if there\'s cervical penetration or flooded ovaries. During Ovulation check, roll d6\'s instead of d3\'s for egg count.',
          },
          {
            name: 'Tight Cervix',
            traitId: 'tightCervix',
            description: 'If cervical penetration occurs, an additional -1 is taken from bred\'s rolls during impregnation check. In addition, during fertilization check, breeder gains +2 to rolls.',
          },
        ],
        breederTraits:
        [
          {
            name: 'Natural Born Stud',
            traitId: 'naturalBornStud',
            description: 'During initial pregnancy check, add +2 to all non crit rolls for the breeder. And on any crit roll, roll another die (Extra crits for Fertilization check)',
          },
          {
            name: 'Domineering Seed',
            traitId: 'domineeringSeed',
            description: 'During initial pregnancy check, on any crit roll, subtract the amount over 10 for the breeder\'s result from the bred\'s result. Any natural roll of 10 also adds 1d3 eggs to opponent\'s ovulation check',
          },
          {
            name: 'Deep Insemination',
            traitId: 'deepInsemination',
            description: 'During initial pregnancy check, have a +2 modifier instead of +1 for cervical penetration. Every time you crit during initial pregnancy check, bred will reroll their opposing roll and take the lower for that check',
          },
          {
            name: 'Potent Virility',
            traitId: 'potentVirility',
            description: 'During initial pregnancy check, \'Virility Bonus\' grants a +2 modifier per unit instead of +1. During Fertilization check, instead of only occurring on a natural 100, any natural 90+ is now automatically a twin - and the bonus roll for a chance at twins or more is now attempted on a natural roll of 80+ instead of 90+.',
          },
        ],
        secretTraits: [
          // 👀
        ],
      },

      playerOptions: {
        bred: {
          checkboxes: {
            checked: [],
            formInfo: [
              {
                id: 'inHeat',
                label: 'In Heat',
                helpText: 'Big boost to eggs ovulated and fertility.',
                bad: false,
              },
              {
                id: 'desireForImpreg',
                label: 'Strong Desire for Impregnation',
                helpText: 'Boosts fertility. They know what they want. Now give it to them.',
                bad: false,
              },
              {
                id: 'arousedBeforeSex',
                label: 'Aroused Before Sex',
                helpText: 'They don\'t need any convincing. They\'re already yours... Lowers bred\'s chance to resist impregnation.',
                bad: false,
              },
              {
                id: 'lowFertility',
                label: 'Low Innate Fertility',
                helpText: 'Naturally barren? Cursed? Whatever the reason, this oven has some issues. Hopefully you can fix that.~',
                bad: true,
              },
              {
                id: 'differentSpecies',
                label: 'Different Species',
                helpText: 'Differing genetics makes it a bit more difficult to conceive... (Note: Play however you want, but I\'d suggest keeping it "high-level" like "canines" vs. "wolf/dingo" etc.)',
                bad: true,
              },
            ],
          },
          ranges: {
            fertilityBonus: {
              id: 'fertilityBonus',
              label: 'Fertility Bonus',
              helpText: 'Someone\'s innate fertility. This is usually achieved either naturally or through some permanent enhancement or modification to the one being bred.',
              min: 0,
              max: 50,
              value: 0,
            },
            fertilityAids: {
              id: 'fertilityAids',
              label: 'Fertility Aids',
              helpText: 'A temporary boost to bred\'s fertility or ability to conceive. Pills, potions, medicine, energy boosts - things like that!',
              min: 0,
              max: 50,
              value: 0,
            },
            previousImpregnations: {
              id: 'previousImpregnations',
              label: 'Previous Impregnations',
              helpText: 'Those who have had previous experience baking buns in their oven will find it a bit easier to conceive with every successive pregnancy.',
              min: 0,
              max: 50,
              value: 0,
            },
            numberOrgasms: {
              id: 'numberOrgasms',
              label: 'Number of Orgasms',
              helpText: 'Not only does every orgasm help milk the stud of their seed, but is said to also stimulate the ovaries to release their bounty.',
              min: 0,
              max: 50,
              value: 0,
            },
            ovulationDrugs: {
              id: 'ovulationDrugs',
              label: 'Ovulation Drugs',
              helpText: 'Drugs/stimulants given to the one being bred that result in the womb\'s ovaries releasing more and more precious ova for the breeder\'s seed to claim.',
              min: 0,
              max: 50,
              value: 0,
            },
          },
          radioGroups: {
            sexPosition: {
              id: 'sexPosition',
              label: 'Sex Position',
              helpText: 'Getting the right angle helps make sure that seed gets where it needs to so it can work its magic.',
              options: [
                { text: 'Doggy Style', value: 'doggyStyle' },
                { text: 'Mating Press', value: 'matingPress' },
                { text: 'Other', value: 'other' },
              ],
              selected: 'other',
            },
            penetrationDepth: {
              id: 'penetrationDepth',
              label: 'Penetration Depth',
              helpText: 'Conceiving is a bit easier if you give that spunk a one way trip to those egg factories.',
              options: [
                { text: 'Normal', value: 'normal' },
                { text: 'Cervical Penetration', value: 'cervicalPen' },
                { text: 'Flooded Ovaries', value: 'floodedOvaries' },
              ],
              selected: 'normal',
            },
            wetness: {
              id: 'wetness',
              label: 'Wetness',
              helpText: 'While wetness may not <i>directly</i> boost fertility, the lack of \'friction\' can only serve to help.~',
              options: [
                { text: 'None/Lube Needed', value: 'none' },
                { text: 'Dripping', value: 'dripping' },
                { text: 'Constant Stream', value: 'constantStream' },
              ],
              selected: 'none',
            },
          },
        },
        breeder: {
          checkboxes: {
            checked: [],
            formInfo: [
              {
                id: 'hasKnot',
                label: 'Has Knot',
                helpText: 'A nice plump bulb at the end of the shaft to keep that seed locked firmly in place. Need I say more?',
                bad: false,
              },
              {
                id: 'hasBarbs',
                label: 'Has Barbs/Penile Spines',
                helpText: 'Each rake of those spines along the tight walls of the one being bred sends signals to the ovaries that a true stud is about to deliver their payload.',
                bad: false,
              },
              {
                id: 'inRut',
                label: 'In Rut',
                helpText: 'A special time in which the breeder\'s virility and almost primal drive to breed is drastically increased. Watch out: it\'s mating season...',
                bad: false,
              },
              {
                id: 'cameMoreThanOnce',
                label: 'Came > 1 time in who was bred',
                helpText: '"You think you\'re good and bred, huh? Let\'s go again. Y\'know... Just to be sure.~"',
                bad: false,
              },
              {
                id: 'extraFluids',
                label: 'Extra Fluids',
                helpText: 'All that slick belching from the tip of that spire really helps for making sure the breeder can get themselves as far in as they can possibly get.',
                bad: false,
              },
              {
                id: 'extendedPenetration',
                label: 'Extended Penetration Duration',
                helpText: '"Woah woah woah, where you going? I tied - we ain\'t going anywhere. Guess we have no choice but to let that baby gravy brew and churn in that womb of yours.~"',
                bad: false,
              },
              {
                id: 'lowSpermCount',
                label: 'Low Natural Sperm Count',
                helpText: 'Not quite shooting blanks, but the breeder has quite a few less tadpoles in each load than the average stud.',
                bad: true,
              },
            ],
          },
          ranges: {
            virilityBonus: {
              id: 'virilityBonus',
              label: 'Virility Bonus',
              helpText: 'The breeder\'s natural virility. For whatever reason, this stud was born for making babies. Let\'s just hope they don\'t get even better at it as they go...',
              min: 0,
              max: 50,
              value: 0,
            },
            virilityAids: {
              id: 'virilityAids',
              label: 'Virility Aids',
              helpText: '"Virilify-2000 - Serving size: 1 pill, huh? Fuck that. I say Serving size: 1 bottle. Increase as needed. Doctor\'s orders.~"',
              min: 0,
              max: 50,
              value: 0,
            },
            numberOrgasms: {
              id: 'breederNumberOrgasms',
              label: 'Number of Orgasms',
              helpText: 'If you thought that first wave of gravy made a lot of pups, you\'re in for a wild ride. They\'re just getting started...',
              min: 0,
              max: 50,
              value: 0,
            },
            undefeatedContraceptives: {
              id: 'undefeatedContraceptives',
              label: 'Undefeated Contraceptives',
              helpText: 'Whether it\'s birth control, plan B, spermicidal lube, or a good ol\' rubber - something\'s trying to keep the breeder from doing what he does best. "Trying", of course, being the key word.~',
              min: 0,
              max: 50,
              value: 0,
              bad: true,
            },
            defeatedContraceptives: {
              id: 'defeatedContraceptives',
              label: 'Defeated Contraceptives',
              helpText: 'Maybe the condom ripped, or that birth control was expired/was ineffective. Better than nothing for stopping a pregnancy, but drastically less effective than the user probably would\'ve hoped...',
              min: 0,
              max: 50,
              value: 0,
              bad: true,
            },
          },
          radioGroups: {
            cumflation: {
              id: 'cumflation',
              label: 'Cumflation',
              helpText: '"Goddamn, you look pregnant already. And if I didn\'t know better, I\'d think you were already starting to swell.~ Can\'t wait to see how you look in 9 months from now..."',
              options: [
                { text: 'None', value: 'none' },
                { text: 'Paunch', value: 'paunch' },
                { text: 'Pregnant-like', value: 'pregnantLike' },
                { text: 'Overflowing', value: 'overflowing' },
              ],
              selected: 'none',
            },
          },
        },
        selectedTraits: {
          bred: [],
          breeder: [],
          secret: [],
        },
      },

      // Variables used for the save functionality.
      // saveKey is needed to force component update
      saveMessage: '',
      saveKey: 0,

      phase: 0,

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
    rerollKeepLowest(originalRoll) {
      const dice = {
        sides: 10,
        roll() {
          const randomNumber = Math.floor(Math.random() * this.sides) + 1;
          return randomNumber;
        },
      };
      const reroll = dice.roll();
      return (reroll >= originalRoll)
        ? originalRoll
        : reroll;
    },
    startPhaseImpreg() {
      this.phase = 1;
      this.saveMessage = '';
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

      const bredTraits = this.playerOptions.selectedTraits.bred;
      const breederTraits = this.playerOptions.selectedTraits.breeder;

      for (let i = 0; i < matchups.length; i += 1) {
        this.playerRolls[matchups[i]].bredCalcValue = this.playerRolls[matchups[i]].bredValue
          + this.mods.bred_mod;
        this.playerRolls[matchups[i]].breederCalcValue = this.playerRolls[matchups[i]].breederValue
          + this.mods.breeder_mod;

        let bred = this.playerRolls[matchups[i]].bredCalcValue;
        let breeder = this.playerRolls[matchups[i]].breederCalcValue;

        let winner = 'tie';
        let bredCrit = 'none';
        let breederCrit = 'none';
        let breederBonusCrit = false;

        // If breeder didn't crit - naturalBornStud procs
        if (breederTraits.includes('naturalBornStud') && breeder < 10) {
          breeder += 2;
        }

        // Reroll bred's roll if modded value is over 1 and has corruptedWomb - keep lowest
        // TODO: add flourish to "VS." results indicating a reroll happened
        if (bredTraits.includes('corruptedWomb') && bred > 1) {
          const reroll = this.rerollKeepLowest(this.playerRolls[matchups[i]].bredValue);
          bred = reroll + this.mods.bred_mod;
          // I have no idea if this is pass by reference or value, cuz JS,
          // so set it again just in case...
          this.playerRolls[matchups[i]].bredCalcValue = bred;
        }

        // Reroll bred's roll if breeder crit and has deepInsemination
        // TODO: add flourish to "VS." results indicating a reroll happened
        if (breederTraits.includes('deepInsemination') && breeder >= 10) {
          const reroll = this.rerollKeepLowest(this.playerRolls[matchups[i]].bredValue);
          bred = reroll + this.mods.bred_mod;
          // I have no idea if this is pass by reference or value, cuz JS,
          // so set it again just in case...
          this.playerRolls[matchups[i]].bredCalcValue = bred;
        }

        // If domineeringSeed is active, subtract anything over 10 for breeder from bred
        if (breederTraits.includes('domineeringSeed') && breeder > 10) {
          bred -= breeder - 10;
          this.playerRolls[matchups[i]].bredCalcValue = bred;
        }

        if (bred !== breeder) {
          winner = (bred > breeder) ? 'bred' : 'breeder';
          if (breeder >= 10) { // TODO: make these global constants for easy tweaking
            breederCrit = (breeder >= 20) ? 'double' : 'single';
            // Grant a bonus crit if naturalBornStud is active
            breederBonusCrit = breederTraits.includes('naturalBornStud');
          }
          if ((bredTraits.includes('natBornMilf') && bred <= 2) || bred <= 1) {
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
        this.playerRolls[matchups[i]].breederBonusCrit = breederBonusCrit;
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

    saveData() {
      window.localStorage.setItem('playerOptions', JSON.stringify(this.playerOptions));
      this.saveMessage = '💾 Data Saved 💾';
    },

    loadData() {
      const loadedOptions = JSON.parse(window.localStorage.getItem('playerOptions'));
      if (loadedOptions !== null) {
        this.playerOptions = loadedOptions;
        this.saveMessage = '✔ Data Loaded! ✔';
      } else {
        this.saveMessage = 'Ain\'t no saved data to load. 🤷';
      }
    },
    clearData() {
      if (window.localStorage.getItem('playerOptions') === null) {
        this.saveMessage = 'No saved data to delete. So... done? 🤔';
      } else {
        window.localStorage.removeItem('playerOptions');
        this.saveMessage = 'Saved data deleted. 👋';
      }
      this.saveKey += 1;
    },
  },
  created() {
    // nothing
  },
};
</script>

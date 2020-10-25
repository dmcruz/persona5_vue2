<template>
  <div class="home">
    
    <a-space>
    <a-input v-model.lazy="filterText"/>
    <a-button type="primary" v-on:click="onSearch">Filter</a-button>
    <a-button type="secondary" v-on:click="onClear">Clear</a-button>
    </a-space>
    <br /><br />
    <div class="content">
      <a-row type="flex">
        <a-col flex="550px" class="header-group">
          Persona
        </a-col>
        <a-col flex="290px" class="header-group">
          Stats
        </a-col>
        <a-col flex="auto" class="header-group">
          Resistance
        </a-col>
      </a-row>
      <a-row class="header" type="flex" justify="space-between">
        <a-col flex="50px" class="headerleftAlign">
          Lvl
        </a-col>
        <a-col flex="200px" class="leftAlign">
          Name
        </a-col>
        <a-col flex="100px" class="leftAlign">
          Arcana
        </a-col>
        <a-col flex="100px" class="leftAlign">
          Trait
        </a-col>
        <a-col flex="60px">
          Inherits
        </a-col>
        <a-col flex="50px" v-for="(attr) in statAttributes" :key="'stat-' + attr">
          {{attr}}
        </a-col>
        <a-col flex="50px" v-for="(attr) in elemAttributes" :key="'elem-' + attr.text" class="tooltip">
          <div :class="attr.icon">
            <span class="tooltiptext">
              {{attr.text}}
            </span>
          </div>
        </a-col>
      </a-row>
      <a-row class="row leftAlign" v-for="(item, index) in paginate(list)" :class="index % 2 === 0 ? 'darkRow' : 'alterRow'" :key="item.name" type="flex" justify="space-between">
        <a-col flex="50px">
          {{ item.level }}
        </a-col>
        <a-col flex="200px">
          {{ item.name }}
        </a-col>
        <a-col flex="100px">
          {{ item.arcana }}
        </a-col>
        <a-col flex="100px">
          {{ item.trait }}
        </a-col>
        <a-col flex="60px" class="centerAlign">
          <div :class="getAffinityIcon(item.inherits)" class="tooltip">
            <span class="tooltiptext">
              {{item.inherits}}
            </span>
          </div>
        </a-col>
        
        <a-col flex="50px" v-for="(stat) in item.stats" class="centerAlign">
          {{ stat }}
        </a-col>

        <a-col flex="50px" v-for="(elem) in item.elems" :class="getResistCss(elem)">
          {{ elem }}
        </a-col>
      </a-row>

      <a-pagination show-quick-jumper 
        show-size-changer
        :defaultPageSize="this.pageSize"
        :pageSizeOptions="['10', '25', '50', '100']"
        :total="this.list.length" @change="onPageChange" 
        @showSizeChange="onShowSizeChange"/>


    </div>
  </div>
</template>

<script>
import persona5DataRoyal from '../data/PersonaDataRoyal.js';
import getPersonaAsList from '../utils/TransformUtils.js';

export default {
  data: () => ({
    filterText: '',
    currentPage: 1,
    pageSize: 50,
    list: getPersonaAsList(persona5DataRoyal),

    headerAttributes: [ "lvl", "persona", "arcana", "inherits", "stats", "elems"],
    personaAttributes: [ "level", "persona", "inherits", "item", "rare item",
      "arcana", "trait", "elems", "stats", "skills"],
    statAttributes: ["ST", "MA", "EN", "AG", "LU"],
    elemAttributes: [{ text: "Physical", icon: "ico-elem-mini ico-elem-phys"},
      { text: "Gun", icon: "ico-elem-mini ico-elem-gun" },
      { text: "Fire", icon: "ico-elem-mini ico-elem-fire" },
      { text: "Ice", icon: "ico-elem-mini ico-elem-ice" }, 
      { text: "Electricity", icon: "ico-elem-mini ico-elem-elec" },
      { text: "Wind", icon: "ico-elem-mini ico-elem-wind" },
      { text: "Psychokinesis", icon: "ico-elem-mini ico-elem-psy" }, 
      { text: "Nuclear", icon: "ico-elem-mini ico-elem-nuke" },
      { text: "Bless", icon: "ico-elem-mini ico-elem-bless" }, 
      { text: "Curse", icon: "ico-elem-mini ico-elem-curse" }]
  }),
  mounted() {
    this.paginate(this.list);
  },
  methods: {
    getAffinityIcon(affinity) {
      return `ico-elem ico-elem-${affinity}`;
    },
    getResistCss(elem) {
      return `resist resist-${elem}`;
    },
    onShowSizeChange(current, pageSize) {
      this.currentPage = current;
      this.pageSize = pageSize;
      this.paginate(this.list);
    },
    onPageChange(page, pageSize) {
      this.currentPage = page;
      this.pageSize = pageSize;
      this.paginate(this.list);
    },
    paginate(array) {
      return array.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    },
    filter(text) {
      text = text.toLowerCase();
      var filteredResult = this.filterByFields(text);
      this.list = this.paginate(filteredResult);
    },
    filterByFields(text) {
      return this.list.filter(function(item){
        return item.name.toLowerCase().indexOf(text) > -1
          || item.arcana.toLowerCase().indexOf(text) > -1
          || item.trait.toLowerCase().indexOf(text) > -1
          || item.inherits.toLowerCase().indexOf(text) > -1;
      });
    },
    onSearch(event) {
      this.list = getPersonaAsList(persona5DataRoyal);
      this.filter(this.filterText);
    },
    onClear(event) {
      this.filterText = "";
      this.list = getPersonaAsList(persona5DataRoyal);
    }
  },
};
</script>
<style scoped>
.header-group {
  background-color: #e13026;
  color: white;
  font-weight: bold;
  margin: 1px;
  border: 1px thin #fff;
}
.header {
  font-weight:bold;
  text-transform:capitalize;
  background-color: #e13026;
  background-position: center;
  color: white;
  text-align: center;
  margin: 0px 1px 1px 1px;
}
.header-small {
  font-size: xx-small;
  text-transform: lowercase;
}
.content {
  margin: auto;
  width: 90%;
}
.alterRow {
  background-color: #333;
}
.leftAlign {
  text-align: left;
}
.centerAlign {
  text-align: center;
}
.tooltip {
  position: relative;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 80px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  font-size: x-small;
  
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.ico-elem-mini {
  height: 25px;
  width: 25px;
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: center;
}

.ico-elem {
  height: 23px;
  width: 60px;
  background-repeat: no-repeat;
  background-color: transparent;
  margin: 2px 2px 2px 2px;
  background-position: center;
}
.ico-elem-almighty {
  background-image: url("/images/icons/almighty.png");
}
.ico-elem-ailment {
  background-image: url("/images/icons/ailment.png");
}
.ico-elem-bless {
  background-image: url("/images/icons/bless.png");
}
.ico-elem-curse {
  background-image: url("/images/icons/curse.png");
}
.ico-elem-elec {
  background-image: url("/images/icons/electric.png");
}
.ico-elem-fire {
  background-image: url("/images/icons/fire.png");
}
.ico-elem-gun {
  background-image: url("/images/icons/gun.png");
}
.ico-elem-healing {
  background-image: url("/images/icons/healing.png");
}
.ico-elem-ice {
  background-image: url("/images/icons/ice.png");
}
.ico-elem-nuke {
  background-image: url("/images/icons/nuclear.png");
}
.ico-elem-passive {
  background-image: url("/images/icons/passive.png");
}
.ico-elem-phys {
  background-image: url("/images/icons/phys.png");
}
.ico-elem-psy {
  background-image: url("/images/icons/psy.png");
}
.ico-elem-support {
  background-image: url("/images/icons/support.png");
}
.ico-elem-wind {
  background-image: url("/images/icons/wind.png");
}

.resist {
  font-weight: bold;
}
.resist-wk {
  color: red;
}
.resist-rs {
  color: orange;
}
.resist-nu {
  color: yellow;
}
.resist-rp {
  color: lightgreen;
}
.resist-ab {
  color: lightskyblue;
}
</style>
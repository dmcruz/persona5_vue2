<template>
  <div class="home">
    
    <a-space>
    <a-input v-model.lazy="filterText"/>
    <a-button type="primary" v-on:click="onSearch">Filter</a-button>
    <a-button type="secondary" v-on:click="onClear">Clear</a-button>
    </a-space>
    <br /><br />
    <div class="content">
      <a-row type="flex" class="header-group">
        <a-col flex="434px" class="tableBorderRightHead">
          Persona
        </a-col>
        <a-col flex="187px" class="tableBorderRightHead">
          Stats
        </a-col>
        <a-col flex="auto">
          Resistance
        </a-col>
      </a-row>
      <a-row class="header" type="flex" justify="space-between">
        <a-col flex="30px" class="headerleftAlign">
          Lvl
        </a-col>
        <a-col flex="150px" class="leftAlign">
          Name
        </a-col>
        <a-col flex="100px" class="leftAlign">
          Arcana
        </a-col>
        <a-col flex="68px" class="tableBorderRightHead">
          Inherits
        </a-col>
        <a-col flex="29px" v-for="(attr) in statAttributes" :key="'stat-' + attr">
          {{attr}}
        </a-col>
        <a-col flex="50px" v-for="(attr, index) in elemAttributes" :key="'elem-' + attr.text"  :class="index == 0? 'tableBorderLeftHead tooltip' : 'tooltip'">
          <div style="width: 100%" :class="attr.icon">
            <span class="tooltiptext">
              {{attr.text}}
            </span>
          </div>
        </a-col>
      </a-row>
      <a-row class="row leftAlign" v-for="(item, index) in paginate(list)" :class="index % 2 === 0 ? 'darkRow' : 'alterRow'" :key="item.name" type="flex" justify="space-between">
        <a-col flex="30px" class="centerAlign">
          {{ item.level }}
        </a-col>
        <a-col flex="150px">
          {{ item.name }}
        </a-col>
        <a-col flex="100px">
          {{ item.arcana }}
        </a-col>
        <a-col flex="68px" class="centerAlign tableBorderRight">
          <div :class="getAffinityIcon(item.inherits)" class="tooltip">
            <span class="tooltiptext">
              {{item.inherits}}
            </span>
          </div>
        </a-col>
        
        <a-col flex="29px" v-for="(stat) in item.stats" class="centerAlign">
          {{ stat }}
        </a-col>

        <a-col flex="50px" v-for="(elem, index) in item.elems" :class="index === 0 ? 'tableBorderLeft ' + getResistCss(elem) : getResistCss(elem)"> 
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
      { text: "Electric", icon: "ico-elem-mini ico-elem-elec" },
      { text: "Wind", icon: "ico-elem-mini ico-elem-wind" },
      { text: "Psy", icon: "ico-elem-mini ico-elem-psy" }, 
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
.tableBorderRightHead {
  border-right: 1px solid #000
}
.tableBorderLeftHead {
  border-left: 1px solid #000
}

.tableBorderRight {
  border-right: 1px solid #000
}
.tableBorderLeft {
  border-left: 1px solid #000
}

.header-group {
  background-color: #e13026;
  color: white;
  font-weight: bold;
  margin: 1px;
  border-right: 1px thin #fff;
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
  width: 60px;
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
  margin-left: -40px;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

img.ico-elem-mini {
  size: 25px 25px;
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
  background-image: url("/persona5_vue2/images/icons/almighty.png");
}
.ico-elem-ailment {
  background-image: url("/persona5_vue2/images/icons/ailment.png");
}
.ico-elem-bless {
  background-image: url("/persona5_vue2/images/icons/bless.png");
}
.ico-elem-curse {
  background-image: url("/persona5_vue2/images/icons/curse.png");
}
.ico-elem-elec {
  background-image: url("/persona5_vue2/images/icons/electric.png");
}
.ico-elem-fire {
  background-image: url("/persona5_vue2/images/icons/fire.png");
}
.ico-elem-gun {
  background-image: url("/persona5_vue2/images/icons/gun.png");
}
.ico-elem-healing {
  background-image: url("/persona5_vue2/images/icons/healing.png");
}
.ico-elem-ice {
  background-image: url("/persona5_vue2/images/icons/ice.png");
}
.ico-elem-nuke {
  background-image: url("/persona5_vue2/images/icons/nuclear.png");
}
.ico-elem-passive {
  background-image: url("/persona5_vue2/images/icons/passive.png");
}
.ico-elem-phys {
  background-image: url("/persona5_vue2/images/icons/phys.png");
}
.ico-elem-psy {
  background-image: url("/persona5_vue2/images/icons/psy.png");
}
.ico-elem-support {
  background-image: url("/persona5_vue2/images/icons/support.png");
}
.ico-elem-wind {
  background-image: url("/persona5_vue2/images/icons/wind.png");
}

.resist {
  font-weight: bold;
  text-align: center;
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
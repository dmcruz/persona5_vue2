<template>
  <div class="home">
    
    <div class="content">
      <a-row class="header leftAlign" type="flex" justify="space-between">
        <a-col :span="2" v-for="(attr) in personaAttributes" :key="attr">
          {{attr}}
        </a-col>
      </a-row>
      <a-row class="row leftAlign" v-for="(item) in paginate(list)" :key="item.name" type="flex" justify="space-between">
        <a-col :span="2">
          {{ item.level }}
        </a-col>
        <a-col :span="2">
          {{ item.name }}
        </a-col>
        <a-col :span="2">
          {{ item.inherits }}
        </a-col>
        <a-col :span="2">
          {{ item.item }}
        </a-col>
        <a-col :span="2">
          {{ item.rareItem }}
        </a-col>
        <a-col :span="2">
          {{ item.arcana }}
        </a-col>
        <a-col :span="2">
          {{ item.trait }}
        </a-col>
        <a-col :span="2">
          {{ item.elems }}
        </a-col>
        <a-col :span="2">
          {{ item.stats }}
        </a-col>
        <a-col :span="2">
          {{ item.skills }}
        </a-col>
      </a-row>

      <a-pagination show-quick-jumper 
        show-size-changer
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
    currentPage: 1,
    pageSize: 10,
    list: getPersonaAsList(persona5DataRoyal),
    personaAttributes: [ "level", "persona", "inherits", "item", "rare item",
      "arcana", "trait", "elems", "stats", "skills"],
    statAttributes: ["Strength", "Magic", "Endurance", "Agility", "Luck"],
    elemAttributes: ["Physical", "Gun", "Fire", "Ice", "Electric", "Wind", "Psychic", "Nuclear", "Bless", "Curse"]
  }),
  mounted() {
    this.paginate(this.list);
  },
  methods: {
    onShowSizeChange(current, pageSize) {
      this.currentPage = current;
      this.paginate(this.list);
    },
    onPageChange(page, pageSize) {
      this.currentPage = page;
      this.pageSize = pageSize;
      this.paginate(this.list);
    },
    paginate(array) {
      return array.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    }
  },
};
</script>
<style scoped>
.header {
  font-weight:bold;
  text-transform:capitalize;
}
.content {
  margin: auto;
  width: 90%;
}
.leftAlign {
  text-align: left;
}
</style>
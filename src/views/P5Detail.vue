<template>
<div>
  <a-row type="flex" justify="center">
    <a-col :span="2" class="header">
      name
    </a-col>
    <a-col :span="6">
      {{persona.name}}
    </a-col>
  </a-row>
  <a-row type="flex" justify="center">
    <a-col :span="2" class="header">
      level
    </a-col>
    <a-col :span="6">
      {{persona.level}}
    </a-col>
  </a-row>
  <a-row type="flex" justify="center">
    <a-col :span="2" class="header">
      arcana
    </a-col>
    <a-col :span="6">
      {{persona.arcana}}
    </a-col>
  </a-row>
  <a-row type="flex" justify="center">
    <a-col :span="2" class="header">
      trait
    </a-col>
    <a-col :span="6">
      {{persona.trait}}
    </a-col>
  </a-row>
  <a-row type="flex" justify="center">
    <a-col :span="2" class="header">
      inherits
    </a-col>
    <a-col :span="6">
      <div :class="getAffinityIcon(persona.inherits)" style="width: 100%"></div>
    </a-col>
  </a-row>
  <a-row type="flex" justify="center">
    <a-col :span="2" class="header">
      item
    </a-col>
    <a-col :span="6">
      {{persona.item}}
    </a-col>
  </a-row>
  <a-row type="flex" justify="center">
    <a-col :span="2" class="header">
      rare item
    </a-col>
    <a-col :span="6">
      {{persona.rareItem}}
    </a-col>
  </a-row>

  <br />

  <a-row type="flex" justify="center">
    <a-col :span="8" class="header">Skills</a-col>
  </a-row>
  <a-row type="flex" justify="center" v-for="(skill, name, index) in persona.skills">
    <a-col :span="6" class="header-sub">
        {{name}}
    </a-col>
    <a-col :span="2">
      {{skill}}
    </a-col>
  </a-row>

  <br />


  <a-row type="flex" justify="center">
    <a-col :span="8" class="header">Stats</a-col>
  </a-row>
  <a-row type="flex" justify="center" v-for="(stat, index) in persona.stats">
    <a-col :span="6" class="header-sub">
        {{statAttributes[index]}}
    </a-col>
    <a-col :span="2">
      {{stat}}
    </a-col>
  </a-row>

  <br />

  <a-row type="flex" justify="center">
    <a-col :span="8" class="header">Elemental Resistance</a-col>
  </a-row>
  <a-row type="flex" justify="center" v-for="(elem, index) in persona.elems">
    <a-col :span="6" class="header-sub">
        {{elemAttributes[index].text}}
    </a-col>
    <a-col :span="2">
      {{getResistDetail(elem)}}
    </a-col>
  </a-row>

</div>
</template>
<script>
export default {
  props: ['name'],
  data: () => ({
    persona: null,
    statAttributes: ["Strength", "Magic", "Endurance", "Agility", "Luck"],
    elemAttributes: [{ text: "Physical", icon: "ico-elem-mini ico-elem-phys"},
      { text: "Gun", icon: "ico-elem-mini ico-elem-gun" },
      { text: "Fire", icon: "ico-elem-mini ico-elem-fire" },
      { text: "Ice", icon: "ico-elem-mini ico-elem-ice" }, 
      { text: "Electric", icon: "ico-elem-mini ico-elem-elec" },
      { text: "Wind", icon: "ico-elem-mini ico-elem-wind" },
      { text: "Psycokinesis", icon: "ico-elem-mini ico-elem-psy" }, 
      { text: "Nuclear", icon: "ico-elem-mini ico-elem-nuke" },
      { text: "Bless", icon: "ico-elem-mini ico-elem-bless" }, 
      { text: "Curse", icon: "ico-elem-mini ico-elem-curse" }]
  }),
  beforeMount() {
    this.persona = this.getPersonaDetails();
  },
  methods: {
    getAffinityIcon(affinity) {
      return `ico-elem ico-elem-${affinity}`;
    },
    getPersonaDetails() {
      return this.$store.state.selectedPersona;
    },
    getResistDetail(resist) {
      switch(resist) {
        case 'rp':
          return 'Repel';
        case 'nu':
          return 'Nullify';
        case 'ab':
          return 'Absorb';
        case 'wk':
          return 'Weak';
        case 'rs':
          return 'Resist';
        default:
          return resist;
      }
    }
  }
}
</script>
<style scoped src="./P5List.css">
</style>
<style scoped>
.header-sub {
  background-color: #333;
  margin: 0.5px;
}
</style>
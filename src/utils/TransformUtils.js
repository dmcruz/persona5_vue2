const getPersonaAsList = (persona5DataRoyal) => {
  var list = [];
  for(var name in persona5DataRoyal) {
    const detail = getPersonaDetail(persona5DataRoyal, name);
    var persona = {
      name: name,
      inherits: detail["inherits"],
      item: detail["item"],
      rareItem: detail["itemr"],
      level: detail["level"],
      arcana: detail["arcana"],
      trait: detail["trait"],
      stats: detail["stats"],
      skills: detail["skills"],
      elems: detail["elems"]
    };
    list.push(persona);
  }
  list.sort((a, b) => a.level - b.level);
  return list;

}
 const getPersonaDetail= (data, name) => {
  return data[name];
}

export default getPersonaAsList;
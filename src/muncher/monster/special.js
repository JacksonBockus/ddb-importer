// these are non-compliant monsters that currently don't meet parsing requirements
export function specialCases(monster) {
  switch (monster.name) {
    case "Reduced-threat Aboleth":
    case "Aboleth": {
      monster.items.forEach(function(item, index) {
        if (item.name === "Tentacle") {
          this[index].data.formula = item.data.damage.parts[1][0];
          this[index].data.damage.parts.splice(1, 1);
        }
      }, monster.items);
      break;
    }
    // flumph tendrils have weird syntax for damage over time.
    case "Flumph": {
      monster.items.forEach(function(item, index) {
        if (item.name === "Tendrils") {
          if (item.data.damage.parts.length > 2) {
            this[index].data.formula = item.data.damage.parts[2][0];
            this[index].data.damage.parts.splice(2, 1);
          }
          this[index].data.save.ability = "";
        }
      }, monster.items);
      break;
    }
    case "Hypnos Magen": {
      monster.flags.monsterMunch.spellList.atwill = ["Suggestion"];
      monster.flags.monsterMunch.spellList.material = false;
      monster.data.attributes.spellcasting = "int";
      break;
    }
    case "Sephek Kaltro": {
      monster.flags.monsterMunch.spellList.innate = [{ name: "Misty Step", type: "day", value: 3 }];
      monster.flags.monsterMunch.spellList.material = false;
      break;
    }
    // no default
  }

  return monster;
}

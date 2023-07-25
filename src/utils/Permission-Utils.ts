// let response ="[[\"read\",\"station\"],[\"read\",\"LC\"],[\"read\",\"department\"],[\"read\",\"designation\"],[\"create,read,update,delete\",\"co-admin\"],[\"read\",\"gear\"],[\"read\",\"staff\"],[\"read\",\"HQ\"],[\"read\",\"station\"],[\"read\",\"LC\"],[\"read\",\"designation\"],[\"create,read,update,delete\",\"sr.supervisor\"],[\"read\",\"sr.supervisor\"],[\"read\",\"sr.supervisor\"],[\"read\",\"gear\"],[\"read\",\"staff\"],[\"read\",\"HQ\"],[\"read\",\"section\"],[\"read\",\"section\"]]"
let response = "[[\"manage\",\"all\"],[\"read\",\"admin,co-admin,supervisor,staff\",0,1]]";
import { unpackRules } from '@casl/ability/extra';
let permissions = unpackRules(JSON.parse(response))


import { Ability, AbilityBuilder } from '@casl/ability';
const defineAbility = () => {
    const { can, cannot, build } = new AbilityBuilder(Ability);
    permissions.forEach(element => {
        if (element.inverted) {
            cannot(element.action, element.subject);
        } else {
            can(element.action, element.subject);
        }
    });
    return build();
}

const isAllowed = defineAbility().can('delete', 'admin');
console.log(isAllowed);
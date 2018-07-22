import { Armor, armorTypes } from './armor.model';
import { NameGenerator } from './name.model';
import { diceSpec } from './dice.model';
import { Weapon, weaponTypes } from './weapon.model';
import { randomProperty, countModifier } from './utilities.model';


export class Character {
// NAME
    private _name: string;
    get name () {
        return this._name;
    }
    set name (nm) {
        if (nm === '') {
            const nameGen = new NameGenerator();
            this._name = nameGen.generateName();
        } else {this._name = nm; }
    }
// RACE
    private _race: string;
    get race () {
        return this._race;
    }
    set race (race) {
        if (race === '') {
            this._race = raceArr[Math.floor(Math.random() * raceArr.length)];
        } else {this._race = race; }
    }
// CLASS
    private _chClass: string;
    get chClass () {
        return this._chClass;
    }
    set chClass (chClass) {
        if (chClass === '') {this._chClass = (randomProperty(charClasses)).clName;
        } else {this._chClass = chClass; }
    }
// STR
    private _strength: number;
    get strength () {
        return this._strength;
    }
    set strength (strn) {
        if (strn === 0) { this._strength = this.rollAbility();
        } else {this._strength = strn; }
        this._strModifier = countModifier(this._strength);
    }
    private _strModifier: number;
    get strModifier () {
        return this._strModifier;
    }

// DEX
    private _dexterity: number;
    get dexterity () {
        return this._dexterity;
    }
    set dexterity (dex) {
        if (dex === 0) { this._dexterity = this.rollAbility();
        } else {this._dexterity = dex; }
        this._dexModifier = countModifier(this._dexterity);
    }
    private _dexModifier: number;
    get dexModifier () {
        return this._dexModifier;
    }

// CONSTITUTION
    private _constitution: number;
    get constitution () {
        return this._constitution;
    }
    set constitution (con) {
        if (con === 0) {this._constitution = this.rollAbility();
        } else {this._constitution = con; }
        this._conModifier = countModifier(this._constitution);
    }
    private _conModifier: number;
    get conModifier () {
        return this._conModifier;
    }

// ARMOR TYPE

    private _armorType: Armor;
    get armorType () {
        return this._armorType;
    }
    set armorType (armT) {
        if (armT === undefined) {
            this._armorType = new Armor(charClasses[this._chClass].armor);
        } else {this._armorType = armT; }
        this._armorClass = this._armorType.armorValue;
        if (this._armorType.ifUsesModifier) {
            if (this._armorType.isLight) {this._armorClass += Math.min(2, this.dexModifier);
            } else {this._armorClass += this.dexModifier; }
        }
    }

// ARMOR CLASS

    private _armorClass: number;
    get armorClass () {
        return this._armorClass;
    }

// HIT POINTS

    private _hitPoints: number;
    get hitPoints () {
        return this._hitPoints;
    }


// WEAPON

    private _weapon: Weapon;
    get weapon () {
        return this._weapon;
    }
    set weapon (weap) {
        if (weap === undefined) {
            this._weapon = new Weapon(charClasses[this._chClass].weapon);
        } else {this._weapon = weap; }
    }

// ABILITY GENERATOR

    rollAbility() {
        const rollvalues = new Array();
        for (let i = 1; i <= 4; i++) {
            rollvalues.push(Math.floor((Math.random() * diceSpec.d6) + 1));
        }
        return rollvalues.reduce((a, b) => a + b, 0) - Math.min(...rollvalues);
    }

    // CONSTRUCTOR
    constructor (cName, cRace, cClass, cStr, cDex, armT, con, weap) {
        this.name = cName;
        this.race = cRace;
        this.chClass = cClass;
        this.strength = cStr;
        this.dexterity = cDex;
        this.armorType = armT;
        this.constitution = con;
        this.weapon = weap;
        this._hitPoints = charClasses[this._chClass].hpDice + this._conModifier;
    }
}

export const raceArr = ['arakocra', 'aasimar', 'bugbear', 'centaur', 'dragonborn', 'dwarf',
                        'elf', 'feral tiefling', 'firbolg', 'genasi', 'gith', 'gnome', 'goblin',
                        'goliath', 'half-elf', 'halfling', 'half-orc', 'hobgoblin', 'human',
                        'kenku', 'kobold', 'lizardfolk', 'minotaur', 'orc', 'tabaxi', 'tiefling',
                        'tortle', 'triton', 'yuan-ti pureblood'];


export const charClasses = {
    barbarian: {
        clName: 'barbarian',
        armor: armorTypes.studded,
        weapon: weaponTypes.greataxe,
        hpDice: diceSpec.d12 },
    bard: {
        clName: 'bard',
        armor: armorTypes.studded,
        weapon: weaponTypes.longsword,
        hpDice: diceSpec.d8 },
    cleric: {
        clName: 'cleric',
        armor: armorTypes.scaleMail,
        weapon: weaponTypes.heavyMace,
        hpDice: diceSpec.d8 },
    druid: {
        clName: 'druid',
        armor: armorTypes.hide,
        weapon: weaponTypes.scimitar,
        hpDice: diceSpec.d8 },
    fighter: {
        clName: 'fighter',
        armor: armorTypes.scaleMail,
        weapon: weaponTypes.greatsword,
        hpDice: diceSpec.d10 },
    monk: {
        clName: 'monk',
        armor: armorTypes.noArmor,
        // AC: 10 + this.abilityMods[1][1] + this.abilityMods[3][1],
        weapon: weaponTypes.sling,
        hpDice: diceSpec.d8 },
    paladin: {
        clName: 'paladin',
        armor: armorTypes.scaleMail,
        weapon: weaponTypes.longsword,
        hpDice: diceSpec.d10 },
    ranger: {
        clName: 'ranger',
        armor: armorTypes.studded,
        weapon: weaponTypes.longsword,
        hpDice: diceSpec.d10 },
    rogue: {
        clName: 'rogue',
        armor: armorTypes.studded,
        weapon: weaponTypes.shortSword,
        hpDice: diceSpec.d8 },
    sorcerer: {
        clName: 'sorcerer',
        armor: armorTypes.noArmor,
        // AC: 10 + this.abilityMods[1][1],
        weapon: weaponTypes.crossbow,
        hpDice: diceSpec.d6 },
    wizard: {
        clName: 'wizard',
        armor: armorTypes.noArmor,
        // AC: 10 + this.abilityMods[1][1],
        weapon: weaponTypes.crossbow,
        hpDice: diceSpec.d6
}};

import { Weapon } from './weapon.model';


export class Character {
    public name: string;
// RACE
    private _race: string;

    get race () {
        return this._race;
    }
    set race (race) {
        this._race = race;
    }
// CLASS
    private _chClass: string;

    get chClass () {
        return this._chClass;
    }

    set chClass (chClass) {
        this._chClass = chClass;
    }
// STR
    private _strength: number;
    get strength () {
        return this._strength;
    }
    set strength (strn) {
        this._strength = strn;
        this._strModifier = Math.floor((this._strength - 10) / 2);
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
        this._dexterity = dex;
        this._dexModifier = Math.floor((this._dexterity - 10) / 2);
    }

    private _dexModifier: number;
    get dexModifier () {
        return this._dexModifier;
    }

// ARMOR CLASS

    private _armorClass: number;
    get armorClass () {
        return this._armorClass;
    }
    set armorClass (armC) {
        this._armorClass = armC;
    }

// HIT POINTS

    private _hitPoints: number;
    get hitPoints () {
        return this._hitPoints;
    }
    set hitPoints (hp) {
        this._hitPoints = hp;
    }

// WEAPON

    private _weapon: Weapon;
    get weapon () {
        return this._weapon;
    }
    set weapon (weap) {
        this._weapon = weap;
    }

// CONSTRUCTOR
    constructor (cName, cRace, cClass, cStr, cDex, ac, hp, weap) {
        this.name = cName;
        this.race = cRace;
        this.chClass = cClass;
        this.strength = cStr;
        this.dexterity = cDex;
        this.armorClass = ac;
        this.hitPoints = hp;
        this.weapon = weap;
    }
}

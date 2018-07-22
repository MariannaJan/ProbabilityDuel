import { diceSpec } from './dice.model';


export const enum damageTypes {
    BLUDGEONING,
    PIERCING,
    SLASHING
}

export const enum numberOfDice {
    ONE,
    TWO
}

export class Weapon {

// weapon name
    private _name: string;
    get name () {
        return this._name;
    }
    set name (name) {
        this._name = name;
    }

// damage type
    private _damageType: damageTypes;
    get damageType () {
        return this._damageType;
    }
    set damageType (damageT) {
        this._damageType = damageT;
    }

// number of dice
    private _numOfDice: numberOfDice;
    get numOfDice () {
        return this._numOfDice;
    }
    set numOfDice (numD: numberOfDice) {
        this._numOfDice = numD;
    }

// dice sides
    private _diceSides: number;
    get diceSides () {
        return this._diceSides;
    }
    set diceSides (diceS) {
        this._diceSides = diceS;
    }

// constructor
    constructor (weaponSpec) {
        this.name = weaponSpec.wName;
        this.damageType = weaponSpec.damType;
        this.numOfDice = weaponSpec.numD;
        this.diceSides = weaponSpec.diceS;
    }
// methods
    printDamageType () {
        switch (this._damageType) {
            case damageTypes.BLUDGEONING: return 'bludgeoning';
            case damageTypes.PIERCING: return 'piercing';
            case damageTypes.SLASHING: return 'slashing';
        }
    }

    showPossibleThrows () {
        const possibleThrows = [];

        switch (this._numOfDice) {
            case numberOfDice.ONE: {
                for (let i = 1; i <= this.diceSides; i++) {
                    possibleThrows.push(i);
                }
                break;
            }
            case numberOfDice.TWO: {
                for (let i = 1; i <= this.diceSides; i++) {
                    for (let j = 1; j <= this.diceSides; j++) {
                        possibleThrows.push(i + j);
                    }
                }
                break;
            }
        }
        return possibleThrows.sort((n1, n2) => n1 - n2);
    }
}

export const weaponTypes = {
    greataxe: {
        wName: 'greataxe',
        damType: damageTypes.SLASHING,
        numD: numberOfDice.ONE,
        diceS: diceSpec.d12},
    longsword: {
        wName: 'longsword',
        damType: damageTypes.SLASHING,
        numD: numberOfDice.ONE,
        diceS: diceSpec.d8
    },
    heavyMace: {
        wName: 'heavy mace',
        damType: damageTypes.BLUDGEONING,
        numD: numberOfDice.ONE,
        diceS: diceSpec.d6
    },
    scimitar: {
        wName: 'scimitar',
        damType: damageTypes.SLASHING,
        numD: numberOfDice.ONE,
        diceS: diceSpec.d6
    },
    greatsword: {
        wName: 'greatsword',
        damType: damageTypes.SLASHING,
        numD: numberOfDice.TWO,
        diceS: diceSpec.d6
    },
    sling: {
        wName: 'sling',
        damType: damageTypes.BLUDGEONING,
        numD: numberOfDice.ONE,
        diceS: diceSpec.d4
    },
    shortSword: {
        wName: 'short sword',
        damType: damageTypes.PIERCING,
        numD: numberOfDice.ONE,
        diceS: diceSpec.d6
    },
    crossbow: {
        wName: 'crossbow',
        damType: damageTypes.PIERCING,
        numD: numberOfDice.ONE,
        diceS: diceSpec.d6
    }
};


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
    constructor (damType, numD, diceS) {
        this.damageType = damType;
        this.numOfDice = numD;
        this.diceSides = diceS;
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


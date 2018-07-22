export class Armor {
    armorName: string;
    armorValue: number;
    ifUsesModifier: boolean;
    isLight: boolean;

    constructor(armorType) {
        this.armorName = armorType.aName;
        this.armorValue = armorType.aValue;
        this.ifUsesModifier = armorType.ifUsesModifier;
        this.isLight = armorType.sLight;
    }
}

export const armorTypes = {
    noArmor: {
        aName: 'No armor',
        aValue: 10,
        ifUsesModifier: true,
        isLight: true
    },
    padded: {
        aName: 'Padded',
        aValue: 11,
        ifUsesModifier: true,
        isLight: true
    },
    leather: {
        aName: 'Leather',
        aValue: 11,
        ifUsesModifier: true,
        isLight: true
    },
    studded: {
        aName: 'Studded leather',
        aValue: 12,
        ifUsesModifier: true,
        isLight: true
    },
    hide: {
        aName: 'Hide',
        aValue: 12,
        ifUsesModifier: true,
        isLight: false
    },
    chainShirt: {
        aName: 'Chain shirt',
        aValue: 13,
        ifUsesModifier: true,
        isLight: false
    },
    scaleMail: {
        aName: 'Scale mail',
        aValue: 14,
        ifUsesModifier: true,
        isLight: false
    },
    breastPlate: {
        aName: 'Breastplate',
        aValue: 14,
        ifUsesModifier: true,
        isLight: false
    },
    halfPlate: {
        aName: 'Half plate',
        aValue: 15,
        ifUsesModifier: true,
        isLight: false
    },
    ringMail: {
        aName: 'Ring mail',
        aValue: 14,
        ifUsesModifier: false,
        isLight: false
    },
    chainMail: {
        aName: 'Chain mail',
        aValue: 16,
        ifUsesModifier: false,
        isLight: false
    },
    splint: {
        aName: 'Splint',
        aValue: 17,
        ifUsesModifier: false,
        isLight: false
    },
    plate: {
        aName: 'Plate',
        aValue: 18,
        ifUsesModifier: false,
        isLight: false
    }
};

import { diceSpec } from './dice.model';
import { Weapon, damageTypes, numberOfDice } from './weapon.model';
import { Character } from './character.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { InitiativeComponent } from './initiative/initiative.component';





@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  @ViewChild(InitiativeComponent) initComp;

  player1: Character;
  player2: Character;
  mace: Weapon;

  player1InitiativeProbability: number;
  player2InitiativeProbability: number;
  tieInitiativeProbability: number;

  player1HitProbability: number;
  player2HitProbability: number;

  player1KillProbability: number;
  player2KillProbability: number;

  countHitProb (player: Character, opponent: Character) {
    const fighter = player;
    const enemy = opponent;
    let fighterWins = 0;

    // const fighterThrows = [];
    for (let i = 1; i <= diceSpec.d20; i++) {
      const hitThrow = i + fighter.strModifier;
      // fighterThrows.push(hitThrow);
      if (hitThrow > enemy.armorClass) {
        fighterWins += 1;
      }
    }
    return Math.round((fighterWins / diceSpec.d20) * 10000) / 100;
  }

  countKillProbability(player: Character, opponent: Character) {
    const playerThrows = player.weapon.showPossibleThrows();
    let killProbability = 0;
    playerThrows.forEach(element => {
      if (element >= opponent.hitPoints) {
        killProbability += 1;
      }
    });
    return (Math.round((killProbability / playerThrows.length) * 10000)) / 100;
  }

  constructor() {}

  ngOnInit() {
    this.mace = new Weapon(damageTypes.BLUDGEONING, numberOfDice.TWO, 6);
    this.player1 = new Character('Alice', 'Elf', 'Rogue', 5, 18, 15, 8, new Weapon(damageTypes.PIERCING, numberOfDice.TWO, diceSpec.d6));
    this.player2 = new Character('Conrad', 'Human', 'Fighter', 16, 10, 15, 10, this.mace);

    const initiative = this.initComp.countInitiative(this.player1.dexterity, this.player2.dexterity);
    this.player1InitiativeProbability = initiative.probPlayer1;
    this.player2InitiativeProbability = initiative.probPlayer2;
    this.tieInitiativeProbability = initiative.probTie;

    this.player1HitProbability = this.countHitProb(this.player1, this.player2);
    this.player2HitProbability = this.countHitProb(this.player2, this.player1);

    this.player1KillProbability = this.countKillProbability(this.player1, this.player2);
    this.player2KillProbability = this.countKillProbability(this.player2, this.player1);
  }

}

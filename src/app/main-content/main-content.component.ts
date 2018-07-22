import { Armor, armorTypes } from './armor.model';
import { diceSpec } from './dice.model';
import { Weapon, damageTypes, numberOfDice, weaponTypes } from './weapon.model';
import { Character } from './character.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { InitiativeComponent } from './initiative/initiative.component';
import { roundPercent } from './utilities.model';



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

  public playerChartLabels: string[] = ['Initiative', 'Hit', 'Kill'];

  public playerChartData: any;
  public playerChartType = 'radar';

  // events
  public chartClicked(e: any): void {
    console.log(e);
    this.generateCharacters();
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  countHitProb(player: Character, opponent: Character) {
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
    return roundPercent(fighterWins / diceSpec.d20);
  }

  countKillProbability(player: Character, opponent: Character) {
    const playerThrows = player.weapon.showPossibleThrows();
    let killProbability = 0;
    playerThrows.forEach(element => {
      if (element >= opponent.hitPoints) {
        killProbability += 1;
      }
    });
    return roundPercent(killProbability / playerThrows.length);
  }

  constructor() { }

  generateRandomCharacter () {
    return new Character('', '', '', 0, 0, undefined, 8,
                undefined);
  }

  generateCharacters() {

    this.player1 = this.generateRandomCharacter();
    this.player2 = this.generateRandomCharacter();

    const initiative = this.initComp.countInitiative(this.player1.dexterity, this.player2.dexterity);
    this.player1InitiativeProbability = initiative.probPlayer1;
    this.player2InitiativeProbability = initiative.probPlayer2;
    this.tieInitiativeProbability = initiative.probTie;

    this.player1HitProbability = this.countHitProb(this.player1, this.player2);
    this.player2HitProbability = this.countHitProb(this.player2, this.player1);

    this.player1KillProbability = this.countKillProbability(this.player1, this.player2);
    this.player2KillProbability = this.countKillProbability(this.player2, this.player1);

    this.playerChartData = [
      { data: [this.player1InitiativeProbability, this.player1HitProbability, this.player1KillProbability], label: 'Player 1' },
      { data: [this.player2InitiativeProbability, this.player2HitProbability, this.player2KillProbability], label: 'Player 2' }
    ];
  }


  ngOnInit() { this.generateCharacters(); }
}

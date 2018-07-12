import { Character } from './character.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { InitiativeComponent } from './initiative/initiative.component';



@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  @ViewChild(InitiativeComponent) child;

  player1: Character;
  player2: Character;

  player1InitiativeProbability: number;
  player2InitiativeProbability: number;
  tieInitiativeProbability: number;

  constructor() {}

  ngOnInit() {
    this.player1 = new Character('Alice', 'Elf', 'Rogue', 5, 18);
    this.player2 = new Character('Conrad', 'Human', 'Fighter', 16, 10);

    const initiative = this.child.countInitiative(this.player1.dexterity, this.player2.dexterity);
    this.player1InitiativeProbability = initiative.probPlayer1;
    this.player2InitiativeProbability = initiative.probPlayer2;
    this.tieInitiativeProbability = initiative.probTie;
  }

}

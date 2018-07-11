import { Character } from './character.model';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  player1: Character;
  player2: Character;

  player1InitiativeProbability: number;
  player2InitiativeProbability: number;
  tieInitiativeProbability: number;

// --- INITIATIVE TABLE

  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: this.createData()[0], label: 'Player win' },
    { data: this.createData()[1], label: 'Opponent win' },
    { data: this.createData()[2], label: 'Tie' }
  ];

  chartLabels = [1, 2, 3, 4, 5 , 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


  onChartClick(event) {
    console.log(event);
  }

  createData () {
    const arrPlayerWins = [];
    const arrOpponentWins = [];
    const arrTies = [];
    let i;
    for (i = 1; i <= 20; i++) {
      arrPlayerWins.push(this.countInitiative(i, 10)['probPlayer1']);
      arrOpponentWins.push(this.countInitiative(i, 10)['probPlayer2']);
      arrTies.push(this.countInitiative(i, 10)[ 'probTie']);
    }
    const arrResults = [arrPlayerWins, arrOpponentWins, arrTies];
    return arrResults;
  }

// ---

  countInitiative(dex1: number, dex2: number) {
    let p1;
    let p2;
    let tie = 0;
    let P1Wins = 0;
    let P2Wins = 0;
    const modifier1 = Math.floor((dex1 - 10) / 2);
    const modifier2 = Math.floor((dex2 - 10) / 2);
    const results = {
      'probPlayer1' : 0,
      'probPlayer2' : 0,
      'probTie' : 0
    };
    const dice = 20;
    for (p1 = (1 + modifier1); p1 <= dice + modifier1; p1++) {
      for (p2 = 1 + modifier2; p2 <= dice + modifier2; p2++) {
        if (p1 === p2) {
          tie += 1;
        } else if (p1 > p2) {
          P1Wins += 1;
        } else {
          P2Wins += 1;
        }
      }
    }

    results.probPlayer1 = Math.round((P1Wins / (dice  * dice)) * 10000) / 100;
    results.probPlayer2  = Math.round((P2Wins / (dice  * dice)) * 10000) / 100;
    results.probTie = Math.round((tie  / (dice * dice)) * 10000) / 100;

    return results;
  }

  constructor() {}

  ngOnInit() {
    this.player1 = new Character('Alice', 'Elf', 'Rogue', 5, 18);
    this.player2 = new Character('Conrad', 'Human', 'Fighter', 16, 10);

    const initiative = this.countInitiative(this.player1.dexterity, this.player2.dexterity);
    this.player1InitiativeProbability = initiative[0];
    this.player2InitiativeProbability = initiative[1];
    this.tieInitiativeProbability = initiative[2];
  }

}

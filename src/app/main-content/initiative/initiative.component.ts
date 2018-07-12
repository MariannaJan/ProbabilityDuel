import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class InitiativeComponent implements OnInit {

  opponentDex = 10;

  // --- INITIATIVE TABLE SETUP

  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Probability of succes of initiative roll vs opponent with chosen dexterity'
    },
    legend: {
      position: 'right',
      labels: {
        boxWidth: 10
      }
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Probability [%]'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Player dexterity'
        }
      }]
    }
  };

  chartData = [
    { data: this.createData(this.opponentDex)[0], label: 'Player win' },
    { data: this.createData(this.opponentDex)[1], label: 'Opponent win' },
    { data: this.createData(this.opponentDex)[2], label: 'Tie' }
  ];

  chartLabels = [1, 2, 3, 4, 5 , 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];


  dataChanged(event) {
    this.chartData = [
      { data: this.createData(event)[0], label: 'Player win' },
      { data: this.createData(event)[1], label: 'Opponent win' },
      { data: this.createData(event)[2], label: 'Tie' }
    ];
  }

  createData (opDex: number) {
    const arrPlayerWins = [];
    const arrOpponentWins = [];
    const arrTies = [];
    let i;
    for (i = 1; i <= 20; i++) {
      arrPlayerWins.push(this.countInitiative(i, opDex)['probPlayer1']);
      arrOpponentWins.push(this.countInitiative(i, opDex)['probPlayer2']);
      arrTies.push(this.countInitiative(i, opDex)[ 'probTie']);
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


  constructor() { }

  ngOnInit() {
  }

}

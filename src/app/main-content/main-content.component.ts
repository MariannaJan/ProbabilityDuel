import { Character } from './character.model';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  player1: Character;

  constructor() {}

  ngOnInit() {
    this.player1 = new Character('Alice', 'Elf', 'Archer', 5, 18);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hands',
  templateUrl: './hands.component.html',
  styleUrls: ['./hands.component.css']
})
export class HandsComponent implements OnInit {

  leftHandClick() {
    console.log("Left hand clicked")
  }

  rightHandClick() {
    console.log("Right hand clicked")
  }

  constructor() { }

  ngOnInit(): void {
  }

}

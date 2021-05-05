import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import gsap, { Power0 } from 'gsap';
import { all } from 'codelyzer/util/function';

@Component({
  selector: 'app-hands',
  templateUrl: './hands.component.html',
  styleUrls: ['./hands.component.css']
})

export class HandsComponent implements OnInit, AfterViewInit {
  public handTimeline = gsap.timeline({overwrite: true})
  public handHit = gsap.timeline({overwrite: true})
  @Input() side: string

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  // HAND animation:
  animateHand() {
    this.handTimeline.to('#hands', {duration: 0.6, x: this.side === 'left' ? 900 : -900, delay: 2, ease: Power0.easeOut})
      .set('#hands', {delay: 0.08, attr: {src: '..\\assets\\' + this.side + '_hand_2.png'}})
      .set('#hands', {delay: 0.08, attr: {src: '..\\assets\\' + this.side + '_hand_3.png'}})
      .add(()=> console.log("Verloren!"))
  }

  // When hand is clicked
  click() {
    console.log('Geraakt')

    this.handHit.set('#hands', {attr: {src: '..\\assets\\' + this.side + '_hand_hit.png'}, overwrite: true})
      .to('#hands', {duration: 0.5, x: this.side === 'left' ? -900 : 900, ease: Power0.easeOut})
  }
}

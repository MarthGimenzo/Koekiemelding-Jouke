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
  public handDelay = 0;
  public hitCount = 0;

  @Input() side: string
  @Output() lost = new EventEmitter<boolean>();
  @Output() win = new EventEmitter<boolean>();
  @Output() randomHand = new EventEmitter<boolean>();
  @Output() resetHandPosition = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  // Hand grabbing animation

  animateHand() {
    this.handTimeline = gsap.timeline()
    console.log("Incoming hand animation start")
    this.handDelay = Math.floor(Math.random() * 5) + 1;
    console.log("Amount of seconds before hand: " + this.handDelay)
    this.handTimeline.add(()=> this.resetHandPosition.emit(true))
      .to('#hands', {duration: 0.3, delay: this.handDelay, x: this.side === 'left' ? -110 : 0, ease: Power0.easeOut})
      .set('#hands', {delay: 0.08, attr: {src: '..\\assets\\' + this.side + '_hand_2.png'}})
      .set('#hands', {delay: 0.08, attr: {src: '..\\assets\\' + this.side + '_hand_3.png'}})
      .add(()=> this.lost.emit(true))
  }

  // Player hits hand

  click() {
    console.log('Hand geraakt')
    this.handHit.set('#hands', {attr: {src: '..\\assets\\' + this.side + '_hand_hit.png'}, overwrite: true})
      .add(this.handTimeline.kill())
      .to('#hands', {duration: 0.3, x: this.side === 'left' ? -1000 : 900, ease: Power0.easeOut})
      .add(()=> this.randomHand.emit(true))
      .add(()=> this.resetHandPosition.emit(true))
      .add(()=> this.animateHand());
    this.hitCount += 1;
    if (this.hitCount == 3) {
      this.win.emit(true);
    }
  }
}

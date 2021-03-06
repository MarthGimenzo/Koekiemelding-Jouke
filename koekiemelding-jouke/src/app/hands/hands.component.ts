import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import gsap, { Power0 } from 'gsap';

@Component({
             selector:    'app-hands',
             templateUrl: './hands.component.html',
             styleUrls:   ['./hands.component.scss']
           })

export class HandsComponent implements OnInit, AfterViewInit {

  public handTimeline = gsap.timeline({overwrite: true});
  public handHit      = gsap.timeline({overwrite: true});
  public handDelay    = 0;
  public audio;

  @Input() side: string;
  @Input() gameOn: boolean;
  @Input() hitCount           = 0;
  @Output() lost              = new EventEmitter<boolean>();
  @Output() win               = new EventEmitter<boolean>();
  @Output() randomHand        = new EventEmitter<boolean>();
  @Output() resetHandPosition = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  // Hand grabbing animation

  animateHand(): void {
    if (this.gameOn) {
      this.handTimeline = gsap.timeline();
      this.handDelay = Math.floor(Math.random() * 5) + 1;
      this.handTimeline.add(() => this.resetHandPosition.emit(true))
        .to('#hands', {duration: 0.5, delay: this.handDelay, x: this.side === 'left' ? -110 : 0, ease: Power0.easeOut})
        .set('#hands', {delay: 0.08, attr: {src: '..\\assets\\' + this.side + '_hand_2.png'}})
        .set('#hands', {delay: 0.08, attr: {src: '..\\assets\\' + this.side + '_hand_3.png'}})
        .add(() => this.lost.emit(true));
    }
  }

  // Player hits hand

  playHit(): void {
    this.audio     = new Audio();
    this.audio.src = '..\\assets\\soundeffects\\ouch.wav';
    this.audio.load();
    this.audio.play();
  }

  click(): void {
    if (this.gameOn) {
      this.playHit();
      this.handHit.set('#hands', {attr: {src: '..\\assets\\' + this.side + '_hand_hit.png'}, overwrite: true})
        .add(this.handTimeline.kill())
        .to('#hands', {duration: 0.3, x: this.side === 'left' ? -1000 : 900, ease: Power0.easeOut})
        .add(() => this.randomHand.emit(true))
        .add(() => this.resetHandPosition.emit(true))
        .add(() => this.animateHand());
      this.hitCount += 1;
      if (this.hitCount === 3) {
        this.win.emit(true);
      }
    }
  }
}

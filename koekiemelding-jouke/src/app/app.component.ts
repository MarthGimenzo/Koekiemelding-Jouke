import { Component, OnInit, ViewChild } from '@angular/core';
import { HandsComponent } from './hands/hands.component';
import gsap, { Back, Power0 } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

@Component({
             selector:    'app-root',
             templateUrl: './app.component.html',
             styleUrls:   ['./app.component.css']
           })

export class AppComponent implements OnInit {
  title = 'koekiemelding-jouke';
  public intro;
  public reset;
  public lost;
  public won;
  public ending;
  public randomNumber;
  public audio;

  @ViewChild(HandsComponent, {static: true}) child: HandsComponent;

  // Angular functions

  ngOnInit(): void {
    console.log('ngOnInit');
    this.handRandomizer();
    this.setHandStartPosition();
    this.preloadContent();
    this.initializeGame();
  }

  // Custom functions
  preloadContent(): void {
    // Preload graphics and audio
    gsap.timeline().set('#preload-images', {attr: {src: '..\\assets\\left_hand_1.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\left_hand_2.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\left_hand_3.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\left_hand_hit.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\right_hand_1.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\right_hand_2.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\right_hand_3.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\right_hand_hit.png'}});
    this.audio     = new Audio();
    this.audio.src = '..\\assets\\soundeffects\\ouch.wav';
    this.audio.load();
  }

  initializeGame(): void {
    // Game Intro
    gsap.set('#shine', {rotation: 0, scale: 1, opacity: 1, timescale: 0});
    gsap.to('#shine', {duration: 6, rotation: 360, ease: 'none', repeat: -1});
    this.child.gameOn = true;
    gsap.timeline().set('#left_button', {x: -300})
      .set('#middle_button', {y: 300})
      .set('#right_button', {x: 300});
    this.intro = gsap.timeline();
    this.intro.to('#yellow-rectangle', 0.2, {scaleY: 1, delay: 1, ease: Power0.easeOut})
      .from('#cookieplate', 0.6, {x: -1500, ease: Back.easeOut})
      .set('#text', {text: {value: 'Laat je koekies niet afpakken!'}, opacity: 0})
      .to('#text', {duration: 0.5, opacity: 1, yoyo: true, ease: Power0.easeNone, repeat: 4})
      .to('#shine', 1, {scale: 50, opacity: 0})
      .add(() => {
        gsap.killTweensOf('#shine');
      })
      .set('#text', {delay: 0.4, text: {value: '3...'}, opacity: 1})
      .set('#text', {delay: 0.8, text: {value: '2...'}})
      .set('#text', {delay: 0.8, text: {value: '1...'}})
      .set('#text', {delay: 0.8, text: {value: 'START'}, opacity: 1})
      .add(
        gsap.timeline({repeat: 2})
          .set('#text', {delay: 0.2, opacity: 0})
          .set('#text', {delay: 0.2, opacity: 1})
      )
      .set('#text', {delay: 0.2, opacity: 0})
      .add(() => this.child.animateHand());
  }

  handRandomizer(): void {
    this.randomNumber = Math.floor(Math.random() * 2);
    this.child.side   = (this.randomNumber === 0) ? 'left' : 'right';
    console.log('Hand randomizer function: ' + this.child.side);
  }

  setHandStartPosition(): void {
    console.log('Reset Hand Position');
    gsap.timeline().set('#hands', {
      attr: {src: '..\\assets\\' + this.child.side + '_hand_1.png'},
      x:    this.child.side === 'left' ? -1000 : 900
    });
  }

  resetGame(): void {
    this.reset = gsap.timeline();
    this.reset.set('#yellow-rectangle', {
      backgroundColor: 'powderblue',
      overwrite:       true
    }).set('#text', {text: {value: ' '}});
    this.intro.kill();
    this.child.gameOn   = true;
    this.child.hitCount = 0;
    gsap.set('#shine', {repeatRefresh: true, clearProps: 'all'});
    this.handRandomizer();
    this.setHandStartPosition();
    this.initializeGame();
  }

  gameOver(): void {
    // Lost:
    this.playGameOver();
    this.child.gameOn = false;
    this.lost         = gsap.timeline();
    this.lost.set('#text', {delay: 0.8, text: {value: 'Verloren...'}, opacity: 1});
    this.lost.set('#yellow-rectangle', {backgroundColor: 'maroon', overwrite: true})
      .add(() => this.displayButtons());
  }

  playWon(): void {
    this.audio     = new Audio();
    this.audio.src = '..\\assets\\soundeffects\\win.wav';
    this.audio.load();
    this.audio.play();
  }

  playYay(): void {
    this.audio     = new Audio();
    this.audio.src = '..\\assets\\soundeffects\\yay.wav';
    this.audio.load();
    this.audio.play();
  }

  playGameOver(): void {
    this.audio     = new Audio();
    this.audio.src = '..\\assets\\soundeffects\\game-over.wav';
    this.audio.load();
    this.audio.play();
  }

  gameWon(): void {
    // Won:
    this.playWon();
    this.child.gameOn = false;
    this.won          = gsap.timeline();
    this.won.set('#text', {delay: 0.8, text: {value: 'Won!!'}, opacity: 1});
    this.won.to('#shine', 1, {scale: 1, opacity: 1});
    this.won.set('#yellow-rectangle', {backgroundColor: 'powderblue', overwrite: true})
      .add(() => this.playYay())
      .add(() => this.displayButtons());
  }

  displayButtons(): void {
    // Display buttons:
    this.ending = gsap.timeline();
    this.ending.to('#left_button', 0.4, {x: 0, ease: Back.easeOut});
    this.ending.to('#middle_button', 0.4, {y: 0, ease: Back.easeOut}, '-=0.4');
    this.ending.to('#right_button', 0.4, {x: 0, ease: Back.easeOut}, '-=0.4');
  }
}



import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HandsComponent } from './hands/hands.component';
import gsap from "gsap";
import { Power0, Back, TimelineLite } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import {Howl, Howler} from 'howler';

gsap.registerPlugin(TextPlugin);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'koekiemelding-jouke';
  public intro
  public reset
  public lost
  public won
  public ending
  public randomNumber
  public audio

  @ViewChild(HandsComponent, {static:true}) child: HandsComponent;

  // Angular functions

  ngOnInit() {
    console.log("ngOnInit")
    this.handRandomizer();
    this.setHandStartPosition();
    this.preloadContent();
    this.initializeGame();
  }

  // Custom functions

  preloadContent() {
    gsap.timeline().set('#preload-images', {attr: {src: '..\\assets\\left_hand_1.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\left_hand_2.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\left_hand_3.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\left_hand_hit.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\right_hand_1.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\right_hand_2.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\right_hand_3.png'}})
      .set('#preload-images', {attr: {src: '..\\assets\\right_hand_hit.png'}})
    this.audio = new Audio();
    this.audio.src = '..\\assets\\soundeffects\\ouch.wav';
    this.audio.load();
  }

  initializeGame() {
    // Game Intro
    this.child.gameOn = true;
    gsap.timeline().set('#left_button', {x: -300})
      .set('#middle_button', {y: 300})
      .set('#right_button', {x: 300})
    this.intro = gsap.timeline();
    this.intro.to('#yellow-rectangle', 0.2, {scaleY: 1, delay: 1, ease: Power0.easeOut})
      .from('#cookieplate', 0.6, {x: -1500, ease: Back.easeOut})
      .set('#text', {text: {value: 'Laat je koekies niet afpakken!'}, opacity: 0})
      .to('#text', {duration: 0.5, opacity: 1, yoyo: true, ease: Power0.easeNone, repeat: 4})
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
      .add(()=> this.child.animateHand())
  }

  handRandomizer() {
    this.randomNumber = Math.floor(Math.random() * 2);
    this.child.side = (this.randomNumber == 0) ? "left" : "right"
    console.log("Hand randomizer function: " + this.child.side)
  }

  setHandStartPosition() {
    console.log("Reset Hand Position")
    gsap.timeline().set('#hands', {attr: {src: '..\\assets\\' + this.child.side + '_hand_1.png'}, x: this.child.side === 'left' ? -1000 : 900})
  }

  resetGame() {
    this.reset = gsap.timeline();
    this.reset.set('#yellow-rectangle', {backgroundColor: 'powderblue', overwrite: true}).set('#text', {text: {value: ' '}})
    this.intro.kill()
    this.child.gameOn = true;
    this.child.hitCount = 0;
    this.handRandomizer()
    this.setHandStartPosition()
    this.initializeGame()
  }

  gameOver() {
    // Lost:
    this.playGameOver();
    this.child.gameOn = false;
    this.lost = gsap.timeline();
    this.lost.set('#text', {delay: 0.8, text: {value: 'Verloren...'}, opacity: 1})
    this.lost.set('#yellow-rectangle', {backgroundColor: 'maroon', overwrite: true})
      .add(()=> this.displayButtons())
  }

  playWon(){
    this.audio = new Audio();
    this.audio.src = '..\\assets\\soundeffects\\win.wav';
    this.audio.load();
    this.audio.play();
  }

  playYay(){
    this.audio = new Audio();
    this.audio.src = '..\\assets\\soundeffects\\yay.wav';
    this.audio.load();
    this.audio.play();
  }

  playGameOver(){
    this.audio = new Audio();
    this.audio.src = '..\\assets\\soundeffects\\game-over.wav';
    this.audio.load();
    this.audio.play();
  }

  gameWon() {
    // Won:
    this.playWon()
    this.child.gameOn = false;
    this.won = gsap.timeline();
    this.won.set('#text', {delay: 0.8, text: {value: 'Won!!'}, opacity: 1})
    this.won.set('#yellow-rectangle', {backgroundColor: 'green', overwrite: true})
      .add(()=> this.playYay())
      .add(()=> this.displayButtons())
  }

  displayButtons() {
    //Display buttons:
    this.ending = gsap.timeline();
    this.ending.to('#left_button', 0.4, {x: 0, ease: Back.easeOut})
    this.ending.to('#middle_button', 0.4, {y: 0, ease: Back.easeOut}, '-=0.4')
    this.ending.to('#right_button', 0.4, {x: 0, ease: Back.easeOut}, '-=0.4')
  }
}



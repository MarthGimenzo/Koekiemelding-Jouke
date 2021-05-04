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

export class AppComponent implements OnInit, AfterViewInit {
  title = 'koekiemelding-jouke';
  public intro

  @ViewChild(HandsComponent, {static:true}) child: HandsComponent;

  resetGame() {
    this.intro.set('#yellow-rectangle', {backgroundColor: 'powderblue', overwrite: true})
    this.intro.kill()
    let randomNumber = Math.floor(Math.random() * 2);
    this.child.side = (randomNumber == 0) ? "left" : "right"
    this.initializeGame()
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    let randomNumber = Math.floor(Math.random() * 2);
    this.child.side = (randomNumber == 0) ? "left" : "right"
    this.initializeGame();
  }

  newEvent() {
    console.log("Nieuw event opgeroepen")
  }

  initializeGame() {

    this.intro = gsap.timeline();
    this.intro.to('#yellow-rectangle', 0.2, {scaleY: 1, delay: 1, ease: Power0.easeOut})
      .from('#cookieplate', 0.6, {x: -1500, ease: Back.easeOut})
      .to('#text', {duration: 0.5, opacity: 1, yoyo: true, ease: Power0.easeNone, repeat: 4})
      .set('#text', {delay: 0.4, text: {value: '3...'}, opacity: 1})
      .set('#text', {delay: 0.8, text: {value: '2...'}})
      .set('#text', {delay: 0.8, text: {value: '1...'}})
      .set('#text', {delay: 0.8, text: {value: 'START'}, opacity: 1})
      .add(()=> this.child.animateHand())
      .add(
        gsap.timeline({repeat: 2})
          .set('#text', {delay: 0.2, opacity: 0})
          .set('#text', {delay: 0.2, opacity: 1})
      )
      .set('#text', {delay: 0.2, opacity: 0})


    // CALL HANDS ANIMATION IN HANDS.COMPONENT

    //this.child.animateHand()
    console.log("Hallo het is side " + this.child.side)
    // Hand randomizer

    //(this.side == "left") ? this.leftHand() : this.rightHand();

    // Lost:
    this.intro.set('#text', {delay: 0.8, text: {value: 'Verloren...'}, opacity: 1})
    this.intro.to('#yellow-rectangle', {backgroundColor: 'maroon'})

    // Display buttons:
    this.intro.from('#left_button', 0.4, {x: -300, ease: Back.easeOut})
    this.intro.from('#middle_button', 0.4, {y: 100, ease: Back.easeOut}, '-=0.4')
    this.intro.from('#right_button', 0.4, {x: 300, ease: Back.easeOut}, '-=0.4')
  }
}



import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {

    let intro = new TimelineLite();
    intro.to('#yellow-rectangle', 0.2, { scaleY: 1, delay: 1, ease: Power0.easeOut })
    .from('#cookieplate', 0.6, { x: -1500, ease: Back.easeOut  })
      .to('#text', { duration:0.5, opacity: 1, yoyo: true,ease:Power0.easeNone,repeat:4})
      .set("#text", {delay: 0.4, text: {value: "3..."}, opacity:1})
      .set("#text", {delay: 0.8, text: {value: "2..."}})
      .set("#text", {delay: 0.8, text: {value: "1..."}})
      .set('#text', {delay: 0.8, text: {value: "START"}, opacity: 1})
      .add(
        gsap.timeline({repeat:2})
          .set('#text', {delay: 0.2, opacity: 0})
          .set('#text', {delay: 0.2, opacity: 1})
      )
      .set('#text', {delay: 0.2, opacity: 0})

      // Left hand animation:
      intro.from('#lefthand', 0.3, { x: -1600, delay: 2, ease: Power0.easeOut  })
      .set('#lefthand',{delay: 0.08, attr:{src:"..\\assets\\left_hand_2.png"}})
      .set('#lefthand',{delay: 0.08, attr:{src:"..\\assets\\left_hand_3.png"}})

      // Right hand animation:
      intro.to('#righthand', 0.3, { x: -660, ease: Power0.easeOut  })
      .set('#righthand',{delay: 0.08, attr:{src:"..\\assets\\right_hand_2.png"}})
      .set('#righthand',{delay: 0.08, attr:{src:"..\\assets\\right_hand_3.png"}})

      // Display buttons:
      intro.from('#left_button', 0.4, { x: -300, ease: Back.easeOut  })
      intro.from('#middle_button', 0.4, { y: 100, ease: Back.easeOut},'-=0.4')
      intro.from('#right_button', 0.4, { x: 300, ease: Back.easeOut},'-=0.4')

  }
}

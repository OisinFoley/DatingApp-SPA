import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.css']
})
export class LearnMoreComponent {
  @Output() cancelLearnMore = new EventEmitter();
  cancel() {
    this.cancelLearnMore.emit(false);
  }
}

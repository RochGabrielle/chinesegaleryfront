import { Component, OnInit } from '@angular/core';
import { TranslationService } from './../services/translation.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  history: string = "default history";
  translationBook: string = "history";

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {

  this.history = this.translationService.translate('en', this.translationBook, 'gattere')[0];
  }

}

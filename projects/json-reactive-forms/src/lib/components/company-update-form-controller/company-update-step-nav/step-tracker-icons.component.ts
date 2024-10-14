import { Component, OnInit } from '@angular/core';
import { CompanyUpdateFormControllerService } from '../company-update-form/form.service';

@Component({
  selector: 'app-step-tracker-icons',
  templateUrl: './step-tracker-icons.component.html',
  styleUrls: ['./step-tracker-icons.component.scss']
})
export class StepTrackerIconsComponent implements OnInit {
  activeStep$!: number;

  constructor(public formService: CompanyUpdateFormControllerService) { }

  ngOnInit(): void {
    this.formService.activeStep$.subscribe(activeStep => this.activeStep$ = activeStep);
  }

}

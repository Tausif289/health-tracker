import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.html',
  styleUrls: ['./report.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent {}

import { ChangeDetectionStrategy, Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report.html',
  styleUrls: ['./report.css'],
  providers: [provideCharts(withDefaultRegisterables())],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent implements OnInit {
  @ViewChildren(BaseChartDirective) charts?: QueryList<BaseChartDirective>; // ✅ Use ViewChildren

  constructor(private reportService: ReportService, private cdr: ChangeDetectorRef) {}

  public userId: string | null = null;

  calorieChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  weightChartData: ChartData<'line'> = { labels: [], datasets: [] };
  activityChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  nutritionChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };

  calorieChartOptions: ChartOptions<'bar'> = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } };
  weightChartOptions: ChartOptions<'line'> = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } };
  activityChartOptions: ChartOptions<'doughnut'> = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } };
  nutritionChartOptions: ChartOptions<'doughnut'> = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } };

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      this.userId = parsedUser._id;
    }
    if (!this.userId) {
      console.error('User ID not found in localStorage');
      return;
    }
    this.loadReportData(this.userId);
  }

  loadReportData(userId: string) {
    this.reportService.getUserReport(userId).subscribe({
      next: (data) => {
        console.log('Report Data:', data);

        // 🥗 Calories Chart
        this.calorieChartData.labels = data.calorieLogs.map((c: any) => new Date(c.date).toLocaleDateString());
        this.calorieChartData.datasets = [
          { data: data.calorieLogs.map((c: any) => c.intakeCalories), label: 'Calories Intake', backgroundColor: 'rgba(110, 142, 251, 0.8)' },
          { data: data.calorieLogs.map((c: any) => c.burnedCalories), label: 'Calories Burned', backgroundColor: 'rgba(167, 119, 227, 0.8)' },
        ];

        // ⚖️ Weight Chart
        this.weightChartData.labels = data.weightEntries.map((w: any) => new Date(w.date).toLocaleDateString());
        this.weightChartData.datasets = [
          { data: data.weightEntries.map((w: any) => w.weight), label: 'Weight (kg)', fill: true, backgroundColor: 'rgba(110, 142, 251, 0.2)', borderColor: 'rgba(110, 142, 251, 1)' },
        ];

        // 🏃 Activity Chart
        this.activityChartData.labels = data.activities.map((a: any) => a.activityName);
        this.activityChartData.datasets = [
          { data: data.activities.map((a: any) => a.duration), backgroundColor: ['rgba(255,99,132,0.8)','rgba(54,162,235,0.8)','rgba(255,206,86,0.8)','rgba(75,192,192,0.8)'] }
        ];

        // 🍎 Nutrition Chart
        this.nutritionChartData.labels = ['Protein', 'Carbs', 'Fat'];
        this.nutritionChartData.datasets = [
          { data: [data.nutritionSummary.protein, data.nutritionSummary.carbs, data.nutritionSummary.fat], backgroundColor: ['rgba(153,102,255,0.8)','rgba(255,159,64,0.8)','rgba(255,99,132,0.8)'] }
        ];

        // 🔁 Update all charts
        setTimeout(() => {
          this.charts?.forEach(chart => chart.update());
          this.cdr.detectChanges();
        }, 0);
      },
      error: (err) => console.error('Error loading report:', err),
    });
  }
}

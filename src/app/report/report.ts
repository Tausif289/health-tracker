import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

import { ReportService } from '../services/report.service';
@Component({
  selector: 'app-report',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report.html',
  styleUrls: ['./report.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportComponent {
  // Daily Calorie Intake and Burned Chart
  constructor(private reportService: ReportService) {}

  // 🧩 Charts
  calorieChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  weightChartData: ChartData<'line'> = { labels: [], datasets: [] };
  activityChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  nutritionChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };

  calorieChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
  };
  weightChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  };
  activityChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
  };
  nutritionChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } },
  };

  ngOnInit(): void {
    const userId = '6717b1e93af9822a8b9098d4'; // 🔹 Replace with actual logged-in userId
    this.loadReportData(userId);
  }

  loadReportData(userId: string) {
    this.reportService.getUserReport(userId).subscribe({
      next: (data) => {
        // 🥗 Calories Chart
        this.calorieChartData = {
          labels: data.calorieLogs.map((c: any) =>
            new Date(c.date).toLocaleDateString()
          ),
          datasets: [
            {
              data: data.calorieLogs.map((c: any) => c.intakeCalories),
              label: 'Calories Intake',
              backgroundColor: 'rgba(110, 142, 251, 0.8)',
            },
            {
              data: data.calorieLogs.map((c: any) => c.burnedCalories),
              label: 'Calories Burned',
              backgroundColor: 'rgba(167, 119, 227, 0.8)',
            },
          ],
        };

        // ⚖️ Weight Chart
        this.weightChartData = {
          labels: data.weightEntries.map((w: any) =>
            new Date(w.date).toLocaleDateString()
          ),
          datasets: [
            {
              data: data.weightEntries.map((w: any) => w.weight),
              label: 'Weight (kg)',
              fill: true,
              backgroundColor: 'rgba(110, 142, 251, 0.2)',
              borderColor: 'rgba(110, 142, 251, 1)',
            },
          ],
        };

        // 🏃 Activity Chart
        this.activityChartData = {
          labels: data.activities.map((a: any) => a.activityName),
          datasets: [
            {
              data: data.activities.map((a: any) => a.duration),
              backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
              ],
            },
          ],
        };

        // 🍎 Nutrition Chart
        this.nutritionChartData = {
          labels: ['Protein', 'Carbs', 'Fat'],
          datasets: [
            {
              data: [
                data.nutritionSummary.protein,
                data.nutritionSummary.carbs,
                data.nutritionSummary.fat,
              ],
              backgroundColor: [
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(255, 99, 132, 0.8)',
              ],
            },
          ],
        };
      },
      error: (err) => {
        console.error('Error loading report:', err);
      },
    });
  }
}

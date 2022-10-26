import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employer } from '../../entities/employer';
import { EmployerService } from '../../services/employer.service';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.page.html',
})
export class EmployerListPage {

  employers: Employer[] = []

  constructor(
    private employerService: EmployerService,
    private router: Router
  ) { }

  async ionViewDidEnter(): Promise<void> {
    this.employers = await this.employerService.getAll()
  }

  onAdd(): void {
    this.router.navigate(['employer', 'add'])
  }

  onSelect(employer: Employer): void {
    this.router.navigate(['employer', 'details', employer.id])
  }
}

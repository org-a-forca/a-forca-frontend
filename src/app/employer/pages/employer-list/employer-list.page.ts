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
  employersCopy: Employer[] = []

  constructor(
    private employerService: EmployerService,
    private router: Router
  ) { }

  async ionViewDidEnter(): Promise<void> {
    this.employers = await this.employerService.getAll()
    this.employersCopy = [...this.employers]
  }

  onAdd(): void {
    this.router.navigate(['employer', 'add'])
  }

  onSelect(employer: Employer): void {
    this.router.navigate(['employer', 'details', employer.id])
  }

  onSearch(text: string): void {
    this.employers = this.employersCopy.filter(
      employer => this.getTextFromEmployer(employer).toLowerCase().indexOf(text.toLowerCase()) > -1
    )
  }

  private getTextFromEmployer(employer: Employer): string {
    return employer.name + ' ' + employer.phone
  }
}

import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateParent } from '../models/template.parent.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-template-list',
  standalone: true,
  imports: [
    MatFormFieldModule, MatPaginator, MatTableModule, MatInputModule
  ],
  templateUrl: './template-list.component.html',
  styles: ``
})
export class TemplateListComponent implements OnInit {

  public templateParents!: TemplateParent[];
  dataSource!: MatTableDataSource<TemplateParent>;
  displayedColumns: string[] = ['id', 'title', 'aliasName', 'templateTypeId', 'createdBy', 'updatedBy', 'createdUtcDate', 'updatedUtcDate', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getTemplateParents();
  }

  getTemplateParents() {
    this.apiService.getTemplateParents()
      .subscribe({
        next: (res) => {
          this.templateParents = res;
          this.dataSource = new MatTableDataSource(this.templateParents);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  viewTemplateVersions(id: number) {
    this.router.navigate(['/versions', id])
  }

  edit(id: number) {
    this.router.navigate(['/template', id])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

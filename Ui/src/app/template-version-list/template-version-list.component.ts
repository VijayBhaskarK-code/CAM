import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateParent } from '../models/template.parent.model';
import { TemplateVersion } from '../models/template.version.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatTreeModule} from '@angular/material/tree';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-template-version-list',
  standalone: true,
  imports: [
    MatFormFieldModule, MatPaginator, MatTableModule, MatInputModule, MatTreeModule
  ],
  templateUrl: './template-version-list.component.html',
  styles: ``
})
export class TemplateVersionListComponent implements OnInit {

  templateParentId!: number;
  templateParent!: TemplateParent;
  
  templateVersions!: TemplateVersion[];
  dataSource!: MatTableDataSource<TemplateVersion>;
  displayedColumns: string[] = ['id', 'version', 'status', 'publishedUtcDate', 'createdBy', 'updatedBy', 'createdUtcDate', 'updatedUtcDate', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(val => {
      this.templateParentId = val['parentTemplateId'];
      if (this.templateParentId) {
        this.getTemplateParent(this.templateParentId);
      }
    })
  }

  getTemplateParent(id: number) {
    this.apiService.getTemplateParentById(id)
      .subscribe({
        next: (res) => {
          this.templateParent = res;
          
          this.getTemplateVersions(this.templateParentId);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  getTemplateVersions(id: number) {
    this.apiService.getTemplateVersions()
      .subscribe({
        next: (res) => {
          this.templateVersions = res;
          this.dataSource = new MatTableDataSource(this.templateVersions);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  viewControls(id: number) {
    this.router.navigate(['/controls', id])
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
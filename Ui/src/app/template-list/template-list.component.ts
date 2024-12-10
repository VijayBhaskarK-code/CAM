import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateParent } from '../models/template.parent.model';

import { TreeTableModule } from 'primeng/treetable';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { ApiService } from '../service/api.service';
import { TemplateVersion } from '../models/template.version.model';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-template-list',
  standalone: true,
  imports: [
    TreeTableModule, CommonModule, ButtonModule
  ],
  templateUrl: './template-list.component.html',
  styles: [``]
})
export class TemplateListComponent implements OnInit {

  public templateParents!: TemplateParent[];
  cols!: Column[];
  files!: TreeNode[];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.cols = [
      { field: 'label', header: 'Title' },
    ];

    this.getTemplateParents();
  }

  getTemplateParents() {
    this.apiService.getTemplateParents()
      .subscribe({
        next: (res) => {
          this.templateParents = res;

          this.files = [];

          this.continentsToTreeNodes(this.templateParents);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  private continentsToTreeNodes(continents: TemplateParent[]) {
    for (let cont of continents) {
      this.files.push(this.continentToTreeNode(cont));
    }
  }

  private continentToTreeNode(cont: TemplateParent): TreeNode {
    let countiesTreeNodes: TreeNode[] = [];

    cont.templateVersions?.forEach(element => {
      countiesTreeNodes?.push(this.countryToTreeNode(element));
    });

    return {
      data: cont.title,
      children: countiesTreeNodes
    };
  }

  private countryToTreeNode(country: TemplateVersion): TreeNode {
    return {
      data: 'Version ' + country.version.toString(),
    }
  }

  viewTemplateVersions(id: number) {
    this.router.navigate(['/templates', id + 1])
  }

  editTemplateVersions(id: number) {
    this.router.navigate(['/template', id])
  }
}

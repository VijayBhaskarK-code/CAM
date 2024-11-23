import { ImportsModule } from '../imports-prime';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TemplateParent } from '../models/template.parent.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-template-parent-list',
  standalone: true,
  imports: [
    ImportsModule
  ],
  providers: [
    MessageService, ConfirmationService
  ],
  templateUrl: './template-parent-list.component.html',
  styles: ``
})
export class TemplateParentListComponent  implements OnInit {
  productDialog: boolean = false;

  templates!: TemplateParent[];

  template!: TemplateParent;

  selectedTemplates!: TemplateParent[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(private apiService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.apiService.getTemplateParents()
      .subscribe({
        next: (res) => {
          this.templates = res;
          //this.dataSource = new MatTableDataSource(this.templateParents);
          //this.dataSource.paginator = this.paginator;
          //this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      })
    //this.productService.getProducts().then((data) => (this.products = data));

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.template = {
      id: 0,
      title: '',
      code: '',
      aliasName: '',
      templateTypeId: 0,
      createdBy: '',
      updatedBy: '',
      createdUtcDate: null,
      updatedUtcDate: null,
      templateType: null,
      templateVersions: null
    };
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.templates = this.templates.filter((val) => !this.selectedTemplates?.includes(val));
        this.selectedTemplates = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: TemplateParent) {
    console.log(product);
    this.template = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: TemplateParent) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.templates = this.templates.filter((val) => val.id !== product.id);
          this.template = {
            id: 0,
            title: '',
            code: '',
            aliasName: '',
            templateTypeId: 0,
            createdBy: '',
            updatedBy: '',
            createdUtcDate: null,
            updatedUtcDate: null,
            templateType: null,
            templateVersions: null
          };
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    // if (this.product.name?.trim()) {
    //     if (this.product.id) {
    //         this.products[this.findIndexById(this.product.id)] = this.product;
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //     } else {
    //         this.product.id = this.createId();
    //         this.product.image = 'product-placeholder.svg';
    //         this.products.push(this.product);
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //     }

    //     this.products = [...this.products];
    //     this.productDialog = false;
    //     this.product = {};
    // }
  }

  findIndexById(id: string): number {
    let index = -1;
    // for (let i = 0; i < this.products.length; i++) {
    //     if (this.products[i].id === id) {
    //         index = i;
    //         break;
    //     }
    // }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
    return '';
  }
}
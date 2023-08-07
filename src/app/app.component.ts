import { Component, ViewChild } from '@angular/core';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-task-management';

  @ViewChild(TableComponent) TableComponent!: TableComponent;

  // This function calls the openAddDialog function from the table component
  callAddDialog(){
    this.TableComponent.openAddDialog();
  }
}

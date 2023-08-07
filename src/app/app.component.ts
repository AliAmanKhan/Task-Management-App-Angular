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
  callAddDialog(){
    this.TableComponent.openAddDialog();
  }

    // applyFilter(event: Event) {
    //   const filterValue = (event.target as HTMLInputElement).value;
    //   this.dataSource.filter = filterValue.trim().toLowerCase();
    // }

    // deleteData(index: any) {
    //   const savedData = JSON.parse(Storage.getItem(FormData) || "") || [];
    //   savedData.splice(index, 1);
    //   localStorage.setItem('formData', JSON.stringify(savedData));
    //   displayData(savedData);
    // }
}

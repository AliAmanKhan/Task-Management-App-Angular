import { Component, OnInit } from '@angular/core';
import data from "src/assets/data.json";
import { DatePipe } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  dataSource = data;  
  displayedColumns: string[] = ['id', 'task', 'desc', 'status', 'date', 'actions'];
  tableData: { id: number; task: string; desc: string; status: string; date: string }[] = [];
  // newItem: { id: number; title: string; desc: string; status: string; date: Date};
  editItem: {
    id: number; task: string; desc: string; status: string; date: string
  } | null = null;
  dataLet: any[] = [];

  totalData!: number;
  completedData!: any[];
  completedValue!: number;
  pendingData!: any[];
  pendingValue!: number;
  notStartedData!: any[];
  notStartedValue!: number;

  constructor(public dialog: MatDialog) {
    // localStorage.clear();
  }

  ngOnInit(): void {
    this.loadDataFromLocalStorage(); //Loads the localStorage data in the dataSource on component initialization
    this.filterValues(this.dataSource);
    this.dataLet = this.dataSource;
  }

  // Function to load the localStorage data in the dataSource
  loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      this.dataSource = JSON.parse(storedData);
    }
  }

  // Function to add the new item into the dataSource and also in the localStorage 
  addItem(formData: { id: number; task: string; desc: string; status: string; date: string }) {
    // const formattedDate = this.datePipe.transform(formData.date, 'dd/MM/yyyy');
    const newItem = { id: formData.id, task: formData.task, desc: formData.desc, status: formData.status, date: formData.date };
    const dataValue = this.dataSource.push(newItem);
    console.log("dataSource value after addItem:" + dataValue);
    localStorage.setItem('formData', JSON.stringify(this.dataSource));
    // this.dataSource.push({ id: formData.id, task: formData.task, desc: formData.desc, status: formData.status, date: formData.date });
    // this.saveToLocalStorage();
  }

  // Function to open the dialog on click
  openAddDialog(): void {
    const dialogRef = this.dialog.open(ActionDialogComponent, {
      data: {updateItem: this.dataSource,
        indexOfData: -1}
      // data: {title: 'Add', item: {id: 0, task: '', desc: '', status: '', date: ''}},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = [...this.dataSource,result]
      localStorage.setItem('formData', JSON.stringify([...this.dataSource]));
      this.filterValues(this.dataSource);
      this.dataLet = [...this.dataSource];
    });
  }

  // Function to save data in the localStorage of the dataSource
  saveToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(this.dataSource));
  }

  // Function to delete the row from the table 
  deleteItem(id: number) {
    this.dataSource = this.dataSource.filter((item) => item.id !== id);
    this.saveToLocalStorage();
  }

  // Function to filter the data from the table 
  filterData(key: string) {
    this.loadDataFromLocalStorage();
    const filterValue = this.dataSource.filter((value) => {
      return value.status == key;
    });
    this.dataSource = [...filterValue];
    if (key == 'total') {
      this.dataSource = this.dataLet;
    }
  }

  // function to update the table's vlaues
  updateItem(id:number) {
    for(let i = 0; i < this.dataSource.length; i++) {
      if((this.dataSource[i].id)) {
        const dialogData = this.dialog.open(ActionDialogComponent, {
          data: {updateItem: this.dataSource,
            indexOfData: i}
          });
        this.deleteItem(id)
        dialogData.afterClosed().subscribe(result => {
          this.dataSource = [...this.dataSource,result];
          localStorage.setItem('formData', JSON.stringify([...this.dataSource]));
          this.filterValues(this.dataSource);
          this.dataSource = [...this.dataSource];
        });
      break;
      }
    }
  }

  // Function to print the number of every filter value
  filterValues(data: any[]) {
    this.totalData = data.length;
    this.completedData = data.filter((data) => {
      return data.status == "Completed";
    });
    this.completedValue = this.completedData.length;
    this.pendingData = data.filter((data) => {
      return data.status == "Pending";
    });
    this.pendingValue = this.pendingData.length;
    this.notStartedData = data.filter((data) => {
      return data.status == "Not Started";
    });
    this.notStartedValue = this.notStartedData.length;
  } 
}

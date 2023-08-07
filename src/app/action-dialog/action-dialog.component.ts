import { Component, Inject, ViewChild, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableComponent } from '../table/table.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import data from '../../assets/data.json';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.css']
})
export class ActionDialogComponent implements OnInit {
  taskForm!: FormGroup;

  statuses = [
    {value: 'Completed', viewValue: 'Completed'},
    {value: 'Not Started', viewValue: 'Not Started'},
    {value: 'Pending', viewValue: 'Pending'},
  ];
  @ViewChild(TableComponent) TableComponent!: TableComponent;
  data : any;
  constructor (private frm: FormBuilder, public dialogRef: MatDialogRef<any>,@Inject(MAT_DIALOG_DATA) public dataLet: any, private datePipe: DatePipe){
    this.data = data;
  }
  ngOnInit(){
    this.taskForm = this.frm.group({
      id: 0,
      task: '',
      desc: '',
      date: '',
      status: '',
    })
  }

  // Function called on the submition of the form
  onFormSubmit(){
    if(this.taskForm.valid){
      let valueTaskForm = this.taskForm.value.date;
      valueTaskForm = this.datePipe.transform(valueTaskForm, 'dd/MM/yyyy');
      this.taskForm.value.date = valueTaskForm;

      this.dialogRef.close(this.taskForm.value);
    }
  }

}

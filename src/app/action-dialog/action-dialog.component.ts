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
  // newJsonData: data;
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
  // savedFormData =[];
  onFormSubmit(){
    if(this.taskForm.valid){
      let valueTaskForm = this.taskForm.value.date;
      valueTaskForm = this.datePipe.transform(valueTaskForm, 'dd/MM/yyyy');
      this.taskForm.value.date = valueTaskForm;

      this.dialogRef.close(this.taskForm.value);
      // this.data.push(valueTaskForm);
      
      // localStorage.setItem('formData', JSON.stringify(this.data));
      // console.log(localStorage.getItem('formData'));
      // const newLocalStorageData = this.TableComponent.addItem(this.taskForm.value);
      // console.log(newLocalStorageData);
    }
  }

    // formData: {} ={id: 0, task: '', desc: '', status: '', date: ''};
    // addToTable( id: number, task: string, desc: string, status: string, date: string ){
    //   const tableDataToAdd = {
    //     id: Number,
    //     task: String,
    //     desc: String,
    //     status: String,
    //     date: Date
    //   }
    //   const newData = localStorage.setItem('formData', JSON.stringify(this.data));
    //   newData.push(tableDataToAdd);
      // if(form.valid){
      //   this.TableComponent.addItem(this.formData);
      //   this.formData = { id: 0, task: '', desc: '', status: '', date: '' };
      // }

    // }
}

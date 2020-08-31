import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const apiAdress = 'http://localhost:4000/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

const api = {
  login: 'login',
  logout: 'logout',
  init: 'init',
  note: 'note',
  deleteNote: 'deleteNote',
  newCat: 'newCat',
  editCat: 'editCat',
  deleteCat: 'deleteCat'
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  isLoggedIn = false;
  notes: any[] = [];
  categories: any[] = [];
  userName: string = '';
  data: any;

  noteTitle: string = '';
  noteContent: string = '';
  noteDate: Date = new Date();
  noteCategory: string = '';

  categoryName: string = '';
  editingCategoryId = -1;
  newCategoryName: string = '';

  constructor(private http: HttpClient) {
  }

  saveData() {
    if (this.data.hasOwnProperty('notes') && this.data.hasOwnProperty('categories')) {
      this.notes = this.data.notes.sort((a, b) => {
        if (new Date(b.date).getTime() - new Date(a.date).getTime() > 0) {
          return 1
        }
        else if (new Date(b.date).getTime() - new Date(a.date).getTime() < 0) {
          return -1
        }
        else {
          return Math.random() > 0.5 ? 1 : -1
        }
      });
      this.categories = this.data.categories;
      console.table(this.notes)
    }
  }

  login() {
    this.http.post(apiAdress + api.login, JSON.stringify({ user: this.userName }), httpOptions).subscribe(data => {
      this.data = data;
      this.saveData();

      if (this.data.hasOwnProperty('success')) {
        this.isLoggedIn = this.data.success;
      }
    });
  }

  logout() {
    this.http.post(apiAdress + api.logout, JSON.stringify({}), httpOptions).subscribe(() => {
      this.isLoggedIn = false;
      this.userName = '';
    });
  }

  saveNote() {
    const note = JSON.stringify({
      title: this.noteTitle,
      content: this.noteContent,
      category: this.noteCategory,
      date: this.noteDate.toJSON().slice(0, 10)
    });
    this.noteTitle = '';
    this.noteContent = '';
    this.noteDate = new Date();
    this.noteCategory = '';
    console.log('Sending new note: ', JSON.parse(note));
    this.http.post(apiAdress + api.note, note, httpOptions).subscribe(data => {
      this.data = data;
      this.saveData();
    });
  }

  deleteNote(title: string) {
    this.http.post(apiAdress + api.deleteNote, JSON.stringify({ title }), httpOptions).subscribe(data => {
      this.data = data;
      this.saveData();
    });
  }

  saveCategory() {
    console.log('Saving category: ', this.categoryName);
    this.http.post(apiAdress + api.newCat, JSON.stringify({ name: this.categoryName }), httpOptions).subscribe(data => {
      this.data = data;
      this.saveData();
    });
    this.categoryName = '';
  }

  editCategory(category) {
    if (this.editingCategoryId !== category.id) {
      this.editingCategoryId = category.id;
      this.newCategoryName = category.name;
    } else {
      console.log('Editing category:', category.name, ' (id = ', category.id, ') changed to ', this.newCategoryName);
      this.http.post(apiAdress + api.editCat, JSON.stringify({ name: this.newCategoryName, id: category.id }), httpOptions)
        .subscribe(data => {
          console.log('got data from server:');
          console.log(data);
          this.data = data;
          this.saveData();
        });
      this.editingCategoryId = -1;
      this.newCategoryName = '';
    }
  }

  deleteCategory(id: number) {
    console.log('Deleting category: ', name);
    this.http.post(apiAdress + api.deleteCat, JSON.stringify({ id }), httpOptions).subscribe(data => {
      this.data = data;
      this.saveData();
    });
  }
}

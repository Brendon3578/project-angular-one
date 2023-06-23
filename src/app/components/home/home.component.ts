import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit } from '@angular/core';
import { HomeService, UserList } from '../services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users!: UserList;

  displayedColumns: string[] = ['name', 'email', 'salary', 'age'];

  dataSource!: MatTableDataSource<any>;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getUsers().subscribe((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
    });
  }
}

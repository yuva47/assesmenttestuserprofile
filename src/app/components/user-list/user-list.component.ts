import { user, UserServiceService } from './../../util/user-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'actions'];
  dataSource!: MatTableDataSource<user>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private userService: UserServiceService) {
    this.dataSource = new MatTableDataSource(this.userService?.users);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

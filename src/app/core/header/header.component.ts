import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../helpers/auth.service';
import { SyncService } from '../helpers/sync.service';

@Component({
  selector: 'eag-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit {
  title = 'Header';
  selectedType: string;
  types: string[];
  public searchForm: FormGroup;

  constructor(private router: Router,
              private authService: AuthService,
              private syncService: SyncService,
              private formBuilder: FormBuilder){
  }

  logout(){
      this.authService.logout();
      this.router.navigate(['login']);
  }

  refresh(){
    if (confirm("are you sure you want to Sync Data?")) {
      this.syncService.SyncData().subscribe((result:any)=>{
        if(result){
          alert('Sync Completed!');
        }
      })
  }
  }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchText: ['']
    });
    this.types = ['BUs', 'Account', 'Projects'];
  }

  public search(searchText: string){
    this.searchForm.setValue({
      searchText : ''
    });
    this.router.navigate([`search-results/${searchText}`]);
  }

  public onTypeSelect(value: string){
    this.selectedType = value;
  }

}

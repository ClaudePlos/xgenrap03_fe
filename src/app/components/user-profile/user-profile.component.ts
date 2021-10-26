import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { Hero } from './hero';
import { REPORTS } from './mock-reports';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  currentUser: Object = {};
  reports = REPORTS;
  selectedReport?: Hero;

  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res;
    })
  }

  ngOnInit() { }

  onSelect(hero: Hero): void {
    console.log(hero);
    this.selectedReport = hero;
  }
}
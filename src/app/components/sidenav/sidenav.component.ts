import { MediaMatcher } from '@angular/cdk/layout';
import { OnInit, ChangeDetectorRef, Component,OnDestroy,AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../structures';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  menuItems: Array<Menu> = new Array();


  private _mobileQueryListener: () => void;

  constructor( changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private route: Router) 
  {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {}

  ngOnInit(): void {
    this.getMenuSidenav();
  }

  getMenuSidenav(): any {
    this.menuItems = [
      { route: '', action:'',  type: 'link', name: 'Previsualizar Todo', icon: 'av_timer' },
      { route: 'bill-view', action:'create', type: 'link', name: 'Crear Factura', icon: 'crop_7_5' }
    ];
  }

  redirect(routePath:string, action:string) {
    if (!!action) {
      this.route.navigate([routePath, action]);
    } else {
      this.route.navigate([routePath]);
    }
  }

}

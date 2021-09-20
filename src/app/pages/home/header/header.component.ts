import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(): void{
    this.authService.cerrarSesion();
    Swal.fire(
      'Cerró Sesión',
      'Usted cerró sesión con éxito',
      'info'
    );
    this.router.navigate(['/login'])
  }

}

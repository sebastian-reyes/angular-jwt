import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Login';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.usuario)
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire(
        'Error',
        'Email o contraseña vacías',
        'error'
      );
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['/clientes']);
      Swal.fire(
        'Login',
        `Hola ${usuario.username} has iniciado sesión con éxito`,
        'success'
      )
    }, err => {
      if (err.status = 400) {
        Swal.fire(
          'Error',
          'Usuario o clave incorrecta',
          'error'
        )
      }
    });
  }

}

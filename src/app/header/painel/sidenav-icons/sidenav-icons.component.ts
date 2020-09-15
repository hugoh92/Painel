import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-icons',
  templateUrl: './sidenav-icons.component.html',
  styleUrls: ['./sidenav-icons.component.scss']
})
export class SidenavIconsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.btn').click(function(){
      $(this).toggleClass("click");
      $('.sidebar').toggleClass("show");
    });

  //   $('oes-btn').on('click', function(){
  //     if(!$(this).parents().hasClass('show2')){
  //         $('li').removeClass('show2');    
  //     }
  //     $(this).parent().addClass('show2');
  // });
   
    $('nav ul li').click(function(){
        $(this).addClass("active").siblings().removeClass("active");
      });
  }

}

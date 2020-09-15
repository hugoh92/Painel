import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-est',
  templateUrl: './sidenav-est.component.html',
  styleUrls: ['./sidenav-est.component.scss']
})
export class SidenavEstComponent implements OnInit {

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

    $('.oes-btn').click(function(){
      $('nav ul .oes-show').toggleClass("show2");
      $('nav ul .coeste').toggleClass("rotate");
    });

    $('.feat-btn').click(function(){
      $('nav ul .feat-show').toggleClass("show");
      $('nav ul .first').toggleClass("rotate");
    });

    $('.serv-btn').click(function(){
      $('nav ul .serv-show').toggleClass("show1");
      $('nav ul .second').toggleClass("rotate");
    });

    $('.sud-btn').click(function(){
      $('nav ul .sud-show').toggleClass("show3");
      $('nav ul .sud').toggleClass("rotate");
    });

    $('.sul-btn').click(function(){
      $('nav ul .sul-show').toggleClass("show4");
      $('nav ul .sul').toggleClass("rotate");
    });

    $('nav ul li').click(function(){
        $(this).addClass("active").siblings().removeClass("active");
      });
  }

}

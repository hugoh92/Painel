import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {

  constructor() {
    
    
  }

  ngOnInit(): void {
    $('.btn').click(function(){
      $(this).toggleClass("click");
      $('.sidebar').toggleClass("show");
    });
    
    $('.feat-btn').click(function(){
      $('nav ul .feat-show').toggleClass("show");
      $('nav ul .first').toggleClass("rotate");
    });

    $('.serv-btn').click(function(){
      $('nav ul .serv-show').toggleClass("show1");
      $('nav ul .second').toggleClass("rotate");
    });

    $('nav ul li').click(function(){
        $(this).addClass("active").siblings().removeClass("active");
      });
  }
  
  


}

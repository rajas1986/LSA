import { Component, OnInit } from '@angular/core';

@Component({
    selector:'app-page',
    template:`
    <div class="container center-elements">
        <h2 >
            <span class="text-danger">Error :</span>
            <span class="font-italic"> Page Not Found </span>
        </h2> 
    </div>
    <div class="container center-elements">
        <small class="text-primary"><b>Note: </b>Kindly check the passed parameters</small>
    </div>

    `,
    styles:[`
    
    `]
})

export class PageNotFoundComponent implements OnInit{
    constructor(){}
    ngOnInit(){}
}
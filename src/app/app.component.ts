import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';


  contructor () {
 
  }
  getColumnNamesQuery( parametes: ValuesSearchI,sql:string  ) : string{
    const columName = [];
    sql = `SELECT `;
    for (let value of parametes.paramSelect){
      columName.push(value);
    }

     sql += '('+columName.toLocaleString()+')'.concat (this.preperareValues(parametes));
     console.log(sql);
     return sql;
  }
  preperareValues(parametes: ValuesSearchI  ) : string {
    let values : string []= [];
    for (let value of parametes.paramsValue) {
        values.push(`${value.param}=?`)
    }
    return  values.toString()+ ';' ;
  }

    prepareArrarQuery (parametes: ValuesSearchI, sql : string  ) : any [] {
    let values : any [] = [];
    for ( let value of parametes.paramsValue) {
      values.push(value.value)
    }
    return values;
  }
}
export class Model {

}
  export interface ValuesSearchI{
  paramSelect ?: any [],
  paramsValue ?: paramValues []
}
export interface paramValues {
  param ?: any,
  value ?: any
}
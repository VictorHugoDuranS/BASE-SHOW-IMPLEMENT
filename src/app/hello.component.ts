import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;

  tableName: string = 'model';

  query : string = '';

  constructor() {
         let sql : string = '';
    const parameters : ValuesSearchI = {
      paramSelect: [
        'nombre',
        'edad',
        'sexo',
      ],
      paramsValue: [
         {
          param: 'sexo',
          value: 'Mujer'
        },
        {
          param: 'edad',
          value: 17
        }
      ],
      isEsctric : false
    };
   sql = this.getColumnNamesQuery(parameters,this.query);
   this.prepareArrarQuery(parameters);
     console.log(sql);
  }
  /**
   * @Param 
   */
  getColumnNamesQuery( parametes: ValuesSearchI,query :string  ) : string {
    const columName = [];
    parametes.paramSelect.sort();
    for (let value of parametes.paramSelect){
      columName.push(value);
    }
    // PREPARE COLUMN NAMES
    query = `SELECT ` + '('+columName.toLocaleString()+')';
    query += ` FROM ${this.tableName}`;
    query += (this.preperareValues(parametes));
    return query;
  }
  preperareValues(parametes: ValuesSearchI  ) : string {
    let values : string []= [];
    for (let value of parametes.paramsValue) {
        const result : string = parametes.isEsctric ? ' AND ' :' OR ';
        values.push(`${value.param}=? ` + result)
    }
    values.forEach(
      (item,index) => {
        if(index === values.length -1) {
          if(item.includes('AND')){
             values[index] =(item as string).replace('AND','');
          }else if(item.includes('OR')){
            values[index] =(item as string).replace('OR','');
          }
        }else {
          return item;
        }
      }
    )
    return ' WHERE ' + values.toString().replace(',','');
  }

  prepareArrarQuery (parametes: ValuesSearchI ) : any [] {
    let values : any [] = [];
    for ( let value of parametes.paramsValue) {
      values.push(value.value)
    }
    return values;
  }
}

 export interface ValuesSearchI{
  paramSelect ?: any [],
  paramsValue ?: paramValues [],
  isEsctric : boolean
}
export interface paramValues {
  param ?: any,
  value ?: any
}

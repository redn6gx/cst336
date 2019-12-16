 module.exports = function Car(make, model, year) {
     console.log('inside Car function, \'this\' is', this);
     let self = this;
     this.string = 'hello';
     this.boolean = true;
     this.year = 2019;
     this.accelerate = function(rate) {
         
     }
 }
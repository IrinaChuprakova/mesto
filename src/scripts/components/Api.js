export class Api {
    constructor({baseUrl,headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _checkStatus(res){
      if (res.ok){
        return res.json();
      }
      else{
        Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
      }
    }
  
    getInitialCards() {
      const cardsUrl = this._baseUrl + '/cards';
      return fetch(cardsUrl,{
        headers: this._headers
      })
      .then(this._checkStatus)
    }
  

  }
  

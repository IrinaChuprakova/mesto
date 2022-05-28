export class UserInfo{
    constructor({nameSelector,jobSelector, avatar}){
        this._name = document.querySelector(nameSelector);
        this._job =  document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatar);
    }
    getUserInfo(){
        return {
            name:this._name.textContent,
            job:this._job.textContent,
        }
    }
    setUserInfo({name, job}){
        this._name.textContent = name;
        this._job.textContent = job;
    }

    setUserAvatar(link){
        this._avatar.src = link; 
    }

    setUserId(userId){
        this._userId = userId;
    }

    getUserId(){
        return this._userId;
    }
}
class Form {
    constructor() {
        this.reg = document.getElementById('form-reg');
        this.auth = document.getElementById('form-auth');
        this.tabReg = document.querySelector('.modal-tabs__item.reg');
        this.tabAuth = document.querySelector('.modal-tabs__item.auth');
        if (!this.reg || !this.auth || !this.tabReg || !this.tabAuth) {
            return;
        }
        this._initTabs();
    }
    _initTabs() {
        this.tabReg.addEventListener('click', () => {
            this._switchForm('reg');
        })
        this.tabAuth.addEventListener('click', () => {
            this._switchForm('auth');
        })
    }
    _clearFormChoice() {
       
        
        
        this.tabAuth.classList.remove('active');

    }
    _switchForm(form) {
        switch(form) {
            case 'auth':
                this.reg.classList.remove('active');
                this.tabReg.classList.remove('active');
                
                this.auth.classList.add('active');
                this.tabAuth.classList.add('active');
                break;
            case 'reg':
                this.tabAuth.classList.remove('active');
                this.auth.classList.remove('active');

                this.reg.classList.add('active');
                this.tabReg.classList.add('active');
                break;
        }
    }

}

const modalForms = new Form();
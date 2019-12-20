
class Modal_window {

    constructor({blackout, closeBut, speed}) {
        this.blackout = blackout === false || blackout === true ? blackout : true;
        this.closeBut = closeBut === false || closeBut === true ? closeBut : true;
        this.speed = speed || speed !== undefined ? speed : 0.8;
        this.speed_mc = this.speed * 1000;
        this.closeElem = '<svg version="1.1" id="closeElem" class="js-closeModal" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n' +
            '\t width="348.333px" height="348.334px" viewBox="0 0 348.333 348.334"\n' +
            '\t xml:space="preserve">\n' +
            '\t<path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85\n' +
            '\t\tc-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563\n' +
            '\t\tc-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85\n' +
            '\t\tl105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554\n' +
            '\t\tL279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/>\n' +
            '</svg>';
        this.modal = document.querySelector('.js-modalWindow');
        this.overlay = document.getElementById('overlay');
    }

    command_for_open = () => {
        this.modal.style.opacity = '0';
        this.modal.style.display = 'block';

        this.overlay.style.opacity = '0';
        this.overlay.style.display = 'block';
        this.overlay.classList.add('open');

        this.modal.classList.add('open');
        setTimeout(this.opening, this.speed_mc);
    };

    opening = () => {
        this.modal.style.opacity = '1';
        this.modal.classList.remove('open');
        this.overlay.style.opacity = '1';
        this.overlay.classList.remove('open');
    };

    command_for_close = () => {
        let overlay = document.getElementById('overlay');
        overlay.classList.add('close');

        this.modal.classList.add('close');
        setTimeout(this.closing, this.speed_mc);

    };

    closing = () => {
        this.modal.style.display = 'none';
        this.modal.classList.remove('close');
        this.overlay.style.display = 'none';
        this.overlay.classList.remove('close');
    };

    buttonsIdentification = () => {

        let buttonOpenArr = document.querySelectorAll('.js-callModal');
        for (let i = 0; i < buttonOpenArr.length; i++){
            let buttonOpen = buttonOpenArr[i];
            buttonOpen.addEventListener('click', this.command_for_open);
        }

        if (this.closeBut === true){
            let buttonClose = document.querySelector('.js-closeModal');
            buttonClose.addEventListener('click', this.command_for_close);
        }
        else {
            this.overlay.addEventListener('click', this.command_for_close);
        }

    };

    addCloseElem = () => {
        this.modal.insertAdjacentHTML('beforeEnd', this.closeElem);
    };

    changeBlackout = () =>{
        this.overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    };

    createClass(name,rules){
        var style = document.createElement('style');
        style.type = 'text/css';
        document.getElementsByTagName('head')[0].appendChild(style);
        if(!(style.sheet||{}).insertRule)
            (style.styleSheet || style.sheet).addRule(name, rules);
        else
            style.sheet.insertRule(name+"{"+rules+"}",0);
    }

    initialize(){

        console.log('blackout ' +  this.blackout);
        console.log('closebut ' + this.closeBut);
        console.log('speed ' + this.speed);
        console.log('speed mc ' + this.speed_mc);

        if(this.closeBut === true){
            this.addCloseElem();
        }
        if(this.blackout === false) {
            this.changeBlackout();
        }


        let speed_str = this.speed + 's';

        this.createClass('.open', `animation: ${speed_str} linear open`);
        this.createClass('.close', `animation: ${speed_str} linear close`);

        this.buttonsIdentification();

    }

}

let modal = new Modal_window({
    // blackout: true,
    // closeBut: false,
    // speed: 2
});

modal.initialize();
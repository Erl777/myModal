
class Modal_window {

    constructor(settings) {

        const init =  settings || {};
        this.settings = {
            blackout : init.blackout || false,
            closeBut : init.closeBut ||  false,
            speed : init.speed || 0.8,
            appearanceEffect: settings.appearanceEffect || 'fade'
        };
        console.log(this.settings);
        this.speed_mc = this.settings.speed * 1000;
        this.closeElem = '<svg version="1.1" id="closeElem" class="js-closeModal" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"\n' +
            '\t width="348.333px" height="348.334px" viewBox="0 0 348.333 348.334"\n' +
            '\t xml:space="preserve">\n' +
            '\t<path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85\n' +
            '\t\tc-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563\n' +
            '\t\tc-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85\n' +
            '\t\tl105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554\n' +
            '\t\tL279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/>\n' +
            '</svg>';
        this.modal = document.getElementById('modalWindow');
        this.overlay = document.getElementById('overlay');

        this.initialize();
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

        let buttonOpenArr = document.querySelectorAll('[data-target="modalWindow"]');
        for (let i = 0; i < buttonOpenArr.length; i++){
            let buttonOpen = buttonOpenArr[i];
            buttonOpen.addEventListener('click', this.command_for_open);
        }

        if (this.settings.closeBut === true){
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

    choosingAppearenceEffect(){
        let speed_str = (this.settings.speed + 0.001 ) + 's';

        switch (this.settings.appearanceEffect) {
            case 'fade':
                this.createClass('.open', `animation: ${speed_str} linear open`);
                this.createClass('.close', `animation: ${speed_str} linear close`);
                break;
            case 'top-to-middle':
                this.createClass('.open', `animation: ${speed_str} linear top-to-middle`);
                this.createClass('.close', `animation: ${speed_str} linear close`);
                break;
            case 'left-to-mid':
                this.createClass('.open', `animation: ${speed_str} linear left-to-mid`);
                this.createClass('.close', `animation: ${speed_str} linear close`);
                break;
            case 'leftTop-to-mid':
                this.createClass('.open', `animation: ${speed_str} linear leftTop-to-mid`);
                this.createClass('.close', `animation: ${speed_str} linear close`);
                break;
            default:
                this.createClass('.open', `animation: ${speed_str} linear open`);
                this.createClass('.close', `animation: ${speed_str} linear close`);
        }
    }

    initialize(){
        console.log('blackout ' +  this.settings.blackout);
        console.log('closebut ' + this.settings.closeBut);
        console.log('speed ' + this.settings.speed);
        console.log('speed mc ' + this.speed_mc);

        if(this.settings.closeBut === true){
            this.addCloseElem();
        }
        if(this.settings.blackout === false) {
            this.changeBlackout();
        }

        this.choosingAppearenceEffect();

        this.buttonsIdentification();

    }

}

new Modal_window({
    blackout: true,
    closeBut: true,
    // speed: 1,
    // appearanceEffect: 'fade'
    appearanceEffect: 'top-to-middle'
    // appearanceEffect: 'left-to-mid'
    // appearanceEffect: 'leftTop-to-mid'
});

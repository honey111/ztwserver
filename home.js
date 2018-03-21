const query=name=>document.querySelector(name);
window.menuIsOpen=true;
const frameMenu=query('#frameMenu');
const frameContent=query('#frameContent');
const frameNav=query('#frameNav');
const navContent=path=>frameContent.src=path;
window.menuClose=()=>{
    menuIsOpen=false;
    frameMenu.style.marginLeft='-260px';
    window.frames[0]._menuClose();
};
window.menuOpen=()=>{
    menuIsOpen=true;
    frameMenu.style.marginLeft='0';
    window.frames[0]._menuOpen();
};
window.menuToggle=()=>{
    menuIsOpen?menuClose():menuOpen();
};
window.MenuNav=(navList,navPath)=> {
    window.frames[0].changeList(navList);
    navContent(navPath);
};
const body=query('body');
//nav,sticky置顶：
let isFixed=false,overTop;
body.onscroll=e=>{
    overTop=body.scrollTop;
    if(overTop>80&&!isFixed){
        frameNav.classList.add('fix-nav');
        isFixed=true;
    }else if(overTop<=80 && isFixed){
        frameNav.classList.remove('fix-nav');
        isFixed=false
    }
};
//animate:
const myAnimate=()=>{
    const proto=HTMLElement.prototype;
    const removeChild=proto.removeChild;
    proto.removeChild=function(node){
        return new Promise(resolve=>{
            if(node.ztime){
                setTimeout(()=>{
                    removeChild.call(this,node);
                    resolve(true)
                },node.ztime);
            }else{removeChild.call(this,node);resolve(true)}
        })
    }
};
myAnimate();

//modal-弹框：
class Modal{
    constructor(props){
        this.container=document.querySelector('body');
        this.modal=document.createElement('div');
        this.modal.className='modal-bg';
        this.modal.ztime=400;
        this.modal.innerHTML=this.render(props);
        this.closeRunning=null;
    };
    open(){
        this.container.appendChild(this.modal);
        query('#z-modal-close').onclick=()=>{
            this.close();
        };
        const self=this;

        query('.z-modal-bg').addEventListener('click',function(e){
            if(e.target===this)self.close();
        })
    }
    close(){
        return new Promise(resolve=>{
            if(this.closeRunning)return resolve(false);
            this.container.classList.add('modal-leave');
            this.closeRunning=true;
            this.container.removeChild(this.modal).then(()=>{
                this.closeRunning=false;
                this.container.classList.remove('modal-leave');
                resolve(true);
            });
        })
    }
    render(props){
        return `
                <div class="z-modal-bg">
                    <div class="z-modal">
                        <header class="between">
                            <span>${props.title}</span>
                            <span id="z-modal-close" class="z-close" style="cursor:pointer">&#10006;</span>
                        </header>
                        <article>
                            ${props.body}
                        </article>
                        <footer class="align-right">
                            ${props.footer}
                       </footer>
                    </div>
                </div>
            `
    }
}
const modifyPs=new Modal({
    title:'修改密码',
    body:`
            <div>
                <div class="z-form-control"><label class="center">原始密码</label><input id="pswd-pristine"/></div>
                <div class="z-form-control"><label class="center">修改密码</label><input id="pswd1"/></div>
                <div class="z-form-control"><label class="center">确认密码</label><input id="pswd2"/></div>
            </div>
        `,
    footer:'<button id="pswd-submit" class="btn-o-p">修改</button>'
});




window.openModifyPassword=()=>{
    modifyPs.open();
    const
        pswdPristine=query('#pswd-pristine'),
        pswd1=query('#pswd1'),
        pswd2=query('#pswd2'),
        pswdSubmit=query('#pswd-submit');

    pswdSubmit.onclick=()=>{
        console.log(
            pswdPristine.value,
            pswd1.value,
            pswd2.value
        );

        //close modal:
        modifyPs.close();
    };
}
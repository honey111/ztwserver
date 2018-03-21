'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var query = function query(name) {
    return document.querySelector(name);
};
window.menuIsOpen = true;
var frameMenu = query('#frameMenu');
var frameContent = query('#frameContent');
var frameNav = query('#frameNav');
var navContent = function navContent(path) {
    return frameContent.src = path;
};
window.menuClose = function () {
    menuIsOpen = false;
    frameMenu.style.marginLeft = '-260px';
    window.frames[0]._menuClose();
};
window.menuOpen = function () {
    menuIsOpen = true;
    frameMenu.style.marginLeft = '0';
    window.frames[0]._menuOpen();
};
window.menuToggle = function () {
    menuIsOpen ? menuClose() : menuOpen();
};
window.MenuNav = function (navList, navPath) {
    window.frames[0].changeList(navList);
    navContent(navPath);
};
var body = query('body');
//nav,sticky置顶：
var isFixed = false,
    overTop = void 0;
body.onscroll = function (e) {
    overTop = body.scrollTop;
    if (overTop > 80 && !isFixed) {
        frameNav.classList.add('fix-nav');
        isFixed = true;
    } else if (overTop <= 80 && isFixed) {
        frameNav.classList.remove('fix-nav');
        isFixed = false;
    }
};
//animate:
var myAnimate = function myAnimate() {
    var proto = HTMLElement.prototype;
    var removeChild = proto.removeChild;
    proto.removeChild = function (node) {
        var _this = this;

        return new Promise(function (resolve) {
            if (node.ztime) {
                setTimeout(function () {
                    removeChild.call(_this, node);
                    resolve(true);
                }, node.ztime);
            } else {
                removeChild.call(_this, node);resolve(true);
            }
        });
    };
};
myAnimate();

//modal-弹框：

var Modal = function () {
    function Modal(props) {
        _classCallCheck(this, Modal);

        this.container = document.querySelector('body');
        this.modal = document.createElement('div');
        this.modal.className = 'modal-bg';
        this.modal.ztime = 400;
        this.modal.innerHTML = this.render(props);
        this.closeRunning = null;
    }

    _createClass(Modal, [{
        key: 'open',
        value: function open() {
            var _this2 = this;

            this.container.appendChild(this.modal);
            query('#z-modal-close').onclick = function () {
                _this2.close();
            };
            var self = this;

            query('.z-modal-bg').addEventListener('click', function (e) {
                if (e.target === this) self.close();
            });
        }
    }, {
        key: 'close',
        value: function close() {
            var _this3 = this;

            return new Promise(function (resolve) {
                if (_this3.closeRunning) return resolve(false);
                _this3.container.classList.add('modal-leave');
                _this3.closeRunning = true;
                _this3.container.removeChild(_this3.modal).then(function () {
                    _this3.closeRunning = false;
                    _this3.container.classList.remove('modal-leave');
                    resolve(true);
                });
            });
        }
    }, {
        key: 'render',
        value: function render(props) {
            return '\n                <div class="z-modal-bg">\n                    <div class="z-modal">\n                        <header class="between">\n                            <span>' + props.title + '</span>\n                            <span id="z-modal-close" class="z-close" style="cursor:pointer">&#10006;</span>\n                        </header>\n                        <article>\n                            ' + props.body + '\n                        </article>\n                        <footer class="align-right">\n                            ' + props.footer + '\n                       </footer>\n                    </div>\n                </div>\n            ';
        }
    }]);

    return Modal;
}();

var modifyPs = new Modal({
    title: '修改密码',
    body: '\n            <div>\n                <div class="z-form-control"><label class="center">\u539F\u59CB\u5BC6\u7801</label><input id="pswd-pristine"/></div>\n                <div class="z-form-control"><label class="center">\u4FEE\u6539\u5BC6\u7801</label><input id="pswd1"/></div>\n                <div class="z-form-control"><label class="center">\u786E\u8BA4\u5BC6\u7801</label><input id="pswd2"/></div>\n            </div>\n        ',
    footer: '<button id="pswd-submit" class="btn-o-p">修改</button>'
});

window.openModifyPassword = function () {
    modifyPs.open();
    var pswdPristine = query('#pswd-pristine'),
        pswd1 = query('#pswd1'),
        pswd2 = query('#pswd2'),
        pswdSubmit = query('#pswd-submit');

    pswdSubmit.onclick = function () {
        console.log(pswdPristine.value, pswd1.value, pswd2.value);

        //close modal:
        modifyPs.close();
    };
};
